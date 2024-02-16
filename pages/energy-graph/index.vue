<template>
  <Layout
    title="energy-graph-page"
    :src-iframe="runtimeConfig.public.energyGraphUrl"
  />
</template>

<script nonce="nonce-script" setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style nonce="nonce-style" lang="scss" scoped></style>
