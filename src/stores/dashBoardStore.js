import { defineStore } from "pinia";
import { ref } from "vue";
export const useDashBoardStore = defineStore("dashBoardStore", () => {
  const forecasts = ref([
    { date: "2024-01-01", weather: "rain", temperature: "20°" },
    { date: "2024-01-01", weather: "rain", temperature: "20°" },
    { date: "2024-01-01", weather: "rain", temperature: "20°" },
    { date: "2024-01-01", weather: "rain", temperature: "20°" },
    { date: "2024-01-01", weather: "rain", temperature: "20°" }
  ]);
  return {
    forecasts
  };
});
