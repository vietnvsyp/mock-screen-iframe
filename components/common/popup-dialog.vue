<template>
  <v-dialog v-bind="$attrs">
    <v-card class="pa-6">
      <v-card-title class="pa-0 pb-5">
        <div class="text-h5">{{ title }}</div>
      </v-card-title>
      <slot></slot>
      <v-card-actions class="pt-5 pb-0">
        <v-spacer></v-spacer>
        <ButtonSubmit v-if="props.positiveText" @click="onClickPositive">{{
          props.positiveText
        }}</ButtonSubmit>
        <ButtonCancel v-if="props.negativeText" @click="onClickNegative">{{
          props.negativeText
        }}</ButtonCancel>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const emit = defineEmits(['onClickPositive', 'onClickNegative'])
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  positiveText: String,
  negativeText: String,
})

function onClickPositive() {
  emit('onClickPositive')
}

function onClickNegative() {
  emit('onClickNegative')
}
</script>
