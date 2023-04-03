const moment = require('moment');
require('moment-duration-format')(moment);

class Util {

    static properCase(str) {
        return str.replace(/([^\W_]+[^\s-]*) */g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }

    static formatDuration(dur) {
        let duration = moment.duration(dur).format('M [Months], D [Days], H [Hours], m [Minutes], s [Seconds]');
        if (duration.includes('1 Months')) duration = duration.replace('Months', 'Month');
        if (duration.includes('1 Days')) duration = duration.replace('Days', 'Day');
        if (duration.includes('1 Hours')) duration = duration.replace('Hours', 'Hour');
        if (duration.includes('1 Minutes')) duration = duration.replace('Minutes', 'Minute');
        if (duration.includes('1 Seconds')) duration = duration.replace('Seconds', 'Second');
        return duration;
    }

    static cleanText(text, token = process.env.DISCORD_TOKEN) {
        if (typeof text !== 'string') text = require('util').inspect(text, { depth: 2 });

        text = text
            .replace(new RegExp(token, 'g') ?? '', 'mfa.VkO_2G4Qv3T--NO--lWetW_tjND--TOKEN--QFTm6YGtzq9PH--4U--tG0')
            .replace(/`/g, '`' + String.fromCharCode(8203))
            .replace(/@/, '@' + String.fromCharCode(8203));

        return text;
    }

    static reverse(text) {
        return `${text}`.split('').reverse().join('');
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

    static atob(text) {
        return Buffer.from(text ?? '', 'base64').toString('utf-8');
    }

    static btoa(text) {
        return Buffer.from(text ?? '').toString('base64');
    }
}

module.exports = Util;