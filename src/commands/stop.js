import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel, getVoiceConnections } from '@discordjs/voice';


export default {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops all music playing"),
    
  async execute(interaction, client) {
    const string = interaction.options.getString('input');

    const voiceChannel = interaction?.member?.voice;

    // console.log('VOICE CHANNELL', voiceChannel);
    console.log('interaction CHANNELL', interaction?.member.voiceStates);

    joinVoiceChannel({
      channelId: '888795920311910483',
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    console.log(getVoiceConnections());


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
  },
};
