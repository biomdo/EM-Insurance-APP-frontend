import Axios from 'axios'
// import env from 'react-dotenv'

// const baseUrl = env.API_URL

export const axios = Axios.create({
  baseURL: 'http://localhost:5000',
  headers: { Auth: 'eminsurance AUTH', 'Content-type': 'application/json' },
  timeout: 5000,
})
