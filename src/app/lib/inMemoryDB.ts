type SessionStore = {
  [key: string]: string;
};
const inMemoryDB = {
  sessions: {} as SessionStore,
};

export function createSession(accessToken: string): string {
  const sessionId = crypto.randomUUID();
  inMemoryDB.sessions[sessionId] = accessToken;
  console.log(inMemoryDB.sessions);
  return sessionId;
}

export function updateSession(sessionId: string, accessToken: string): void {
  inMemoryDB.sessions[sessionId] = accessToken;
}

export function getAccessToken(sessionId: string): string {
  const accessToken = inMemoryDB.sessions[sessionId];
  if (!accessToken) {
    throw new Error("accessToken not found");
  }
  return accessToken;
}

// export function deleteSession(sessionId: string): boolean {
//   delete inMemoryDB.sessions[sessionId];
//   console.log(inMemoryDB.sessions);
//   return true;
// }
