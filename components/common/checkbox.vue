<template>
  <span v-if="$attrs.readonly">
    <v-checkbox
      v-for="(item, index) in props.items"
      v-model="selectedItem"
      :key="index"
      :label="item[props.itemLabel]"
      :value="item"
      v-bind="$attrs"
      return-object
      readonly
      disabled
      :class="
        'custom-checkbox-readonly' + ($attrs.class ? ' ' + $attrs.class : '')
      "
    ></v-checkbox>
  </span>
  <span v-else>
    <v-checkbox
      v-for="(item, index) in props.items"
      v-model="selectedItem"
      :key="index"
      :label="item[props.itemLabel]"
      :value="item"
      v-bind="$attrs"
      return-object
    ></v-checkbox>
  </span>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'

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

const { value } = useField(props.name)
const selectedItem = ref<any[]>([])

onMounted(() => {
  if (value.value === undefined) {
    value.value = []
  }
  selectedItem.value = value.value as any[]
})

watch(selectedItem, (_) => {
  value.value = selectedItem.value
})
</script>

<style lang="scss">
.custom-checkbox-readonly {
  .v-input--selection-controls__input {
    color: rgba(0, 0, 0, 0.54) !important;

    .mdi-radiobox-marked {
      color: #1976d2 !important;
    }
  }

  label {
    color: rgba(0, 0, 0, 0.6) !important;
    cursor: default !important;
  }

  .v-input--selection-controls__input {
    input,
    .v-input--selection-controls__ripple {
      cursor: default;
    }

    &:hover {
      .v-input--selection-controls__ripple {
        &::before {
          background: none;
          border: none;
        }
      }
    }
  }
}
</style>
