"use strict";

import * as path from "path";

const projectRoot = "/Users/br1an/Code/hello-graphql";

export const config = {
    domain: "localhost",
    port: 4000,
    projectRoot,
    staticFilesDirectory: path.join(projectRoot, "static"),
    graphQlDirectory: {
        client: path.join(projectRoot, "/src/cli"),
        server: path.join(projectRoot, "/src/server")
    }
};
