import "reflect-metadata";
import { App } from "@slack/bolt";
import { config } from "dotenv";

config();

const app = new App({
    token: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    socketMode: true,
    appToken: process.env.SLACK_SOCKET_MODE_TOKEN,
    port: (() => {
        let env = Number(process.env.PORT);
        return isNaN(env) === false ? env : 5000;
    })(),
});

app.message('hello', async ({ message, say }) => {
    console.log(`Message received ${JSON.stringify(message, undefined, 1)}`);
    await say({
        blocks: [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `Hey there <@${(message as any).user}>!`
            },
            "accessory": {
              "type": "button",
              "text": {
                "type": "plain_text",
                "text": "Click Me"
              },
              "action_id": "button_click"
            }
          }
        ],
        text: `Hey there <@${(message as any).user}>!`
      });
});

(
    async () => {
        await app.start();
        console.log('Bolt app is running!');
    }
)();
