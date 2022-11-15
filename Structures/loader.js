import { readdirSync } from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = `${__dirname}/structures`;

let done = false;

export function load() {
    if (!!done) return;

    const structs = readdirSync(dir)

    for (const struct of structs) {
        try {
            // load all structures
            require(`${dir}/${struct}`);
        } catch { };
    }

    done = true;
}