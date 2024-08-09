<script setup>
import { computed } from "vue";
import { weatherCodeColorsClass } from "@/parameter/weatherCodeColorClass";
import imgSvg from "@/assets/img.svg";
const props = defineProps({
  currentCityWeatherProp: {
    type: Object,
    default: {
      cityName: "",
      date: "",
      time: "",
      weatherCode: "",
      weatherDescription: "",
      temperature: "",
      windSpeed: "",
      humidity: ""
    }
  }
});
const backgroundClass = computed(() => {
  const weatherCode = props.currentCityWeatherProp?.weatherCode;
  return weatherCodeColorsClass[weatherCode]
    ? `${weatherCodeColorsClass[weatherCode]} text-white`
    : "bg-white text-black"; // default color
});
</script>
<template>
  <div
    :class="backgroundClass"
    class="p-4 rounded-lg shadow-md flex-1 m-2 h-full flex items-start lg:items-center"
  >
    <div class="h-full grow flex flex-col items-center justify-center">
      <p class="text-base lg:text-2xl">
        {{
          props.currentCityWeatherProp?.cityName
            ? props.currentCityWeatherProp.cityName
            : "City"
        }}
      </p>
      <p class="text-sm lg:text-xl">
        {{
          props.currentCityWeatherProp?.date
            ? props.currentCityWeatherProp.date
            : "Date"
        }}
      </p>
      <p class="text-sm lg:text-xl">
        {{
          props.currentCityWeatherProp?.time
            ? props.currentCityWeatherProp.time
            : "Time"
        }}
      </p>
    </div>
    <div class="h-full grow flex items-center justify-center">
      <div class="h-full">
        <img
          v-if="props.currentCityWeatherProp?.weatherCode"
          :src="`https://openweathermap.org/img/wn/${props.currentCityWeatherProp?.weatherCode}@2x.png`"
          :alt="`${props.currentCityWeatherProp?.weatherDescription}icon`"
          class="max-w-14 max-h-14 lg:max-w-24 lg:max-h-24 m-auto"
          @error="handleImageError"
        />
        <img
          v-else
          :src="imgSvg"
          alt="icon"
          class="max-w-6 max-h-6 lg:max-w-12 lg:max-h-12 mt-4"
        />
        <p class="text-sm lg:text-l text-center text-wrap max-w-28">
          {{
            props.currentCityWeatherProp?.weatherDescription
              ? props.currentCityWeatherProp.weatherDescription
              : "-"
          }}
        </p>
      </div>
    </div>
    <div class="grow m-auto">
      <p class="text-xs lg:text-lg text-center">Temperature</p>
      <p class="text-lg lg:text-3xl text-center">
        {{
          props.currentCityWeatherProp?.temperature
            ? props.currentCityWeatherProp.temperature
            : "-"
        }}
      </p>
    </div>
    <div class="grow m-auto">
      <p class="text-xs lg:text-lg text-center">Wind speed</p>
      <p class="text-lg lg:text-3xl text-center">
        {{
          props.currentCityWeatherProp?.windSpeed
            ? props.currentCityWeatherProp.windSpeed
            : "-"
        }}
      </p>
    </div>
    <div class="grow m-auto">
      <p class="text-xs lg:text-lg text-center">Humidity</p>
      <p class="text-lg lg:text-3xl text-center">
        {{
          props.currentCityWeatherProp?.humidity
            ? props.currentCityWeatherProp.humidity
            : "-"
        }}
      </p>
    </div>
  </div>
</template>
