<script setup>
import AutoCompleteVue from "./AutoComplete.vue";
import { ref } from "vue";
import { useDashBoardStore } from "@/stores/dashBoardStore";
import { storeToRefs } from "pinia";
const autoCompleteList = ref(["555", "666", "777"]);
const searchCity = ref("");
const handleCompleteListEmit = (list) => {
  searchCity.value = list;
  autoCompleteList.value = [];
};
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
        />
        <AutoCompleteVue
          :autoCompleteList="autoCompleteList"
          @autoCompleteListEmit="handleCompleteListEmit"
        />
      </div>

      <button class="bg-blue-500 text-white p-2 rounded" @click="search">
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
</template>
