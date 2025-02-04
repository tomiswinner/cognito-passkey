import NextAuth from "next-auth";

import CognitoProvider from "next-auth/providers/cognito";

export const authOptions = {
  providers: [
    // https://next-auth.js.org/providers/cognito#example
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID ?? "",
      clientSecret: process.env.COGNITO_CLIENT_SECRET ?? "",
      issuer: process.env.COGNITO_ISSUER ?? "",
      authorization: {
        params: {
          redirect_uri: "http://localhost:3000/api/auth/callback/cognito",
        },
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
