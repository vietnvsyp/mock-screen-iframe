<template>
  <Layout
    title="user-page"
    :src-iframe="runtimeConfig.public.userPageUrl"
  />
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style lang="scss" scoped></style>
