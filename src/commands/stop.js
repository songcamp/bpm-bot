import { SlashCommandBuilder } from 'discord.js';
import { queue } from '../utilities/index.js';


export default {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops music playing."),

  async execute(interaction, client) {
    const server_queue = queue.get(interaction.guild.id);

    if (!server_queue) {
      return interaction.reply(`There are no songs in the queue!`);
    }
    
    server_queue.player.stop();
    const connection = server_queue.connection;
    connection.destroy();
    queue.delete(interaction.guild.id);
    interaction.reply('Music stopped!');
  },
};
