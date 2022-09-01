import { readdir } from "fs";

const eventLoader = (client) => {
  readdir("./src/events/", (err, files) => {
    if (err) return console.error(err);

    files.forEach(async (file) => {
      const event = import(`../events/${file}`);
      const waitEvent = await event;
      const fileImport = waitEvent.default;
      let eventName = file.split(".")[0];
      client.on(eventName, fileImport.bind(client));
    });
  });
};

export default eventLoader;