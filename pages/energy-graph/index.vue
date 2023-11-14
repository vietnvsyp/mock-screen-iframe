<template>
  <Layout
    title="energy-graph-page"
    :src-iframe="runtimeConfig.public.energyGraphUrl"
  />
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style lang="scss" scoped></style>
