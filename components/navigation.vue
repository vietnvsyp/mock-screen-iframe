<script lang="ts" setup></script>

<template>
  <v-app-bar
    color="white"
    app
    clipped-left
    flat
    fixed
    style="border-bottom: 1px solid #d2d2d2 !important"
  >
    <v-app-bar-title class="flex-0-0 mx-6">Dashboard</v-app-bar-title>

    <v-list flat class="py-0">
      <v-list-item-group color="primary">
        <v-layout>
          <v-list-item title="item"></v-list-item>
          <v-list-item title="item"></v-list-item>
          <v-list-item title="item"></v-list-item>
        </v-layout>
      </v-list-item-group>
    </v-list>
  </v-app-bar>
</template>
