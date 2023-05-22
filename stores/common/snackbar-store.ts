export const useSnackbarStore = defineStore('snackbar', () => {
  const message = ref('')
  const isError = ref(false)
  const isDisplay = ref(false)

  function setSnackbarContent(
    snackbarMessage: string,
    snackbarError: boolean,
    snackbarDisplay: boolean
  ) {
    message.value = snackbarMessage
    isError.value = snackbarError
    isDisplay.value = snackbarDisplay
  }

  function resetSnackbar() {
    message.value = ''
    isError.value = false
  }

  return {
    message,
    isError,
    isDisplay,
    setSnackbarContent,
    resetSnackbar,
  }
})
