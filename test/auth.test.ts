import { AuthService } from "../src/services/auth/AuthService";

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login("carloscrono", "sdf45Aaf574fg$");
  const idToken = await service.getIdToken();
  console.log(idToken);
  console.log(loginResult);
  const credentials = await service.generateTemporaryCredentials();
  const a = 5;
}

testAuth();
