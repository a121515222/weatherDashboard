<script setup>
import { ref } from "vue";
import MainWeatherDisplayVue from "./MainWeatherDisplay.vue";
import ForecastWeatherDisplayVue from "./ForecastWeatherDisplay.vue";
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
          <div class="bg-white p-4 rounded-lg shadow-md flex-1 m-2 h-full">
            <div class="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search city"
                class="border p-2 flex-grow mr-2 rounded"
                v-model="searchCity"
              />
              <button
                class="bg-blue-500 text-white p-2 rounded"
                @click="search"
              >
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
                @click="setUnit('F')"
              >
                F°
              </button>
              <button
                class="border p-2 w-1/2 ml-1 rounded bg-lime-400"
                @click="setUnit('C')"
              >
                C°
              </button>
            </div>
          </div>
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
