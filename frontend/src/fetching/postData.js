import { baseUrl } from "./fetchData";

// LOGIN
export async function postLoginData(username, password) {
  const response = await fetch(`${baseUrl}/users/signin`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status:${response.status}`);
  }
  const data = await response.json();
  return data;
}
