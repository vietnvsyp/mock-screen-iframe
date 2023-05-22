import axios from 'axios'
import { useAuthorizationStore } from '~/stores/authorization/authorization-store'
import { useSnackbarStore } from '~/stores/common/snackbar-store'

// get the config variables within the application
// config variables are defined in nuxt.config
const runtimeConfig = useRuntimeConfig()

// using axios as HTTP client
export const axiosClient = axios.create({
  baseURL: runtimeConfig.public.apiUrl,
})

axiosClient.interceptors.request.use(
  function (config) {
    // Add token to request header
    const authorizationStore = useAuthorizationStore()
    const accessToken = authorizationStore.accessToken
    config.headers['Authorization'] = `Bearer ${accessToken}`
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const snackbarStore = useSnackbarStore()
    snackbarStore.setSnackbarContent('error', true, true)
    return Promise.reject(error)
  }
)
