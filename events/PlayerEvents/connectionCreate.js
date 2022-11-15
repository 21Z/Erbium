import Event from "../../Base/Event.js";

class ConnectionCreate extends Event {

    constructor(client) {
        super(client);
    }

    run(message, connection) {
        void message.reply(`✅ | Connected to the channel **${connection.channel.name}** [Video Codec: \`${connection.authentication.video_codec}\` | Audio Codec: \`${connection.authentication.audio_codec}\`]`);
    }

}

export default ConnectionCreate;