export async function delPskyHandler(email: string) {
  console.log("delPskyHandler is called");
  await fetch("http://localhost:3000/api/api-auth/del-psky", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
  console.log("Cred deleted");
  alert("Cred is successfully deleted");
}
