import { getAccessToken } from "@/app/lib/inMemoryDB";
import {
  CognitoIdentityProviderClient,
  StartWebAuthnRegistrationCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  // doc : https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/cognito-identity-provider/command/StartWebAuthnRegistrationCommand/
  console.log("/api/auth/reg-psky is called");
  const client = new CognitoIdentityProviderClient({
    profile: "for-cognito",
  });
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  console.log("sessionId", sessionId);
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId not found" }, { status: 400 });
  }
  const command = new StartWebAuthnRegistrationCommand({
    AccessToken: getAccessToken(sessionId),
  });
  const response = await client.send(command);
  console.log("StartWebAuthnRegistrationCommand response");
  console.log(response);
  return NextResponse.json(response.CredentialCreationOptions);
}
