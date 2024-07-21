<script setup>
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
import imgSvg from "@/assets/img.svg";
</script>
<template>
  <div class="bg-white p-4 rounded-lg shadow-md flex-1 m-2 h-full flex">
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
