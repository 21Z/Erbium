const fs = require("fs");
const dir = `${__dirname}/structures`;

let done = false;

module.exports.load = function() {
    if (!!done) return;

    const structs = fs.readdirSync(dir)

    for (const struct of structs) {
        try {
            // load all structures
            require(`${dir}/${struct}`);
        } catch { };
    }

    done = true;
};