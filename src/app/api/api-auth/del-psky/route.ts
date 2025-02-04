import { getAccessToken } from "@/app/lib/inMemoryDB";
import { getCognitoClient } from "@/app/lib/utils";
import {
  DeleteWebAuthnCredentialCommand,
  ListWebAuthnCredentialsCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const client = getCognitoClient();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId not found" }, { status: 400 });
  }
  const accessToken = getAccessToken(sessionId);

  // doc : https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/cognito-identity-provider/command/ListWebAuthnCredentialsCommand/
  const command = new ListWebAuthnCredentialsCommand({
    AccessToken: accessToken,
  });
  const lsCrdRes = await client.send(command);
  console.log("lsCrdRes");
  console.log(lsCrdRes);

  for (const item of lsCrdRes.Credentials ?? []) {
    // doc : https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/cognito-identity-provider/command/DeleteWebAuthnCredentialCommand/
    const command = new DeleteWebAuthnCredentialCommand({
      AccessToken: accessToken,
      CredentialId: item.CredentialId,
    });
    const delRes = await client.send(command);
    console.log(`cred ${item.CredentialId} deleted`);
    console.log(delRes);
  }
  return NextResponse.json(lsCrdRes);
}
