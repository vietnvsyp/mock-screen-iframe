<template>
  <Layout
    title="cancel-join-dr-page"
    :src-iframe="runtimeConfig.public.cancelJoinDrUrl"
  />
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style lang="scss" scoped></style>
