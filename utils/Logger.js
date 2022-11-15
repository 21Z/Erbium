const chalk = require("chalk");

class Logger {

    static log(m) {
        console.log(`[${chalk.whiteBright("LOG")}] ${m}`);
    }

    static error(m) {
        console.log(`[${chalk.redBright("ERROR")}] ${m}`);
    }

    static success(m) {
        console.log(`[${chalk.greenBright("SUCCESS")}] ${m}`);
    }

    static info(m) {
        console.log(`[${chalk.cyanBright("INFO")}] ${m}`);
    }

    static warn(m) {
        console.log(`[${chalk.yellowBright("WARNING")}] ${m}`);
    }

}

module.exports = Logger;