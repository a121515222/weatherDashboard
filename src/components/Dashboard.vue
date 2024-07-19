<script setup>
import { ref } from "vue";
import MainWeatherDisplayVue from "./MainWeatherDisplay.vue";
import ForecastWeatherDisplayVue from "./ForecastWeatherDisplay.vue";
import SearchBoardVue from "./SearchBoard.vue";
import { useDashBoardStore } from "@/stores/dashBoardStore";
import { storeToRefs } from "pinia";
const { forecasts } = storeToRefs(useDashBoardStore());
const weather = ref(null);
</script>

<template>
  <div class="bg-gray-100 p-6 min-h-screen flex items-center justify-center">
    <div class="container mx-auto">
      <!-- Main Weather Info -->
      <div class="grid grid-cols-12 gap-4 mb-8">
        <div class="col-span-12 lg:col-span-8">
          <MainWeatherDisplayVue></MainWeatherDisplayVue>
        </div>
        <div class="col-span-12 lg:col-span-4">
          <SearchBoardVue />
        </div>
      </div>

      <!-- Weather Forecast -->
      <div class="flex flex-wrap gap-4">
        <div
          v-for="forecast in forecasts"
          :key="forecast.date"
          class="w-full m-2 lg:w-auto lg:grow"
        >
          <ForecastWeatherDisplayVue :forecastProp="forecast" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
