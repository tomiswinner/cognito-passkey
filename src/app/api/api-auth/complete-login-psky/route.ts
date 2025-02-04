import { getCognitoClient, getEnvs, getSecretHash } from "@/app/lib/utils";
import {
  ChallengeNameType,
  RespondToAuthChallengeCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("/api/auth/complete-login-psky が呼ばれました");
  const { assessResp, session, email } = await req.json();
  const { clientId, clientSecret } = getEnvs();
  const client = getCognitoClient();

  // doc: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/cognito-identity-provider/command/RespondToAuthChallengeCommand/
  const command = new RespondToAuthChallengeCommand({
    ClientId: clientId,
    ChallengeName: ChallengeNameType.WEB_AUTHN, // https://github.com/aws/aws-sdk-go-v2/blob/main/service/cognitoidentityprovider/api_op_InitiateAuth.go#L245
    ChallengeResponses: {
      USERNAME: email,
      // AuthenticationResponseJSON : https://www.w3.org/TR/webauthn-3/#dictdef-authenticationresponsejson
      CREDENTIAL: JSON.stringify(assessResp), // json ではなく、Record<string, string> なので文字列になるため注意
      SECRET_HASH: getSecretHash(email, clientId, clientSecret), // You must provide a SECRET_HASH parameter in all challenge responses to an app client that has a client secret. : https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_RespondToAuthChallenge.html
    },
    Session: session,
  });
  const response = await client.send(command);
  console.log("RespondToAuthChallengeCommand response");
  console.log(response);
  return NextResponse.json(response);
}
