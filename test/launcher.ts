import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "SpaceTable-0e0609817685";

handler(
  {
    httpMethod: "POST",
    body: JSON.stringify({
      location: "Dublin updated",
    }),
  } as any,
  {} as any
).then((result) => {
  console.log(result);
});
