<template>
  <script nonce="nonce-6">

    <Layout
      title="monthly-report-page"
      :src-iframe="runtimeConfig.public.monthlyReportUrl"
    />
  </script>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig()
</script>

<style lang="scss" scoped></style>
