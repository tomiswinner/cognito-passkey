"use client";
import { useState } from "react";
import { delPskyHandler } from "./handler/delPskyHandler";
import { loginPskyHandler } from "./handler/loginPskyHandler";
import { regHandler } from "./handler/regPskyhandler";
import { tokenHandler } from "./handler/tokenHandler";
import NextAuthProvider from "./lib/NextAuth";
import MngLogin from "./mngLogin";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div>
        <h2>Managed Login</h2>
        <NextAuthProvider>
          <MngLogin />
        </NextAuthProvider>
      </div>
      <div>
        <h2>パスキー</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => tokenHandler(email, password)}>
          Get access token
        </button>
      </div>
      <div>
        <button onClick={regHandler}>Register passkey</button>
      </div>
      <div>
        <button onClick={() => loginPskyHandler(email)}>
          Login with passkey
        </button>
      </div>
      <div>
        <button onClick={() => delPskyHandler(email)}>Delete passkey</button>
      </div>
    </>
  );
}
