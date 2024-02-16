<template>
  <script nonce="nonce-2">
    <Field
      :name="props.name"
      v-slot="{ field, errorMessage, value }"
      :validateOnBlur="props.validateOnBlur"
      :validateOnChange="props.validateOnChange"
      :validateOnInput="props.validateOnInput"
      :validateOnModelUpdate="props.validateOnModelUpdate"
      :validateOnMount="props.validateOnMount"
    >
      <v-text-field
        v-if="$attrs.readonly"
        :modelValue="value"
        v-bind="{ ...$attrs, ...field }"
        disabled
        readonly
        :class="
          'custom-text-field-readonly' + ($attrs.class ? ' ' + $attrs.class : '')
        "
        variant="underlined"
      >
      </v-text-field>

      <div v-else>
        <v-text-field
          :modelValue="value"
          v-bind="{ ...$attrs, ...field }"
          variant="underlined"
        ></v-text-field>
        <div>
          {{ errorMessage }}
        </div>
      </div>
    </Field>
  </script>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  validateOnBlur: {
    type: Boolean,
    default: false,
  },
  validateOnChange: {
    type: Boolean,
    default: false,
  },
  validateOnInput: {
    type: Boolean,
    default: false,
  },
  validateOnModelUpdate: {
    type: Boolean,
    default: false,
  },
  validateOnMount: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss">
.custom-text-field-readonly {
  label,
  input,
  textarea {
    color: rgba(0, 0, 0, 0.87) !important;
  }

  .v-input__slot {
    &::before,
    &::after {
      border-image: none !important;
    }
  }
}
</style>
