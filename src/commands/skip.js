import { SlashCommandBuilder } from 'discord.js';
import { audioPlayer } from '../components/player.js';
import { queue } from '../utilities/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip to the next song in the queue.'),

  async execute(interaction, client) {
    try {
      const server_queue = queue.get(interaction.guild.id);

      if (!server_queue) {
        return interaction.reply(`There are no songs in the queue!`);
      }

      server_queue.songs.shift();

      if (server_queue.songs.length === 0) {
        server_queue.player.stop();
        const connection = server_queue.connection;
        connection.destroy();
        queue.delete(interaction.guild.id);
        interaction.reply('No more songs in the queue!');
      } else {
        audioPlayer(interaction, server_queue.songs[0]);
      }
    } catch (error) {
      throw new Error('Error in /skip command');
    }
  },
};
