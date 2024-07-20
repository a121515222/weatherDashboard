import { defineStore } from "pinia";
import { ref } from "vue";
export const useDashBoardStore = defineStore("dashBoardStore", () => {
  const autoCompleteList = ref([]);
  const forecasts = ref([
    { date: "2024-01-01", weather: "rain", temperature: "20°" },
    { date: "2024-01-01", weather: "rain", temperature: "20°" },
    { date: "2024-01-01", weather: "rain", temperature: "20°" },
    { date: "2024-01-01", weather: "rain", temperature: "20°" },
    { date: "2024-01-01", weather: "rain", temperature: "20°" }
  ]);
  const isShowAutoComplete = ref(false);
  return {
    forecasts,
    autoCompleteList,
    isShowAutoComplete
  };
});
