const chalk = require("chalk");

class Logger {

    static log(m) {
        console.log(`[${chalk.whiteBright("LOG")}]`, m);
    }

    static error(m, mm) {
        console.error(`[${chalk.redBright("ERROR")}]`, m, mm ? mm : "");
    }

    static success(m) {
        console.info(`[${chalk.greenBright("SUCCESS")}]`, m);
    }

    static info(m) {
        console.info(`[${chalk.cyanBright("INFO")}]`, m);
    }

    static warn(m) {
        console.warn(`[${chalk.yellowBright("WARNING")}]`, m);
    }

}

module.exports = Logger;
