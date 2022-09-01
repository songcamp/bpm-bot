# BPM Bot Repository

This repository represents the Discord Bot - BPM Bot. This bot currently enables playback in Discord voice channels from these providers:

* (OpenSea)[https://opensea.io/]
* (Catalog)[https://beta.catalog.works/]
* (Zora)[https://zora.co/]
* (Sound.xyz)[https://www.sound.xyz/]

## Development

Currently, best practice to test & work on this bot is to create a new Discord server & a new bot to test with per-developer. In the future, we'd aim to unite around a single development bot for faster onboarding, but for now this should do the trick. To spin up a new Discord server and create a testing bot, follow (this guide)[https://www.digitaltrends.com/gaming/how-to-make-a-discord-bot/]

Once you have your bot installed in a test server, identify the BOT_TOKEN, then create a `.env` file in the root directory of this repository. Add the line below to that file.

```
    CLIENT_TOKEN=<your-bot-token>
    GUILD_ID=<local-guild-id-for-testing>
    STATUS=DEVELOPMENT
```

Once this is done, your testing bot should be hooked up to your testing server. Use the commands below to run the server and develop

Install Dependencies
```
    yarn
```

Start the Server
```
    yarn start
```