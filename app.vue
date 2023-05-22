<template>
  <v-app>
    <v-main>
      <v-container>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import 'reflect-metadata'
import { useAuthorizationStore } from './stores/authorization/authorization-store'

const authorizationStore = useAuthorizationStore()

onMounted(() => {
  // Dummy token, will be deleted in the future
  authorizationStore.setToken(
    'eyJraWQiOiJ3WVBNTHBWdHhcLzZNMitpV3dcL1RnQmNPRlVyTXV5XC9aZjBqNmJZS3RkQVMwPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5M2EwZjJhMy01Njc0LTRmMDAtOGQ3ZC1hY2M5NmQ0N2YxNDgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTEuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTFfeWlXSnd1cW9jIiwiY2xpZW50X2lkIjoiMTlodGJsYXQwMGZnc2tkaWlhNzAycm8wNnAiLCJvcmlnaW5fanRpIjoiNTc4ZTZjZGItZmM4NS00ZDkwLThjMzEtNzkwNzI2YTg3ODNjIiwiZXZlbnRfaWQiOiI3M2Q0ZTk4ZS02MGI3LTRhMjQtYTE1OS0wMTI4ZDE4NGFhMjEiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIiwiYXV0aF90aW1lIjoxNjg0NDY0OTA5LCJleHAiOjE2ODQ0Njg1MDksImlhdCI6MTY4NDQ2NDkwOSwianRpIjoiODc2ZTNhMWMtM2YyZC00N2U5LTkwYmUtY2FmODIyZmU3NjA0IiwidXNlcm5hbWUiOiJjYW92YW5taW5oIn0.iUY1r4VQdF_2cCdJRhT2Ngvzepw6VDxJlrYnWVfoZrcNUqojZHOn-proLCTDevk85h8DSAs4zLvcfJSbs-_b4T26q050p7Mdt8Sd-yQ0_wWT_Shgh8FNSDEcH3L94VhgM08k1g7GpuP_2LaCWkImPTsLFVzzMQfQEjG67svEG4QI8FgjLG3O_SFboAkm07DkW3zpcBlgYta8bkBF6lXDGC2YKqIDwiVS38w0bfIw82UUMp-o23wAvPmclkazFps6WzS2hv02160qyePM_qKITtYeLwUO5p2VOcr-ZOhxpMTPay_DuZXHhpj6QJNSmjqowzlX-Q4J0RFakklByhSdLA',
    ''
  )

  window.addEventListener('message', (event) => {
    if (event.data) {
      authorizationStore.setToken(event.data, event.data)
    }
  })
  window.parent.postMessage('token-request', '*')
})
</script>
