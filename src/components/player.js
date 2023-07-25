import { EmbedBuilder } from 'discord.js';
import {
  createAudioResource,
  getVoiceConnection,
  AudioPlayerStatus,
  VoiceConnectionStatus
} from '@discordjs/voice';

import { isNullish, queue } from '../utilities/index.js';

const audioPlayer = async (interaction, song) => {
  try {
    const { guild } = interaction;
    const song_queue = queue.get(guild.id);
    
    const { player, connection } = song_queue;

    // If no song is left in the server queue. Leave voice channel and delete items from the global queue.
    if (isNullish(song)) {
      song_queue.player.stop();
      connection.destroy();
      queue.delete(interaction.guild.id);
      return;
    }

    connection.subscribe(player);

    const { url, title, artist, artwork, audio, provider } = song;

    const resource = createAudioResource(audio);

    connection.subscribe(player);

    player.play(resource);

    // when player has finished playing, play the next song in the queue
    player.on(AudioPlayerStatus.Idle, () => {
      song_queue.songs.shift();
      audioPlayer(interaction, song_queue.songs[0]);
    });

    // when player has an error, log it
    player.on('error', (error) => {
      throw new Error(error);
    });

    // Add the event listener for the connection state change
    connection.on('stateChange', (oldState, newState) => {
      if (oldState.status === VoiceConnectionStatus.Ready && newState.status === VoiceConnectionStatus.Connecting) {
        connection.configureNetworking();
      }
    });

    const Embed = new EmbedBuilder()
      .setColor('#ff7a03')
      .setTitle(`${title}${artist ? ` - ${artist}` : ''}`)
      .setURL(url)
      .setAuthor({ name: `Now Playing - via ${provider}`, iconURL: artwork, url })
      .setImage(artwork);

    await interaction.reply({ embeds: [Embed] });
  } catch (err) {
    console.log('Player crashed, values::', {
      interaction,
      song,
      queue,
      err: err.message,
    });
  }
};

export { audioPlayer };
