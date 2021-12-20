import axios from "axios";
import { getUrl, isNullish } from "../../utilities/index.js";
import { url, GET_ZORA } from "./request.js";

const zora = async (command) => {
    const { song } = getUrl(command);

    const res = await axios({
        url,
        method: "post",
        data: {
            query: GET_ZORA,
            variables: { id: song },
        },
    });

    const { data } = res.data;

    const metadata = await axios({
        url: data.media.metadataURI.replace("https://ipfs.io/ipfs/", "https://cloudflare-ipfs.com/ipfs/"),
        method: "GET",
    });

    const errorMessage = "Failed to find song on Zora. Please check the URL and try again.";

    if (isNullish(metadata?.data?.body)) {
        throw new Error(errorMessage);
    }

    const { title, artwork, artist, mimeType } = metadata.data.body;

    // Only return audio files
    if (!mimeType.includes("audio")) {
        throw new Error("This Zora URL belongs to an NFT that is not an audio file. Please find an audio NFT on Zora & try again.");
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
            audio: data.media.contentURI.replace("https://ipfs.io/ipfs/", "https://cloudflare-ipfs.com/ipfs/"),
            provider: "Zora",
        }
    ];
};
export { zora };
