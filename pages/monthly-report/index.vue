<template>
  <Layout
    title="monthly-report-page"
    :src-iframe="runtimeConfig.public.monthlyReportUrl"
  />
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style lang="scss" scoped></style>
