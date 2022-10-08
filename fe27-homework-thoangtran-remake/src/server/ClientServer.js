import axios from 'axios'

export const baseUrl = process.env.REACT_APP_BASE_URL

export const clientServer = {
  get: async (url) => await axios.get(`${baseUrl}${url}`),

  post: async (url, data) => await axios.post(`${baseUrl}${url}`, data),

  put: async (url, data) => await axios.put(`${baseUrl}${url}`, data),

  patch: async (url, data) => await axios.patch(`${baseUrl}${url}`, data),

  delete: async (url) => await axios.delete(`${baseUrl}${url}`),
}
