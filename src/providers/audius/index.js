import axios from 'axios';
import { getUrl } from '../../utilities/index.js';
// Audius requires us to dynamically fetch endpoints
// we use get_url to fetch the endpoint
const get_url = 'https://api.audius.co';
const stream_url = 'https://discovery-au-01.audius.openplayer.org/v1/tracks';
const app_name = 'CLUB_BPM';

const audius = async (command) => {
  try {
    const url = await axios({ url: get_url, method: 'get' });
    const { artist, song } = getUrl(command);

    const res = await axios({
      url: `${url.data.data[0]}/v1/full/tracks?handle=${artist}&slug=${song}`,
      method: 'get',
    });

    const { data } = res.data;

    let trackData = [];
    // If no data.id we have no music stream
    if (!data?.id) {
      throw new error('Failed to get music from Audius.');
    }

    trackData.push({
      url: command,
      title: data?.title,
      artist: data?.user?.name,
      artwork: data?.artwork['480x480'],
      audio: `${stream_url}/${data.id}/stream?app_name=${app_name}`,
      provider: 'Audius',
    });
    return trackData;
  } catch (err) {
    return null;
  }
};
export { audius };
