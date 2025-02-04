import { InitiateAuthCommandOutput } from "@aws-sdk/client-cognito-identity-provider";
import { startAuthentication } from "@simplewebauthn/browser";

export async function loginPskyHandler(email: string) {
  console.log("loginPskyHandler is called");
  const initiateAuthRes = await fetch(
    "http://localhost:3000/api/api-auth/login-psky",
    {
      method: "POST",
      body: JSON.stringify({ email }),
    }
  );
  const cognitoData =
    (await initiateAuthRes.json()) as InitiateAuthCommandOutput;
  const session = cognitoData.Session;
  if (cognitoData.ChallengeName !== "WEB_AUTHN") {
    throw new Error("Passkey is not registered");
  }
  const credentialReqOps = JSON.parse(
    cognitoData.ChallengeParameters?.CREDENTIAL_REQUEST_OPTIONS ?? ""
  );
  console.log("credentialReqOps");
  console.log(credentialReqOps);
  const assessResp = await startAuthentication({
    optionsJSON: credentialReqOps,
  });
  console.log("assessResp in Client:");
  console.log(assessResp);

  const respondToAuthChallengeRes = await fetch(
    "http://localhost:3000/api/api-auth/complete-login-psky",
    {
      method: "POST",
      body: JSON.stringify({ assessResp, session, email }),
    }
  );
  console.log("respondToAuthChallengeRes");
  console.log(respondToAuthChallengeRes);
  console.log("Complete login-psky-handler");
  alert("Passkey Login success");
}
