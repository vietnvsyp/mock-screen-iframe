<template>
  <div>
    <el-date-picker
      v-bind="$attrs"
      v-model="selectedDate"
      type="date"
      size="default"
      format="YYYY年MM月DD日"
    />
  </div>
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
const selectedDate = ref<Date>()

onMounted(() => {
  if (value.value !== undefined) {
    selectedDate.value = value.value as Date
  }
})

watch(selectedDate, (_) => {
  value.value = selectedDate.value
})
</script>
