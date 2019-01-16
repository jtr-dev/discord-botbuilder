## Getting Started

create `.env` file and complete below `process.env` variables:

```
BOT_FRAMEWORK_DIRECT_API_PASSWORD=
DISCORD_BOT_ID=
DISCORD_BOT_NAME=tyler-bot
TAG=!ty
TAG_HASH=<@260462900307689473>
MICROSOFT_BOT_NAME=discordbotcore
```


in your app or botcore file load the service:

```ts
import { DiscordConnector } from 'discord-botbuilder';

new DiscordConnector({
    token: process.env.DISCORD_APP_TOKEN
});
```

# Sample
[`git checkout tyler-discord-bot`](https://github.com/teachtyler/discord-botbuilder/tree/tyler-discord-bot)



