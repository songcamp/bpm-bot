import axios from "axios";
import { getUrl } from "../../utilities/index.js";
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

    try {
        const { data } = res.data;

        const metadata = await axios({
            url: data.media.metadataURI.replace("https://ipfs.io/ipfs/", "https://cloudflare-ipfs.com/ipfs/"),
            method: "GET",
        });

        const { title, artwork, artist, mimeType } = metadata.data.body;

        // Only return audio files
        if (!mimeType.includes("audio")) {
            throw new Error("Invalid media type");
        }

        let trackData = [];

        if (!data.media.contentURI) {
            throw err;
        }

        trackData.push({
            url: command,
            title,
            artist,
            artwork: artwork?.info?.uri,
            audio: data.media.contentURI.replace("https://ipfs.io/ipfs/", "https://cloudflare-ipfs.com/ipfs/"),
            provider: "Zora",
        });

        return trackData;
    } catch (err) {
        return null;
    }
};
export { zora };
