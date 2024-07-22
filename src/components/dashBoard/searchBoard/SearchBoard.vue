<script setup>
import AutoCompleteVue from "../autoComplete/AutoComplete.vue";
import Alert from "@/components/model/Alert.vue";
import { useSearchBoard } from "./useSearchBoard";
import { englishLettersOnlyPattern } from "@/utils/validator";
import { watch } from "vue";
const {
  searchCity,
  handleCompleteListEmit,
  fetchLocation,
  fetchWeather,
  handleFetchWeatherUnit,
  resetValidationStyle,
  validateInput,
  alertRef,
  alertMessage,
  searchInputRef,
  inputErrorMessageRef,
  inputErrorMessage,
  isShowAutoComplete,
  autoCompleteList
} = useSearchBoard();
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
