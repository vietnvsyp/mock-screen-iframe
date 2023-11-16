export const useAuthorizationStore = defineStore(
  'authorization',
  () => {
    const accessToken = ref('')

    function setAccessToken(access: string) {
      accessToken.value = access
    }

    function resetAccessToken() {
      accessToken.value = ''
    }

    return {
      accessToken,
      setAccessToken,
      resetAccessToken,
    }
  },
  {
    persist: true,
  }
)
