import NodeFetch from "node-fetch";


// need some stuff globally
Object.defineProperties(globalThis, {
    fetch: {
        value: NodeFetch ?? NodeFetch,
        writable: true,
        configurable: true,
        enumerable: false
    },
});

// load structures
import { load } from "./Structures/loader.js";
load()

// instantiate client
import "./client.js";