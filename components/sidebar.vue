<script lang="ts" setup></script>

<template>
  <v-navigation-drawer
    app
    permanent
    location="left"
    clipped
  >
    <v-list color="transparent">
      <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard"></v-list-item>
      <v-list-item prepend-icon="mdi-account-box" title="Account"></v-list-item>
      <v-list-item prepend-icon="mdi-gavel" title="Admin"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
