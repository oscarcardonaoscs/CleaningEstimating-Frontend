const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.mcjscleaningservice.com"
    : "http://localhost:8000";

export default BASE_URL;
