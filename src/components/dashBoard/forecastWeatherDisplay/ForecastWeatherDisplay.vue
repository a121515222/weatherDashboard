<script setup>
import { computed } from "vue";
import { weatherCodeColorsClass } from "@/parameter/weatherCodeColorClass";
import imgSvg from "@/assets/img.svg";
const props = defineProps({
  forecastProp: {
    type: Object,
    default: {}
  }
});
const backgroundClass = computed(() => {
  const weatherCode = props.forecastProp?.weatherCode;
  return weatherCodeColorsClass[weatherCode]
    ? `${weatherCodeColorsClass[weatherCode]} text-white`
    : "bg-white text-black"; // default color
});
</script>
<template>
  <div
    :class="backgroundClass"
    class="p-4 rounded-lg shadow-md flex lg:flex-col justify-between lg:justify-center items-center h-full"
  >
    <p>{{ props.forecastProp.date ? props.forecastProp.date : "Date" }}</p>
    <div class="flex flex-col justify-center items-center">
      <img
        v-if="props.forecastProp?.weatherCode"
        :src="`https://openweathermap.org/img/wn/${props.forecastProp?.weatherCode}@2x.png`"
        :alt="`${props.forecastProp.weatherDescription}icon`"
        class="max-w-24 max-h-24"
      />
      <img v-else :src="imgSvg" alt="icon" class="max-w-12 max-h-12" />
      <p class="text-center text-wrap max-w-36">
        {{ props.forecastProp.weatherDescription }}
      </p>
    </div>

    <p class="text-lg mt-2">
      {{
        props.forecastProp.temperature
          ? props.forecastProp.temperature
          : "Temperature"
      }}
    </p>
  </div>
</template>
