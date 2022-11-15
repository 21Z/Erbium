import Erbium from "./Base/Erbium.js";
import { config } from "dotenv";

config();

// instantiate client
const client = new Erbium();

// connect to discord
client.login(process.env.DISCORD_TOKEN);

export default client;