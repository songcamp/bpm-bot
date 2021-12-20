import axios from 'axios';
import { getUrl, isNullish, ipfsConverter } from '../../utilities/index.js';
import { url, GET_ZORA } from './request.js';

const zora = async (command) => {
  const { song } = getUrl(command);

  const res = await axios({
    url,
    method: 'post',
    data: {
      query: GET_ZORA,
      variables: { id: song },
    },
  });

  const { data } = res.data;

  const errorMessage =
    'Failed to find song on Zora. Please check the URL and try again.';

  if (isNullish(data?.media?.metadataURI)) {
    throw new Error(errorMessage);
  }
  // Fetch metadata content
  const metadata = await axios({
    url: ipfsConverter(data.media.metadataURI),
    method: 'GET',
  });

  if (isNullish(metadata?.data?.body)) {
    throw new Error(errorMessage);
  }

  const { title, artwork, artist, mimeType } = metadata.data.body;

  // Only return audio files
  if (!mimeType.includes('audio')) {
    throw new Error(
      'This Zora URL belongs to an NFT that is not an audio file. Please find an audio NFT on Zora & try again.'
    );
  }

  if (isNullish(data.media.contentURI)) {
    throw new Error(errorMessage);
  }

  return [
    {
      url: command,
      title,
      artist,
      artwork: artwork?.info?.uri,
      audio: ipfsConverter(data.media.contentURI),
      provider: 'Zora',
    },
  ];
};
export { zora };
