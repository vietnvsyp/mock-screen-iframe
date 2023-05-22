<template>
  <div class="py-4 px-6 gray6--background">
    <div
      v-if="$props.title || ($props.btnTitle && $props.onClick)"
      class="d-flex justify-space-between"
    >
      <div class="card-title d-flex align-center">
        {{ $props.title }}
      </div>

      <ButtonLink
        v-if="$props.btnTitle && $props.onClick"
        @click="$props.onClick"
        class="card-title"
        >{{ $props.btnTitle }}
      </ButtonLink>
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  onClick: {
    type: Function,
    required: true,
  },
  btnTitle: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.gray6--background {
  background-color: $gray6--background;
}

.card-title {
  letter-spacing: -0.078px;
  font-weight: 700;
}
</style>
