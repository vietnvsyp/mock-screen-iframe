<template>
  <div class="py-4 px-6 information-card-survey">
    <div v-if="props.pointQuantity" class="d-flex justify-space-between mb-3">
      <div class="d-flex align-center label-card-title">
        {{ $props.title }}
      </div>

      <div class="d-flex align-center">
        <div
          :class="
            (selectedAnswerId !== undefined ? 'answered ' : '') +
            'point-title d-flex align-center'
          "
        >
          <p>{{ `+${props.pointQuantity}P` }}</p>
          <v-icon
            v-if="selectedAnswerId !== undefined"
            class="icon-size ml-1 icon-answered"
            >mdi-check</v-icon
          >
        </div>
      </div>
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
  pointQuantity: {
    type: Number,
  },
  selectedAnswerId: {
    type: String,
  },
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald&display=swap');

.information-card-survey {
  background-color: $white;
  box-shadow: 0px 0px 10px $box-shadow;
  border-radius: 8px;
  padding: 16px;
}
.label-card-title {
  font-family: 'YuGothic', sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: -0.408px;
  color: $birch-brown;
}

.point-title {
  font-family: 'Oswald', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.408px;
  background: $survey-blue;
  border-radius: 16px;
  padding: 4px 8px;
  color: $white;
}

.answered {
  color: $survey-text-gray;
  background: $light-silver;
}

.icon-answered {
  color: $survey-text-gray;
  font-size: 14px;
}
</style>
