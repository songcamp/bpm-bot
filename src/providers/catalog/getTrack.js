import axios from "axios";
import { url, GET_TRACK } from "./queries.js";
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

    let trackData = [];
    tracks.map((d) => {
        if (!d?.ipfs_hash_lossy_audio) {
            throw err;
        }
        trackData.push({
            url: command,
            title: d.title,
            artist: d.artist.name,
            artwork: `https://ipfs.fleek.co/ipfs/${d.ipfs_hash_lossy_artwork}`,
            audio: `https://ipfs.fleek.co/ipfs/${d.ipfs_hash_lossy_audio}`,
            provider: "Catalog",
        });
    });

    return trackData;
};

export { getTrack };
