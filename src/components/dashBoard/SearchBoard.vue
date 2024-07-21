<script setup>
import AutoCompleteVue from "./AutoComplete.vue";
import Alert from "@/components/model/Alert.vue";
import { ref, watch } from "vue";
import { useDashBoardStore } from "@/stores/dashBoardStore";
import { storeToRefs } from "pinia";
import { useThrottleFn } from "@vueuse/core";
import {
  iconMapDay,
  iconMapNight,
  wmoCodeDescription
} from "@/parameter/weatherCode";
import {
  isValidEnglishLettersOnly,
  englishLettersOnlyPattern
} from "@/utils/validator";
const { autoCompleteList, isShowAutoComplete, currentCityWeather, forecasts } =
  storeToRefs(useDashBoardStore());
const searchCity = ref("");
const searchParameter = ref({
  latitude: 0,
  longitude: 0,
  timezone: "",
  unit: ""
});
const handleCompleteListEmit = async (list) => {
  const { country, latitude, longitude, timezone, name } = list;
  searchCity.value = name;
  currentCityWeather.value.cityName = name;
  searchParameter.value = {
    country,
    latitude,
    longitude,
    timezone
  };
  isShowAutoComplete.value = false;
  await fetchWeather();
};
const fetchLocation = useThrottleFn(async (city) => {
  if (validateInput(city, "Please enter English letters only")) {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
    );
    const data = await res.json();
    if (!data?.results) {
      toggleAlert(`${searchCity.value} City not found`);
      searchCity.value = "";
      return;
    }
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
  }
}, 1500);
const fetchWeather = useThrottleFn(async () => {
  // if (searchCity.value.length <= 1) {
  //   toggleAlert("Please enter at least two letters");
  //   return;
  // }
  let { latitude, longitude, timezone, unit } = searchParameter.value;
  if (latitude || longitude) {
    searchParameter.value = autoCompleteList.value[0];
    ({ latitude, longitude, timezone, unit } = searchParameter.value);
  }
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,cloud_cover,wind_speed_10m,wind_direction_10m&hourly=&daily=weather_code,&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${timezone}${
      unit ? unit : ""
    }`
  );
  const data = await res.json();
  if (data.error) {
    toggleAlert("City not found");
    return;
  }
  const { current, current_units, daily } = data;
  const cityName = currentCityWeather.value.cityName;
  currentCityWeather.value = {
    temperature: `${current.temperature_2m} ${current_units.temperature_2m}`,
    windSpeed: `${current.wind_speed_10m} ${current_units.wind_speed_10m}`,
    humidity: `${current.relative_humidity_2m} ${current_units.relative_humidity_2m}`,
    date: current.time.split("T")[0],
    time: current.time.split("T")[1],
    weatherCode:
      current.is_day === 1
        ? iconMapDay[current.weather_code]
        : iconMapNight[current.weather_code],
    weatherDescription: wmoCodeDescription[current.weather_code],
    cityName
  };
  forecasts.value = daily.time.slice(0, 5).map((date, index) => {
    return {
      date,
      weatherCode: iconMapDay[daily.weather_code[index]],
      weatherDescription: wmoCodeDescription[daily.weather_code[index]],
      temperature: `${daily.temperature_2m_max[index]} ${current_units.temperature_2m} - ${daily.temperature_2m_min[index]} ${current_units.temperature_2m}`
    };
  });
}, 800);

const handleFetchWeatherUnit = (unit) => {
  searchParameter.value.unit = unit;
};

const alertRef = ref(null);
const alertMessage = ref("");
const toggleAlert = (message) => {
  alertMessage.value = message;
  alertRef.value.alertToggle();
};

const searchInputRef = ref(null);
const inputErrorMessageRef = ref(null);
const inputErrorMessage = ref("-");

const validateInput = (data, errorMessage) => {
  if (!isValidEnglishLettersOnly(data)) {
    inputErrorMessage.value = `${errorMessage}`;
    addValidationStyle();
    return false;
  }
  resetValidationStyle();
  return true;
};
const addValidationStyle = () => {
  inputErrorMessageRef.value.classList.remove("opacity-0");
};
const resetValidationStyle = () => {
  inputErrorMessageRef.value.classList.add("opacity-0");
};
watch(searchCity, async (city) => {
  if (!city) {
    resetValidationStyle();
  }
  if (city.length <= 1 && city !== "") {
    validateInput(city, "Please enter English letters only");
    autoCompleteList.value = [];
    isShowAutoComplete.value = true;
  }
  if (city.length >= 2 && isShowAutoComplete.value) {
    await fetchLocation(city);
  }
});
</script>

<template>
  <div class="bg-white p-4 rounded-lg shadow-md flex-1 m-2 h-full">
    <div class="flex items-center mb-4 gap-4">
      <div class="flex-grow relative">
        <input
          ref="searchInputRef"
          type="text"
          placeholder="please enter city name"
          :pattern="englishLettersOnlyPattern"
          class="border block p-2 w-full mr-2 rounded invalid:border-red-500 invalid:bg-red-50 focus:invalid:ring-red-500"
          v-model.trim="searchCity"
          @focus="isShowAutoComplete = true"
        />
        <p
          ref="inputErrorMessageRef"
          class="mt-2 pl-2 text-sm text-red-600 dark:text-red-500 opacity-0"
        >
          {{ inputErrorMessage }}
        </p>
        <AutoCompleteVue
          :autoCompleteListProp="autoCompleteList"
          :isShowAutoCompleteProp="isShowAutoComplete"
          @autoCompleteListEmit="handleCompleteListEmit"
        />
      </div>
      <!-- <button class="bg-blue-500 text-white p-2 rounded" @click="fetchWeather">
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
      </button> -->
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
          handleFetchWeatherUnit();
          fetchWeather();
        "
      >
        C°
      </button>
    </div>
  </div>
  <Alert ref="alertRef" :alertMessage="alertMessage" />
</template>
