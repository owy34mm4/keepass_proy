// src/api/axiosInstance.ts
import axios from "axios";

export const axiosAuthInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL, // <-- Esto sí funciona en tiempo de build
});
export const axiosUserInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_API_URL, // <-- Esto sí funciona en tiempo de build
});

console.log("BASE URL:", process.env.NEXT_PUBLIC_AUTH_API_URL);


