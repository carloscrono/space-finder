import { handler } from "../src/services/spaces/handler";

process.env.AWS_REGION = "us-east-1";
process.env.TABLE_NAME = "SpaceTable-0e0609817685";

handler(
  {
    httpMethod: "GET",
    queryStringParameters: {
      id: "5fc1b1d0-a954-4056-ae54-0f83356de137",
    },
  } as any,
  {} as any
);
