"use strict";

import { config } from "../shared/config.js";
import { readFileFrom } from "../shared/fileio.js";

function prettyPrint(obj) {
    console.log(JSON.stringify(obj, null, 2));
}

async function sendQuery(query, variables) {
    const response = await fetch(
        `http://${config.domain}:${config.port}/graphql`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({ query, variables })
        }
    );

    return await response.json();
}

async function main() {
    const loadGraphqlFile = readFileFrom(config.graphQlDirectory.client);
    const rollDice = loadGraphqlFile("RollDice.graphql");
    const getMessage = loadGraphqlFile("GetMessage.graphql");
    const createMessage = loadGraphqlFile("CreateMessage.graphql");
    const updateMessage = loadGraphqlFile("UpdateMessage.graphql");

    // We want these to be in series. Don't use Promise.all()
    const result = [
        await sendQuery(rollDice, { count: 10, sides: 12 }),
        await sendQuery(getMessage, { id: 0 }),
        await sendQuery(createMessage, { message: { content: "Hello", author: "Brian" } }),
        await sendQuery(getMessage, { id: 1 }),
        await sendQuery(updateMessage, { id: 1, message: { content: "World", author: "Brian" } }),
        await sendQuery(getMessage, { id: 1 }),
    ];

    prettyPrint(result);
}

await main();
