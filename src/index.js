import { Client, GatewayIntentBits } from 'discord.js';
import boilerplateClient from './utilities/boilerplateClient.js';
/* Initialize client */
const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildVoiceStates
    ],
});

const boilerplateComponents = async () => {
  boilerplateClient(client);
}

boilerplateComponents();