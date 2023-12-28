import { createGraphiQLFetcher } from "@graphiql/toolkit";
import { GraphiQL } from "graphiql";
import { createRoot } from "react-dom/client";
import "./graphiql.html";
import "graphiql/graphiql.css";

// import { config } from "../shared/config.js";
const config = { domain: "localhost", port: "4000" };

// const fetcher = createGraphiQLFetcher({ url: `${config.domain}:${config.port}/graphql` });
const fetcher = createGraphiQLFetcher({ url: `http://${config.domain}:${config.port}/graphql` });

const root = createRoot(document.getElementById("root"));
root.render(GraphiQL({ fetcher }));
