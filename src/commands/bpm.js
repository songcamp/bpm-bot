import { SlashCommandBuilder } from 'discord.js';
import { joinVoiceChannel, createAudioPlayer } from '@discordjs/voice';
import { queue, isNullish, isValidUrl } from '../utilities/index.js';
import { providerSelect } from '../utilities/providerSelect.js';
import { audioPlayer } from '../components/player.js';

export default {
  data: new SlashCommandBuilder()
    .setName('bpm')
    .setDescription('Play a song.')
    .addStringOption((option) =>
      option
        .setName('song')
        .setDescription(
          'Drop a link to an audio NFT from Catalog, Zora, Sound or Opensea.'
        )
        .setRequired(true)
    ),

  async execute(interaction, client) {
    try {
      const command = interaction.options.getString('song');
      const voiceChannel = interaction.member.voice.channelId;
      const server_queue = queue.get(interaction.guild.id);

      if (!voiceChannel) {
        await interaction.reply(
          'You must be in an active voice channel to use this command.'
        );
      } else if (!isValidUrl(command)) {
        await interaction.reply('Supplied URL is not valid.');
      } else {
        const res = await providerSelect(command);

        if (isNullish(server_queue)) {
          if (isNullish(res)) {
            throw new Error(`No audio provider for: ${command}`);
          }

          const connection = joinVoiceChannel({
            channelId: voiceChannel,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
          });

          const queue_constructor = {
            voice_channel: voiceChannel,
            text_channel: interaction.channel,
            connection: null,
            songs: [],
            player: createAudioPlayer(),
          };

          // Add our key and value pair into the global queue. We then use this to get our server queue.
          queue.set(interaction.guild.id, queue_constructor);

          res.forEach((d) => queue_constructor.songs.push(d));

          queue_constructor.connection = connection;

          audioPlayer(interaction, { ...queue_constructor.songs[0] });
        } else {
          res.forEach((d) => server_queue.songs.push({ ...d }));
          interaction.reply(
            `Song${res.length > 1 ? 's' : ''} added to the queue!`
          );
        }
      }
    } catch (err) {
      interaction.reply(err.message);
    }
  },
};
