export const baseUrl = "http://localhost:3001";

export const fetchData = async (url) => {
  const response = await fetch(`${baseUrl}/${url}`, { method: "GET" });
  const data = await response.json();
  return data;
};

export const fetchUser = async () => {
  const data = await fetchData("users");
  return data;
};

export const fetchImage = async () => {
  const data = await fetchData("images");
  return data;
};

export const fetchCategory = async () => {
  const data = await fetchData("categories");
  return data;
};
