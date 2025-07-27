export const request = async (path: string, method = "GET", body = {}) => {
  const r = await fetch(`${import.meta.env.VITE_API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
    method: method,
    body: method !== "GET" ? JSON.stringify(body) : undefined,
  });
  if (r.status > 399) {
    throw new Error("OPAA");
  }
  const d = await r.json();
  return d;
};
