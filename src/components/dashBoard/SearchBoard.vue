<script setup>
import AutoCompleteVue from "./AutoComplete.vue";
import { ref, watch } from "vue";
import { useDashBoardStore } from "@/stores/dashBoardStore";
import { storeToRefs } from "pinia";
import { useThrottleFn } from "@vueuse/core";
const { autoCompleteList, isShowAutoComplete } = storeToRefs(
  useDashBoardStore()
);
const searchCity = ref("");
const searchParameter = ref({
  latitude: 0,
  longitude: 0,
  timezone: "",
  unit: ""
});
const handleCompleteListEmit = (list) => {
  const { country, latitude, longitude, timezone, name } = list;
  searchCity.value = name;
  searchParameter.value = {
    country,
    latitude,
    longitude,
    timezone
  };
  isShowAutoComplete.value = false;
};
const fetchLocation = useThrottleFn(async (city) => {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );
  const data = await res.json();
  autoCompleteList.value = data.results.map(
    ({ country, latitude, longitude, timezone, name }) => {
      return {
        country,
        latitude,
        longitude,
        timezone,
        name
      };
    }
  );
}, 1500);
const fetchWeather = useThrottleFn(async () => {
  let { latitude, longitude, timezone, unit } = searchParameter.value;
  if (latitude || longitude) {
    console.log("autoCompleteList", autoCompleteList.value);
    searchParameter.value = autoCompleteList.value[0];
    ({ latitude, longitude, timezone } = searchParameter.value);
  }
  console.log("searchParameter", searchParameter.value);
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=&daily=weather_code&timezone=${timezone}${
      unit ? unit : ""
    }`
  );
  const data = await res.json();
  console.log("data", data);
  weather.value = data;
}, 1500);

const handleFetchWeatherUnit = (unit) => {
  searchParameter.value.unit = unit;
};
watch(searchCity, async (newCity, oldCity) => {
  if (newCity.length === 0) {
    autoCompleteList.value = [];
    isShowAutoComplete.value = true;
  }
  if (newCity.length >= 2 && isShowAutoComplete.value) {
    await fetchLocation(newCity);
  }
});
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-md flex-1 m-2 h-full">
    <div class="flex items-center mb-4 gap-4">
      <div class="flex-grow relative">
        <input
          type="text"
          placeholder="Search city"
          class="border p-2 w-full mr-2 rounded"
          v-model="searchCity"
          @focus="isShowAutoComplete = true"
        />
        <AutoCompleteVue
          :autoCompleteListProp="autoCompleteList"
          :isShowAutoCompleteProp="isShowAutoComplete"
          @autoCompleteListEmit="handleCompleteListEmit"
        />
      </div>
      <button class="bg-blue-500 text-white p-2 rounded" @click="fetchWeather">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m2.35-4.65a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
    <div class="flex justify-between">
      <button
        class="border p-2 w-1/2 mr-1 rounded bg-orange-400"
        @click="
          handleFetchWeatherUnit('&&temperature_unit=fahrenheit');
          fetchWeather();
        "
      >
        F°
      </button>
      <button
        class="border p-2 w-1/2 ml-1 rounded bg-lime-400"
        @click="
          handleFetchWeatherUnit('&&temperature_unit=fahrenheit');
          fetchWeather();
        "
      >
        C°
      </button>
    </div>
  </div>
</template>
