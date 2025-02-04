## アプリケーションの準備

- `env.copy`ファイルを`.env`ファイルとして用意し、中身を入力

## Cognito の準備

- "Authentication" -> "Sign in" -> "Options for choice-based sign-in" から "Available choices" に passkey を追加
  - Cognito Identity Provider API の場合、"Passkey" -> "Third-party domain" で、"Domain for relying party ID" を`localhost` に変更（マネージドログインの場合、cognito のドメイン）
- "App client" の "Authentication flows" に`ALLOW_USER_PASSWORD_AUTH`を追加
- "App client" の "allowed Callback URLs" を`http://localhost:3000/api/auth/callback/cognito`に変更

## サーバー起動

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
