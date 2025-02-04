import { getAccessToken } from "@/app/lib/inMemoryDB";
import { getCognitoClient } from "@/app/lib/utils";
import { CompleteWebAuthnRegistrationCommand } from "@aws-sdk/client-cognito-identity-provider";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const credential = await request.json();
  console.log("credential");
  console.log(credential);
  // doc : https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/cognito-identity-provider/command/CompleteWebAuthnRegistrationCommand/
  const client = getCognitoClient();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("sessionId")?.value;
  if (!sessionId) {
    return NextResponse.json({ error: "sessionId not found" }, { status: 400 });
  }
  const command = new CompleteWebAuthnRegistrationCommand({
    AccessToken: getAccessToken(sessionId),
    Credential: credential,
  });
  const response = await client.send(command);
  console.log(response);
  return NextResponse.json(response);
}
