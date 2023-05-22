<template>
  <v-snackbar
    v-bind="$attrs"
    v-model="snackbarStore.isDisplay"
    :color="snackbarStore.isError ? 'red' : 'green'"
  >
    {{ snackbarStore.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from '~/stores/common/snackbar-store'

const snackbarStore = useSnackbarStore()
</script>

<style scoped lang="scss"></style>
