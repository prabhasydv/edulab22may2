const dev = "http://localhost:8080";
const prod = "https://mern-todo.surge.sh";

export const basedURL =
  window.location.hostname.split(":")[0] === "localhost" ||
  window.location.hostname.includes("192")
    ? dev
    : prod;