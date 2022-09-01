import { EmbedBuilder } from 'discord.js';
import {
  createAudioResource,
  StreamType,
  getVoiceConnection,
} from '@discordjs/voice';

import { isNullish } from '../utilities/index.js';

const audioPlayer = async (message, song, queue, connection) => {
  try {
    const { guild } = message;
    console.log('WE GOT GUILD:::', guild);
    // const song_queue = queue.get(guild.id);
    
    // const { player, connection } = song_queue;

    // If no song is left in the server queue. Leave voice channel and delete items from the global queue.
    // if (isNullish(song)) {
    //   song_queue.player.stop();
    //   const connection = getVoiceConnection(message.guild.id);
    //   connection.destroy();
    //   queue.delete(message.guild.id);
    //   return;
    // }

    connection;
    connection.subscribe(player);

    const { url, title, artist, artwork, audio, provider } = song;

    const resource = createAudioResource(audio, {
      inputType: StreamType.Arbitrary,
    });

    player.play(resource);

    // when player has finished playing, play the next song in the queue
    // player.on('idle', () => {
    //   song_queue.songs.shift();
    //   audioPlayer(message, song_queue.songs[0], queue);
    // });

    // when player has an error, log it
    player.on('error', (error) => {
      throw new Error(error);
    });

    const Embed = new EmbedBuilder()
      .setColor('#ff7a03')
      .setTitle(`${title}${artist ? ` - ${artist}` : ''}`)
      .setURL(url)
      .setAuthor(`Now Playing - via ${provider}`, artwork, url)
      .setImage(artwork);

    message.channel.send({ embeds: [Embed] });
  } catch (err) {
    console.log('Player crashed, values::', {
      message,
      song,
      queue,
      err: err.message,
    });
  }
};

export { audioPlayer };
