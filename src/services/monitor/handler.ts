import { SNSEvent } from "aws-lambda";

const webHookUrl =
  "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX";

async function handler(event: SNSEvent, context) {
  for (const record of event.Records) {
    await fetch(webHookUrl, {
      method: "POST",
      body: JSON.stringify({
        text: `Huston, we have a problem: \`\`\`${record.Sns.Message}\`\`\``,
      }),
    });
  }
}

export { handler };
