import axios from "axios";
import { url, GET_SPACES } from "./queries.js";
const getSpaces = async (spaceId, command) => {
    const res = await axios({
        url,
        method: "post",
        data: {
            query: GET_SPACES,
            variables: { spaceId },
        },
    });
    const {
        data: { spaces_by_pk },
    } = res.data;

    let trackData = [];
    spaces_by_pk.tracks.map((d) => {
        if (!d?.track?.ipfs_hash_lossy_audio) {
            throw err;
        }
        trackData.push({
            url: command,
            title: d.track.title,
            artist: d.track.artist.name,
            artwork: `https://ipfs.fleek.co/ipfs/${d.track.ipfs_hash_lossy_artwork}`,
            audio: `https://ipfs.fleek.co/ipfs/${d.track.ipfs_hash_lossy_audio}`,
            provider: "Catalog Spaces",
        });
    });

    return trackData;
};
export { getSpaces };
