import { baseUrl } from "./fetchData";

export async function deleteImage(imageId, accessToken) {
  const response = await fetch(`${baseUrl}/images/${imageId}`, {
    method: "DELETE",
    headers: {
      "content-Type": "application/json",
      Authorization: `Berear ${accessToken}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status:${response.status}`);
  }
  const data = await response.json();
  return data;
}
