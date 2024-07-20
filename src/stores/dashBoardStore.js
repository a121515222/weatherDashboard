import { defineStore } from "pinia";
import { ref } from "vue";
export const useDashBoardStore = defineStore("dashBoardStore", () => {
  const autoCompleteList = ref([]);
  const currentCityWeather = ref(null);
  const forecasts = ref([]);
  const isShowAutoComplete = ref(false);
  return {
    forecasts,
    autoCompleteList,
    isShowAutoComplete,
    currentCityWeather,
    forecasts
  };
});
