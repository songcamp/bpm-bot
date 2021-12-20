import axios from "axios";
import { getUrl, isNullish } from "../../utilities/index.js";
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

    const { data: { getMintedRelease: d } } = res.data;
    if (isNullish(d?.tracks[0]?.audio?.url)) {
        throw new Error('Sound xyz track not found');
    }
    
    return [
        {
            url: command,
            title: d?.title,
            artist: d?.artist.name,
            artwork: d?.coverImage.url,
            audio: d?.tracks[0].audio.url,
            provider: "Sound",
        }
    ];
};

export { sound };
