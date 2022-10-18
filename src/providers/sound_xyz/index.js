import axios from 'axios';
import { getUrl, isNullish } from '../../utilities/index.js';
import { url, GET_TRACK, GET_SONG } from './queries.js';

const CLIENT_KEY = process.env.SOUND_CLIENT_KEY;

const sound = async (command) => {
  try {
    const { artist, song } = getUrl(command);

    const res = await axios({
      url,
      method: 'post',
      headers: {
        'x-sound-client-key': CLIENT_KEY,
      },
      data: {
        query: GET_TRACK,
        variables: { soundHandle: artist, releaseSlug: song },
      },
    });

    const {
      data: {
        mintedRelease: { track: id },
      },
    } = res.data;

    if (isNullish(id?.id)) {
      throw new Error('Sound xyz track not found');
    }

    const track = await axios({
      url,
      method: 'post',
      headers: {
        'x-sound-client-key': CLIENT_KEY,
      },
      data: {
        query: GET_SONG,
        variables: { trackId: id.id },
      },
    });

    const {
      data: {
        audioFromTrack: { release, audio },
      },
    } = track.data;

    return [
      {
        url: command,
        title: release?.title,
        artist: release?.artist.name,
        artwork: release?.coverImage.url,
        audio: audio?.url,
        provider: 'Sound',
      },
    ];
  } catch (error) {
    throw new Error(`Failed to find the requested track from sound.xyz`);
  }
};

export { sound };
