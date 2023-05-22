<template>
  <div :class="'custom-tab-list' + ($attrs.class ? ' ' + $attrs.class : '')">
    <div
      v-if="items"
      v-for="(item, index) in items"
      @click="selectTab(item.value)"
      :class="
        'custom-tab-item' + (selectedValue === item.value ? ' active' : '')
      "
    >
      {{ item.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tab } from '~/models/interface/common/tab'
const emit = defineEmits(['change'])
const props = defineProps({
  items: {
    type: Array<Tab>,
    required: true,
  },
  defaultValue: {
    type: Number,
    required: true,
  },
})

const selectedValue = ref(props.defaultValue)

function selectTab(value: number) {
  selectedValue.value = value
}

watch(selectedValue, (_) => {
  emit('change', selectedValue.value)
})
</script>

<style lang="scss">
.custom-tab-list {
  display: flex;
  justify-content: space-between;
  gap: 0.3571%;

  .custom-tab-item {
    padding: 4px 12px;
    border-radius: 4px;
    background: #e0e0e0;
    flex: 1 1 auto;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }

  .custom-tab-item.active {
    background: #4f4f4f;
    color: #f2f2f2;
  }
}
</style>
