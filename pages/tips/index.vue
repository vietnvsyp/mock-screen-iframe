<template>
  <Layout title="tips-page" :src-iframe="runtimeConfig.public.tipsUrl" />
</template>

<script nonce="nonce-script" setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style nonce="nonce-style" lang="scss" scoped></style>
