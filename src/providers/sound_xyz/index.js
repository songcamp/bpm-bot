import axios from "axios";
import { getUrl } from "../../utilities/index.js";
import { url, GET_SOUND } from "./queries.js";

const sound = async (command) => {
    const { artist, song } = getUrl(command);
    const res = await axios({
        url,
        method: "post",
        data: {
            query: GET_SOUND,
            variables: { soundHandle: artist, releaseSlug: song },
        },
    });

    try {
        const { data } = res.data;
        const d = data.getMintedRelease;

        let trackData = [];
        if (!d?.tracks[0].audio.url) {
            throw err;
        }
        trackData.push({
            url: command,
            title: d?.title,
            artist: d?.artist.name,
            artwork: d?.coverImage.url,
            audio: d?.tracks[0].audio.url,
            provider: "Sound",
        });
        return trackData;
    } catch (err) {
        return null;
    }
};
export { sound };
