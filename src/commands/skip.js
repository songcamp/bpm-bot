import { SlashCommandBuilder } from 'discord.js';
import { audioPlayer } from '../components/player.js';
import { queue } from '../utilities/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip to the next song in the queue."),

  async execute(interaction, client) {
    const server_queue = queue.get(interaction.guild.id);

    if (!server_queue) {
      return interaction.reply(`There are no songs in the queue!`);
    }

    server_queue.songs.shift();
    audioPlayer(interaction, server_queue.songs[0]);
  },
};
