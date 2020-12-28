import { ApolloServer } from "apollo-server-express";
import express = require("express");
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import {createConnection} from "typeorm";
import { HealthResolver } from './resolvers/HealthResolver';
import { UserRegistrationResolver } from "./resolvers/Registration/User_Registration.resolver";
import { UserLoginResolver } from "./resolvers/Login/User_Login.resolver";
import "dotenv/config";

(async () => {
    const app = express();

    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserRegistrationResolver, UserLoginResolver, HealthResolver],
        }),
        tracing: true,
        context: ({ req, res }) => ({ req, res }) // Use context to pass req & response to mutations or queries
    });

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(4000, () => {
        console.log("App is started");
    })
    
    
})();
