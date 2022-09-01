import { REST } from "@discordjs/rest";
import chalk  from "chalk";
import { Routes } from "discord-api-types/v9";
import { readdirSync } from "fs";
import dotenv from 'dotenv';

dotenv.config();

const ready = async (client) => {

  const commandFiles = readdirSync("./src/commands/").filter((file) =>
    file.endsWith(".js")
  );

  const commands = [];

  for (const file of commandFiles) {
    const command = await import(`../commands/${file}`);
    commands.push(command.default.data.toJSON());
    client.commands.set(command.default.data.name, command);
  }

  const rest = new REST({
    version: "10",
  }).setToken(process.env.CLIENT_TOKEN);

  (async () => {
    try {
      if (process.env.STATUS === "PRODUCTION") { // If the bot is in production mode it will load slash commands for all guilds
        await rest.put(Routes.applicationCommands(client.user.id), {
          body: commands,
        });
        console.log(`${chalk.white("Boilerplate Bot")} ${chalk.gray(">")} ${chalk.green("Successfully registered commands globally")}`);

      } else {
        await rest.put(
          Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID),
          {
            body: commands,
          }
        );

        console.log(`${chalk.white("Boilerplate Bot")} ${chalk.gray(">")} ${chalk.green("Successfully registered commands locally")}`);
      }
    } catch (err) {
      if (err) console.error(err);
    }
  })();
  // client.user.setPresence({
  //   activities: [{ name: `${process.env.STATUSBOT}` }],
  //   status: `${process.env.DISCORDSTATUS}`,
  // });
};

export default ready;