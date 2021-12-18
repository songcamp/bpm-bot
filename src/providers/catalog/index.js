import { getUrl, isValidV4UUID } from "../../utilities/index.js";
import { getTrack } from "./getTrack.js";
import { getSpaces } from "./getSpaces.js";

const catalog = async (command) => {
    const { artist, song } = getUrl(command);
    return isValidV4UUID(song) ? getSpaces(song, command) : getTrack(artist, song, command);
};

export { catalog };
