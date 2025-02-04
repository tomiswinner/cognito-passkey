import { createSession } from "@/app/lib/inMemoryDB";
import { getCognitoClient, getEnvs, getSecretHash } from "@/app/lib/utils";
import {
  AuthFlowType,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const { clientId, clientSecret } = getEnvs();
  const client = getCognitoClient();

  // doc: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-client-cognito-identity-provider/Class/InitiateAuthCommand/
  const command = new InitiateAuthCommand({
    AuthFlow: AuthFlowType.USER_PASSWORD_AUTH, // app client で許可した flow
    ClientId: clientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: getSecretHash(email, clientId, clientSecret),
    },
  });
  const response = await client.send(command);
  console.log("response in get-accessToken");
  console.log(response);
  const accessToken =
    response.AuthenticationResult?.AccessToken ??
    (() => {
      throw new Error("Access token is not found");
    })();

  const sessionId = createSession(accessToken);
  console.log(response);
  const res = NextResponse.json({
    status: "ok",
  });
  res.cookies.set("sessionId", sessionId, {
    httpOnly: true,
    // secure: true,    // localhost のため
    sameSite: "lax",
    maxAge: 60 * 10, // 10 minutes
  });
  return res;
}
