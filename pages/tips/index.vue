<template>
  <Layout title="tips-page" :src-iframe="runtimeConfig.public.tipsUrl" />
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style lang="scss" scoped></style>
