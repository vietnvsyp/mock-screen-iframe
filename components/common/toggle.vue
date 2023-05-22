<template>
  <v-switch
    v-if="$attrs.readonly"
    v-model="value"
    v-bind="$attrs"
    readonly
    disabled
    :class="'custom-toggle-readonly' + ($attrs.class ? ' ' + $attrs.class : '')"
  ></v-switch>

  <v-switch v-else v-model="value" v-bind="$attrs"></v-switch>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const { value } = useField(props.name)

onMounted(() => {
  if (value.value === undefined) {
    value.value = false
  }
})
</script>

<style lang="scss">
.custom-toggle-readonly {
  label,
  input,
  textarea {
    color: rgba(0, 0, 0, 0.6) !important;
  }

  .v-input__control {
    .v-input__slot {
      .v-input--selection-controls__input {
        .v-input--switch__track {
          color: rgba(0, 0, 0, 0.38) !important;
        }
      }
    }
  }

  .v-input--selection-controls__input:hover
    .v-input--selection-controls__ripple:before {
    background: none;
    border: none;
  }

  .v-input--selection-controls__ripple,
  .v-input--selection-controls__input,
  input,
  label {
    cursor: default !important;
  }
}
</style>
