"use strict";

import * as path from "path";

import express from "express";
import { buildSchema } from "graphql";
import { createHandler } from 'graphql-http/lib/use/express';

import { config } from "../shared/config.js";
import { readFileFrom } from "../shared/fileio.js";

import { createMessage, getMessage, updateMessage } from "./message.js";
import { RandomDie } from "./randomDie.js";

function createSchema() {
    const loadGraphqlFile = readFileFrom(config.graphQlDirectory.server);
    const schemaSource = loadGraphqlFile("Schema.graphql");
    return buildSchema(schemaSource);
}

function loggingMiddleware(req, res, next) {
    console.log(`IP address: ${req.ip}`);
    next();
}

async function main() {
    const schema = createSchema();

    // `rootValue` provides a resolver function for each API endpoint
    const rootValue = {
        getMessage,
        createMessage,
        updateMessage,
        random: Math.random,
        randomDie: ({ sides }) => new RandomDie(sides),
        ip: (args, request) => request.ip,
    };

    const graphqlHandler = createHandler({ schema, rootValue });
    const graphiqlFilepath = path.join(config.staticFilesDirectory, "graphiql.html");
    const staticFilepath = config.staticFilesDirectory;

    express()
    .use(loggingMiddleware)
    .use("/static", express.static(staticFilepath))
    .all("/graphql", graphqlHandler)
    .get("/graphiql", (req, res) => res.sendFile(graphiqlFilepath))
    .listen(config.port);

    console.log(`Running a GraphQL API server at http://${config.domain}:${config.port}/graphql`);
}

await main()
