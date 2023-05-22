<template>
  <div v-for="(item, _) in props.items">
    <div v-if="props.selectedAnswerId !== undefined">
      <div
        :class="(item === selectedValue ? 'selected ' : '') + 'survey-answered'"
        @click="selectAnswer(item)"
      >
        <p class="title-left pl-2">{{ item[props.itemLabel] }}</p>
        <p class="title-right pr-2">{{ `${getAnswerPercentage(item)}%` }}</p>
        <div
          class="overlay"
          :style="{ width: getAnswerPercentage(item) + '%' }"
        ></div>
      </div>
    </div>
    <div v-else>
      <label class="survey-answer" @click="selectAnswer(item)">{{
        item[props.itemLabel]
      }}</label>
    </div>
  </div>
  <div></div>
</template>

<script setup lang="ts">
const emit = defineEmits(['change'])

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  surveyId: {
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
  totalAnswer: {
    type: Number,
    required: true,
  },
  selectedAnswerId: {
    type: String,
  },
})

const selectedValue = ref<any>()

onMounted(() => {
  if (props.selectedAnswerId !== undefined) {
    const selected = props.items.find(
      (element) => element.answerId === props.selectedAnswerId
    )
    if (selected !== undefined) {
      selectedValue.value = selected
    }
  }
})

watch(
  () => props.selectedAnswerId,
  (newValue) => {
    if (newValue !== undefined) {
      const selected = props.items.find(
        (element) => element.answerId === newValue
      )
      if (selected !== undefined) {
        selectedValue.value = selected
      }
    }
  }
)

function selectAnswer(value: any) {
  if (value !== selectedValue.value) {
    emit('change', { surveyId: props.surveyId, ...value })
  }
}

function getAnswerPercentage(value: any): number {
  if (
    props.totalAnswer === undefined ||
    value.totalChoice === undefined ||
    props.totalAnswer <= 0
  ) {
    return 0
  }
  return Math.round((value.totalChoice / props.totalAnswer) * 100)
}
</script>

<style scoped lang="scss">
.radio-group-survey {
  :deep(.v-selection-control-group) {
    gap: 4px;
  }
}

.survey-answer {
  border: 2px solid $survey-blue;
  border-radius: 4px;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-family: 'YuGothic';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  height: 29px;
  letter-spacing: -0.408px;
  color: $survey-blue;
  margin-bottom: 4px;
}

.survey-answered {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  height: 29px;
  background: $seashell-white;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 4px;
}
.title-left,
.title-right {
  position: absolute;
  z-index: 10;
  font-family: 'YuGothic';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.408px;
  color: $survey-text-gray;
}
.title-left {
  left: 0;
}
.title-right {
  right: 0;
}
.overlay {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  // width: v-bind(percent);
  // width: 50%;
  background: $light-silver;
}
.selected {
  .title-left,
  .title-right {
    color: $survey-blue;
  }

  .overlay {
    background: $light-gray;
  }
}
</style>
