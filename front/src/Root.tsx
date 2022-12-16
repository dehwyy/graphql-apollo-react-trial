import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:727/graphql",
    cache: new InMemoryCache()
})
const root = createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>
)