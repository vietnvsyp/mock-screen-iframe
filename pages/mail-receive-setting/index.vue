<template>
  <script nonce="nonce-5">

    <Layout
      title="mail-receive-setting-page"
      :src-iframe="runtimeConfig.public.mailReceiveSettingUrl"
    />
  </script>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style lang="scss" scoped></style>
