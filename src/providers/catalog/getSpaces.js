import axios from "axios";
import { url, GET_SPACES } from "./queries.js";
import { isNullish } from "../../utilities/index.js";

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

    if (spaces_by_pk.length === 0) {
        throw new Error('Catalog Space not found');
    }

    return spaces_by_pk.tracks.map((d) => {
        if (isNullish(d?.track?.ipfs_hash_lossy_audio)) {
            throw new Error('Catalog Space not found');
        }

        return {
            url: command,
            title: d.track.title,
            artist: d.track.artist.name,
            artwork: `https://ipfs.fleek.co/ipfs/${d.track.ipfs_hash_lossy_artwork}`,
            audio: `https://ipfs.fleek.co/ipfs/${d.track.ipfs_hash_lossy_audio}`,
            provider: "Catalog Spaces",
        };
    });
};
export { getSpaces };
