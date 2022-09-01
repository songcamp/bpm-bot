import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { joinVoiceChannel, getVoiceConnections } from '@discordjs/voice';


export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Learn more about the bot."),
    
  async execute(interaction, client) {
    const Embed = new EmbedBuilder().setColor('#ff7a03').setDescription(`
    **/bpm {music NFT URL}** — bot joins call + starts playing the first song
    
    ↳ repeat this step to add more songs to the queue.
    
    **/np** — view the current queue list.
    
    **/skip** — skip the current song.
    
    **/stop** — BPM stops playing, clears the queue and leaves the call.

    For more info checkout: https://bpm.gg/docs
    `);

    interaction.reply({ embeds: [Embed] });
  },
};
