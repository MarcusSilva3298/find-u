import axios from "axios";

export const discordApi = axios.create({
  baseURL: 'http://discord.com/api'
})

export const mainApi = axios.create({
  baseURL: 'http://localhost:3001'
})

export const moviesApi = axios.create({
  baseURL: 'https://moviesdatabase.p.rapidapi.com',
  headers: {
    'X-RapidAPI-Key': 'e14c73777emsh69dc85b31ea6e16p127ef5jsn8033bd2d8499',
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
  }
})