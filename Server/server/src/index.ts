import { ApolloServer } from "apollo-server-express";
import express = require("express");
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import {createConnection} from "typeorm";
import { HealthResolver } from './resolvers/HealthResolver';
import { UserRegistrationResolver } from "./resolvers/Registration/User_Registration.resolver";
import { UserLoginResolver } from "./resolvers/Login/User_Login.resolver";
import { ProtectedResolverHealth } from './resolvers/ProtectedResolvers/ProtectedResolver.health';
import "dotenv/config";
var morgan = require('morgan');
import cookieParser = require("cookie-parser");
import { verify } from 'jsonwebtoken';
import { User_Registration } from './entity/User_Registration';
import { CreateAccessToken, CreateRefreshToken } from './utils/tokenCreator';
import { SendRefreshTokenOnRefreshedAccessToken } from './utils/sendRefreshTokenOnRefreshedAccessToken';
import { TokenVersionControl } from "./resolvers/TockenBlocker/TokenVersionControl";

// Do not use in PRODUCTION: GraphQL Lifecycle logger - DEV only
import { graphql_REQ_Query_LifeCycle_Logger_dev } from "./utils/graphql_REQ_Query_LifeCycle.Logger.dev";
import { ApplicationResolver } from "./resolvers/ProtectedResolvers/Admin/Application_Master.resolver";

(async () => {
    const app = express();
    app.use(morgan('combined'));

    // Handle refresh token
    app.use(cookieParser());
    app.post('/getNewAccessToken', async (req, res) => {

        // Perse the cookie
        const cookieRefreshToken = req.cookies._atr;
        if(!cookieRefreshToken) { return res.send({"status": false, accessToken: ''}); }

        // Get the TOKEN and decode the payload
        let payload: any = null;
        try {
            payload = verify(cookieRefreshToken, process.env.REFRESH_JWT_SECRET!);
        } catch (error) {
            console.log(error);
            return res.send({"status": false, accessToken: ''});
        }

        // find the user
        const userOne = await User_Registration.findOne({ Reg_UserID: payload.uid });
        if(!userOne) { return res.send({"status": false, accessToken: ''}); }

        // Token Version implementation by incrementing the token version at TokenVersionControl @Mutation
        if(userOne.Token_Version !== payload.tokenVersion) { return res.send({"status": false, accessToken: ''}); }

        // When refresh the Access Token we will refresh the Refresh token
        SendRefreshTokenOnRefreshedAccessToken(res, CreateRefreshToken(userOne)); 

        // return a Access token
        return res.send( { "status": true, accessToken: CreateAccessToken(userOne)} );
    });

    await createConnection();  
    
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                UserRegistrationResolver,
                UserLoginResolver, 
                HealthResolver, 
                ProtectedResolverHealth,
                TokenVersionControl,
                ApplicationResolver
            ],
        }),
        tracing: true,
        plugins: [
            // graphql_REQ_Query_LifeCycle_Logger_dev as any
        ],
        context: ({ req, res }) => ({ req, res }) // Use context to pass req & response to mutations or queries
    });

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log("App is started");
    })
    
    
})();
