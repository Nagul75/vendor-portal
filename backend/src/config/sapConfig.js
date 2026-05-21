import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const { SAP_BASE_URL, SAP_USERNAME, SAP_PASSWORD } = process.env;

if (!SAP_BASE_URL || !SAP_USERNAME || !SAP_PASSWORD) {
  throw new Error("Missing SAP_BASE_URL, SAP_USERNAME, or SAP_PASSWORD in environment variables.");
}

const sapAxios = axios.create({
  baseURL: SAP_BASE_URL,
  timeout: 20000,
  auth: {
    username: SAP_USERNAME,
    password: SAP_PASSWORD,
  },
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default sapAxios;
