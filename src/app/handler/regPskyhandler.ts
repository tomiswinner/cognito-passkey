"use client";

import { startRegistration } from "@simplewebauthn/browser";

export async function regHandler() {
  console.log("regHandler is called");
  const cognitoRes = await fetch(
    "http://localhost:3000/api/api-auth/reg-psky",
    {
      method: "POST",
      credentials: "same-origin", // クッキーを送信
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!cognitoRes.ok) {
    throw new Error("Failed to get challenge");
  }
  const cognitoCredOptions = await cognitoRes.json();
  console.log("cognitoCredOptions in Client:");
  console.log(cognitoCredOptions);

  const attResp = await startRegistration({ optionsJSON: cognitoCredOptions });
  if (!attResp) {
    throw new Error("Failed to create credential");
  }
  console.log("attResp in Client:");
  console.log(attResp);

  const finishRes = await fetch(
    "http://localhost:3000/api/api-auth/finish-psky",
    {
      method: "POST",
      body: JSON.stringify(attResp),
    }
  );
  console.log(finishRes);
  console.log("Complete reg-handler");
  alert("Passkey Registration success");
}
