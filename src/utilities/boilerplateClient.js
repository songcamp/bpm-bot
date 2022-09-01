import { Collection } from 'discord.js';
import dotenv from 'dotenv';
import eventLoader from './eventLoader.js';  

dotenv.config();

const boilerplateClient = (client) => {
  eventLoader(client);
  client.commands = new Collection();
  client.login(process.env.CLIENT_TOKEN);
}

export default boilerplateClient;