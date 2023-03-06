import axios from 'axios';
import { getUrl, isNullish, ipfsConverter } from '../../utilities/index.js';
import { url, GET_ZORA } from './request.js';

const zora = async (command) => {
  const { song } = getUrl(command);
  if (command.includes('collections')) {
    const res = await axios(
      `https://zora.co/personalize/api/collection/${song}`
    );

    const { collection } = res.data;

    return [
      {
        url: command,
        title: collection.title,
        artist: null,
        artwork: ipfsConverter(collection.coverImageUrl),
        audio: ipfsConverter(collection.mediaUrl),
        provider: 'Zora Collection',
      },
    ];
  } else {
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

    if (isNullish(metadata?.data)) {
      throw new Error(errorMessage);
    }
    // Only return audio files
    if (
      metadata?.data?.body
        ? !metadata?.data?.body?.mimeType.includes('audio')
        : !metadata?.data?.mimeType.includes('audio')
    ) {
      throw new Error(
        'This Zora URL belongs to an NFT that is not an audio file. Please find an audio NFT on Zora & try again.'
      );
    }

    return [
      metadata?.data?.body
        ? {
            url: command,
            title: metadata.data.body.title,
            artist: metadata.data.body.artist,
            artwork: metadata.data.body.artwork?.info?.uri,
            audio: ipfsConverter(data.media.contentURI),
            provider: 'Zora',
          }
        : {
            url: command,
            title: metadata.data.name,
            artist: null,
            artwork: null,
            audio: ipfsConverter(data.media.contentURI),
            provider: 'Zora',
          },
    ];
  }
};
export { zora };
