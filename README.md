## Getting Started

create `.env` file and complete below `process.env` variables:

```
BOT_FRAMEWORK_DIRECT_API_PASSWORD=
DISCORD_APP_TOKEN=
DISCORD_BOT_ID=
DISCORD_BOT_NAME=tyler-bot
TAG=!ty
TAG_HASH=<@260462900307689473>
MICROSOFT_BOT_NAME=discordbotcore
LUIS_MODEL_API=
MICROSOFT_APP_ID=
MICROSOFT_APP_PASSWORD=
```


in your app or botcore file load the service:

```ts
import { DiscordConnector } from 'discord-botbuilder';

new DiscordConnector({
    token: process.env.DISCORD_APP_TOKEN
});
```




