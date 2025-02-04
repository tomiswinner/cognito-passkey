"use client";
export async function tokenHandler(email: string, password: string) {
  console.log(email, password);
  const res = await fetch(
    "http://localhost:3000/api/api-auth/get-accessToken",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );
  const data = await res.json();
  console.log(data);
  alert("Access token is successfully acquired");
}
