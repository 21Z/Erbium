const { request } = require("https");
const moment = require("moment");
require("moment-duration-format")(moment);

class Util {

    static properCase(str) {
        return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    static formatDuration(dur) {
        const duration = moment.duration(dur).format("M [months], D [days], H [hours], m [minutes], s [seconds]", { trim: "both mid" });
        return duration;
    }

    static cleanText(text, token = process.env.DISCORD_TOKEN) {
        if (typeof text !== "string") text = require("util").inspect(text, { depth: 2 });

        text = text
            .replace(new RegExp(token, "g") ?? "", "mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0")
            .replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/, "@" + String.fromCharCode(8203));

        return text;
    }

    static hastebin(text) {
        return new Promise((resolve, reject) => {
            const req = request({ hostname: "bin.stegripe.org", path: "/documents", method: "POST", minVersion: "TLSv1.3" }, res => {
                let raw = "";
                res.on("data", chunk => raw += chunk);
                res.on("end", () => {
                    if (res.statusCode >= 200 && res.statusCode < 300) return resolve(`https://bin.stegripe.org/${JSON.parse(raw).key}`);
                    return reject(new Error(`[hastebin] Error while trying to send data to https://bin.stegripe.org/documents, ${res.statusCode} ${res.statusMessage}`));
                });
            }).on("error", reject);
            req.write(typeof text === "object" ? JSON.stringify(text, null, 2) : text);
            req.end();
        });
    }

    static reverse(text) {
        return `${text}`.split("").reverse().join("");
    }

    static get buttons() {
        return {
            BLURPLE: 1,
            GRAY: 2,
            GREY: 2,
            GREEN: 3,
            RED: 4,
            URL: 5,
            LINK: 5,
        };
    }

}

module.exports = Util;
