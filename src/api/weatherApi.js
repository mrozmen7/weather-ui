import axios from 'axios'

const weatherApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getWeatherByCity = (city) => weatherApi.get(`/weather/${city}`)