import { baseUrl } from "./fetchData";

const fetchDataById = async (url, id) => {
  const response = await fetch(`${baseUrl}/${url}/${id}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const fetchImageById = async (id) => {
  const data = await fetchDataById("images", id);
  return data;
};
