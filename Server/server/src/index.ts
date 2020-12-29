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

// Do not use in PRODUCTION: GraphQL Lifecycle logger - DEV only
import { graphql_REQ_Query_LifeCycle_Logger_dev } from "./utils/graphql_REQ_Query_LifeCycle.Logger.dev";


(async () => {
    const app = express();
    app.use(morgan('combined'));
    await createConnection();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                UserRegistrationResolver,
                UserLoginResolver, 
                HealthResolver, 
                ProtectedResolverHealth
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
