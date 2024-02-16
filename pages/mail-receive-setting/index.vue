<template>
  <Layout
    title="mail-receive-setting-page"
    :src-iframe="runtimeConfig.public.mailReceiveSettingUrl"
  />
</template>

<script nonce="nonce-script" setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style nonce="nonce-style" lang="scss" scoped></style>
