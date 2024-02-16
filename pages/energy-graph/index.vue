<template>
  <script nonce="nonce-4">

    <Layout
      title="energy-graph-page"
      :src-iframe="runtimeConfig.public.energyGraphUrl"
    />
  </script>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style lang="scss" scoped></style>
