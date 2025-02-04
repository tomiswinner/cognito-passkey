import { getCognitoClient, getEnvs, getSecretHash } from "@/app/lib/utils";
import {
  AuthFlowType,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("/api/auth/login-psky is called");
  const { email } = await req.json();
  const { clientId, clientSecret } = getEnvs();
  const client = getCognitoClient();

  // USER_AUTH
  // // The entry point for sign-in with passwords, one-time passwords, and WebAuthN authenticators
  // // https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/cognito-identity-provider/command/InitiateAuthCommand/
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_AUTH,
    ClientId: clientId,
    AuthParameters: {
      // For USER_AUTH: USERNAME (required), PREFERRED_CHALLENGE
      USERNAME: email,
      PREFERRED_CHALLENGE: "WEB_AUTHN", // https://docs.aws.amazon.com/cognito/latest/developerguide/authentication-flows-selection-sdk.html#authentication-flows-selection-choice
      SECRET_HASH: getSecretHash(email, clientId, clientSecret),
    },
  });
  const response = await client.send(command);
  if (!response) {
    return NextResponse.json({ error: "response not found" }, { status: 400 });
  }
  console.log("InitiateAuthCommand response");
  console.log(response);
  return NextResponse.json(response);
}
