export const useAuthorizationStore = defineStore('authorization', () => {
  const accessToken = ref('')
  const refreshToken = ref('')

  function setToken(access: string, refresh: string) {
    accessToken.value = access
    refreshToken.value = refresh
  }

  function resetToken() {
    accessToken.value = ''
    refreshToken.value = ''
  }

  return {
    accessToken,
    refreshToken,
    setToken,
    resetToken,
  }
})
