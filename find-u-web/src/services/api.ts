import axios from "axios";

export const discordApi = axios.create({
  baseURL: 'http://discord.com/api'
})

export const mainApi = axios.create({
  baseURL: 'http://localhost:3001'
})