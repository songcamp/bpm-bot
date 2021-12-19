import axios from "axios";
import { url, GET_TRACK } from "./queries.js";
import { isNullish } from "../../utilities/index.js";

const getTrack = async (artist, song, command) => {
    const res = await axios({
        url,
        method: "post",
        data: {
            query: GET_TRACK,
            variables: { handle: artist, shortUrl: song },
        },
    });
    const {
        data: { tracks },
    } = res.data;
    
    if (!Array.isArray(tracks) || tracks.length === 0) {
        throw new Error('Catalog track not found');
    }

    return tracks.map((d) => {
        if (isNullish(d?.ipfs_hash_lossy_audio)) {
            throw new Error('Catalog track not found');
        }

        return {
            url: command,
            title: d.title,
            artist: d.artist.name,
            artwork: `https://ipfs.fleek.co/ipfs/${d.ipfs_hash_lossy_artwork}`,
            audio: `https://ipfs.fleek.co/ipfs/${d.ipfs_hash_lossy_audio}`,
            provider: "Catalog",
        };
    });
};

export { getTrack };
