<script setup>
import { computed } from "vue";
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
  const weatherCodeColorsClass = {
    "01d": "bg-gradient-to-r from-sky-500 to-indigo-500", // Clear sky day
    "02d": "bg-gradient-to-r from-sky-400 to-indigo-400", // Few clouds day
    "03d": "bg-gradient-to-r from-sky-300 to-indigo-400", // Scattered clouds day
    "04d": "bg-gradient-to-r from-sky-400 to-gray-500", // Broken clouds day
    "50d": "bg-gradient-to-r from-gray-500 to-gray-600", // Mist day
    "09d": "bg-gradient-to-r from-gray-400 to-sky-600", // Shower rain day
    "10d": "bg-gradient-to-r from-gray-400 to-sky-500", // Rain day
    "13d": "bg-gradient-to-r from-gray-500 to-sky-400", // Snow day
    "11d": "bg-gradient-to-r from-gray-500 to-gray-700", // Thunderstorm day
    "01n": "bg-gradient-to-r from-slate-700 to-slate-800", // Clear sky night
    "02n": "bg-gradient-to-r from-slate-600 to-slate-700", // Few clouds night
    "03n": "bg-gradient-to-r from-slate-500 to-slate-600", // Scattered clouds night
    "04n": "bg-gradient-to-r from-slate-600 to-gray-500", // Broken clouds night
    "50n": "bg-gradient-to-r from-gray-600 to-gray-700", // Mist night
    "09n": "bg-gradient-to-r from-gray-400 to-slate-800 ", // Shower rain night
    "10n": "bg-gradient-to-r from-gray-400 to-slate-700", // Rain night
    "13n": "bg-gradient-to-r from-gray-500 to-slate-600", // Snow night
    "11n": "bg-gradient-to-r from-gray-700 to-gray-800" // Thunderstorm night
  };
  const weatherCode = props.currentCityWeatherProp?.weatherCode;
  return weatherCodeColorsClass[weatherCode]
    ? `${weatherCodeColorsClass[weatherCode]} text-white`
    : "bg-white text-black"; // default color
});
</script>
<template>
  <div
    :class="backgroundClass"
    class="p-4 rounded-lg shadow-md flex-1 m-2 h-full flex"
  >
    <div class="grow m-auto flex items-center justify-center">
      <div class="h-full">
        <p class="text-2xl">
          {{
            props.currentCityWeatherProp?.cityName
              ? props.currentCityWeatherProp.cityName
              : "City"
          }}
        </p>
        <p class="text-xl">
          {{
            props.currentCityWeatherProp?.date
              ? props.currentCityWeatherProp.date
              : "Date"
          }}
        </p>
        <p class="text-xl">
          {{
            props.currentCityWeatherProp?.time
              ? props.currentCityWeatherProp.time
              : "Time"
          }}
        </p>
      </div>
    </div>
    <div class="h-full grow flex items-center justify-center">
      <div class="h-full">
        <img
          v-if="props.currentCityWeatherProp?.weatherCode"
          :src="`https://openweathermap.org/img/wn/${props.currentCityWeatherProp?.weatherCode}@2x.png`"
          :alt="`${props.currentCityWeatherProp?.weatherDescription}icon`"
          class="max-w-24 max-h-24"
          @error="handleImageError"
        />
        <img v-else :src="imgSvg" alt="icon" class="max-w-12 max-h-12 mt-4" />
        <p class="text-l text-center text-wrap max-w-28">
          {{
            props.currentCityWeatherProp?.weatherDescription
              ? props.currentCityWeatherProp.weatherDescription
              : "-"
          }}
        </p>
      </div>
    </div>
    <div class="grow m-auto">
      <p class="text-lg text-center">Temperature</p>
      <p class="text-3xl text-center">
        {{
          props.currentCityWeatherProp?.temperature
            ? props.currentCityWeatherProp.temperature
            : "-"
        }}
      </p>
    </div>
    <div class="grow m-auto">
      <p class="text-lg text-center">Wind speed</p>
      <p class="text-3xl text-center">
        {{
          props.currentCityWeatherProp?.windSpeed
            ? props.currentCityWeatherProp.windSpeed
            : "-"
        }}
      </p>
    </div>
    <div class="grow m-auto">
      <p class="text-lg text-center">Humidity</p>
      <p class="text-3xl text-center">
        {{
          props.currentCityWeatherProp?.humidity
            ? props.currentCityWeatherProp.humidity
            : "-"
        }}
      </p>
    </div>
  </div>
</template>
