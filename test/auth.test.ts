import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "../src/services/auth/AuthService";

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login("carloscrono", "sdf45Aaf574fg$");
  const idToken = await service.getIdToken();
  console.log(idToken);
  console.log(loginResult);
  const credentials = await service.generateTemporaryCredentials();
  const buckets = await listBuckets(credentials);
  console.log(buckets);
}

async function listBuckets(credentials: any) {
  const client = new S3Client({
    credentials: credentials,
  });
  const command = new ListBucketsCommand();
  const result = await client.send(command);
  return result;
}

testAuth();
