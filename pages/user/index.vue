<template>
  <script nonce="nonce-8">

    <Layout title="user-page" :src-iframe="runtimeConfig.public.userPageUrl" />
  </script>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style lang="scss" scoped></style>
