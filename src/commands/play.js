import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel, getVoiceConnections } from '@discordjs/voice';


export default {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song.").addStringOption(option =>
      option.setName('input')
        .setDescription('Drop a link to an audio NFT from Catalog, Zora, Sound or Opensea.')
        .setRequired(true)),

  async execute(interaction, client) {
    const string = interaction.options.getString('input');
    const voiceChannel = interaction.member.voice.channelId

    if (!voiceChannel) {
      await interaction.reply('You must be in an active voice channel to use this command');
    } else {
      joinVoiceChannel({
        channelId: voiceChannel,
        guildId: interaction.guildId,
        adapterCreator: interaction.guild.voiceAdapterCreator,
      });

      const pingembed = new EmbedBuilder()
        .setColor("#5865f4")
        .setTitle(`:ping_pong:  ${string}!`)
        .addFields(
          {
            name: "**Api** latency",
            value: `> **${Math.round(client.ws.ping)}**ms`,
            inline: false,
          }
        )
        .setTimestamp();


      const button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel('Discord Ping')
          .setStyle(5)
          .setEmoji('💻')
          .setURL('https://discordstatus.com/'),
      );

      await interaction.reply({
        embeds: [pingembed],
        components: [button],
      });
      setTimeout(() => {
        button.components[0].setDisabled(true);
        interaction.editReply({ embeds: [pingembed], components: [button] });
      }, 120000);
    }
  },
};
