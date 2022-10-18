import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { queue, emojiNumbers } from '../utilities/index.js';

export default {
  data: new SlashCommandBuilder()
    .setName('np')
    .setDescription('View currently queued songs.'),

  async execute(interaction, client) {
    try {
      const server_queue = queue.get(interaction.guild.id);

      if (!server_queue) {
        return interaction.reply(`There are no songs in the queue!`);
      }

      let fields = [];

      server_queue.songs.forEach((a, i) =>
        fields.push({
          name: emojiNumbers[i + 1],
          value: `${a.title} - ${a.artist}`,
        })
      );

      const Embed = new EmbedBuilder()
        .setColor('#ff7a03')
        .setTitle(`${fields.length} songs in the queue`)
        .addFields(fields.slice(0, 10));

      interaction.reply({ embeds: [Embed] });
    } catch (error) {
      throw new Error('Error in /np command');
    }
  },
};
