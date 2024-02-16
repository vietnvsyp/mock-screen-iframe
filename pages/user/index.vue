<template>
  <Layout title="user-page" :src-iframe="runtimeConfig.public.userPageUrl" />
</template>

<script nonce="nonce-script" setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style nonce="nonce-style" lang="scss" scoped></style>
