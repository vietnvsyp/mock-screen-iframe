<template>
  <Field :name="props.name" v-slot="{ field, errorMessage, value }">
    <v-select
      v-if="$attrs.readonly"
      :items="props.items"
      v-bind="{ ...$attrs, ...field }"
      :modelValue="value"
      :item-title="props.itemLabel"
      persistent-hint
      return-object
      single-line
      disabled
      readonly
      :class="
        'custom-text-field-readonly' + ($attrs.class ? ' ' + $attrs.class : '')
      "
    ></v-select>

    <div v-else>
      <v-select
        :items="props.items"
        v-bind="{ ...$attrs, ...field }"
        :modelValue="value"
        :item-title="props.itemLabel"
        persistent-hint
        return-object
        single-line
      ></v-select>
      <div>
        {{ errorMessage }}
      </div>
    </div>
  </Field>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  items: {
    type: Array<any>,
    required: true,
  },
  itemLabel: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss">
.custom-text-field-readonly {
  label,
  input,
  textarea,
  .v-select__selection {
    color: rgba(0, 0, 0, 0.87) !important;
  }

  .v-input__slot {
    &::before,
    &::after {
      border-image: none !important;
    }
  }
}
.v-select__selections .v-select__selection {
  position: absolute;
}
</style>
