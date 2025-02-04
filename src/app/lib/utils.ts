import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import crypto from "crypto";

let client: CognitoIdentityProviderClient;

export function getCognitoClient() {
  if (!client) {
    client = new CognitoIdentityProviderClient({
      profile: "for-cognito",
    });
  }
  return client;
}

export function getSecretHash(
  email: string,
  clientId: string,
  clientSecret: string
) {
  // Uint8Array に変換
  const message = new TextEncoder().encode(email + clientId);
  const key = new TextEncoder().encode(clientSecret);
  const secretHash = crypto
    .createHmac("sha256", key) // HMAC stands for Hash-based Message Authentication Code
    .update(message) // HMAC のタネ値
    .digest("base64");
  return secretHash;
}

export function getEnvs() {
  const clientId = process.env.COGNITO_CLIENT_ID;
  const clientSecret = process.env.COGNITO_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Environment variables are not set");
  }
  return { clientId, clientSecret };
}
