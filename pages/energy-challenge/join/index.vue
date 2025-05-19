<template>
  <Layout title="join-dr-page" :src-iframe="runtimeConfig.public.joinDrUrl" />
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style lang="scss" scoped></style>
