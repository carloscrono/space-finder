import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";

import { postSpaces } from "./PostSpaces";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { getSpaces } from "./GetSpaces";
import { updateSpace } from "./UpdateSpace";
import { deleteSpace } from "./DeleteSpace";
import { JsonError, MissingFieldError } from "../shared/Validator";
import { addCorsHeader } from "../shared/Utils";
import { captureAWSv3Client } from 'aws-xray-sdk-core'
import { resolve } from "path";

const ddbClient = captureAWSv3Client(new DynamoDBClient({}));



async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let response: APIGatewayProxyResult;

  try {
    switch (event.httpMethod) {
      case "GET":
        response = await getSpaces(event, ddbClient);
        break;
      case "POST":
        response = await postSpaces(event, ddbClient);
        break;
      case "PUT":
        response = await updateSpace(event, ddbClient);
        break
      case "DELETE":
        response = await deleteSpace(event, ddbClient);
        break
      default:
        break;
    }
  } catch (error) {
    if (error instanceof MissingFieldError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }
    if (error instanceof JsonError) {
      return {
        statusCode: 400,
        body: error.message,
      };
    }
    return {
      statusCode: 500,
      body: error.message,
    };
  }

  addCorsHeader(response);
  return response;
}

export { handler };
