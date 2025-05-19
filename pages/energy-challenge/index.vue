<template>
  <Layout
    title="energy-challenge-page"
    :src-iframe="runtimeConfig.public.energyChallengeUrl"
  />
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style lang="scss" scoped></style>
