<template>
  <Field :name="props.name" v-slot="{ field, errorMessage, value }">
    <v-radio-group
      v-if="$attrs.readonly"
      :model-value="value"
      v-bind="{ ...$attrs, ...field }"
      readonly
      disabled
      :class="
        'custom-radio-readonly' + ($attrs.class ? ' ' + $attrs.class : '')
      "
    >
      <v-radio
        v-for="(item, index) in props.items"
        :key="index"
        :label="item[props.itemLabel]"
        :value="item"
      ></v-radio>
    </v-radio-group>

    <div v-else>
      <v-radio-group :model-value="value" v-bind="{ ...$attrs, ...field }">
        <v-radio
          v-for="(item, index) in props.items"
          :key="index"
          :label="item[props.itemLabel]"
          :value="item"
        ></v-radio>
      </v-radio-group>
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
.custom-radio-readonly {
  .v-radio {
    color: rgba(0, 0, 0, 0.54) !important;

    .mdi-radiobox-marked {
      color: #1976d2 !important;
    }
  }

  label {
    color: rgba(0, 0, 0, 0.6) !important;
  }
}
</style>
