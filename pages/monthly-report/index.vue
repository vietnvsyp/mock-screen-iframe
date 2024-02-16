<template>
  <Layout
    title="monthly-report-page"
    :src-iframe="runtimeConfig.public.monthlyReportUrl"
  />
</template>

<script nonce="nonce-script" setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style nonce="nonce-style" lang="scss" scoped></style>
