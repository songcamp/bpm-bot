import axios from 'axios';
import { getUrl, isNullish } from '../../utilities/index.js';
// Audius requires us to dynamically fetch endpoints
// we use get_url to fetch the endpoint
const get_url = 'https://api.audius.co';
const stream_url = 'https://discovery-au-01.audius.openplayer.org/v1/tracks';
const app_name = 'CLUB_BPM';

const audius = async (command) => {
  const url = await axios({ url: get_url, method: 'get' });
  const { artist, song } = getUrl(command);

  try {
    const res = await axios({
      url: `${url.data.data[0]}/v1/full/tracks?handle=${artist}&slug=${song}`,
      method: 'get',
    });
  
    const { data } = res.data;
    console.log(data)
    // If no data.id we have no music stream
    if (isNullish(data?.id)) {
      throw new Error('Failed to get music from Audius.');
    }
  
    return [
      {
        url: command,
        title: data?.title,
        artist: data?.user?.name,
        artwork: data?.artwork['480x480'],
        audio: `${stream_url}/${data.id}/stream?app_name=${app_name}`,
        provider: 'Audius',
      }
    ];
  } catch (err) {
    if (err?.message?.includes('404')) {
      throw new Error(`Could not find song "${song.replaceAll('-', ' ')}" by "${artist}" on Audius. Please check the URL & try again.`);
    }
    throw err;
  }
};

export { audius };
