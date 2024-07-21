<script setup>
import MainWeatherDisplayVue from "@/components/dashBoard/mainWeatherDisplay/MainWeatherDisplay.vue";
import ForecastWeatherDisplayVue from "@/components/dashBoard/forecastWeatherDisplay/ForecastWeatherDisplay.vue";
import SearchBoardVue from "@/components/dashBoard/searchBoard/SearchBoard.vue";
import { useDashBoardStore } from "@/stores/dashBoardStore";
import { storeToRefs } from "pinia";
const { forecasts, currentCityWeather } = storeToRefs(useDashBoardStore());
</script>

<template>
  <div class="bg-gray-100 p-6 min-h-screen flex items-center justify-center">
    <div class="container mx-auto">
      <!-- Main Weather Info -->
      <div class="grid grid-cols-12 gap-4 mb-8">
        <div class="col-span-12 lg:col-span-8">
          <MainWeatherDisplayVue :currentCityWeatherProp="currentCityWeather" />
        </div>
        <div class="col-span-12 lg:col-span-4">
          <SearchBoardVue />
        </div>
      </div>

      <!-- Weather Forecast -->
      <div class="flex flex-wrap gap-2 lg:gap-4">
        <div
          v-for="(forecast, index) in forecasts"
          :key="`${forecast?.date + index}`"
          class="w-full m-2 lg:w-auto lg:grow"
        >
          <ForecastWeatherDisplayVue :forecastProp="forecast" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
