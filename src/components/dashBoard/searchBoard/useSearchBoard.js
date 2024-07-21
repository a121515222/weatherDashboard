import { ref, watch } from "vue";
import { useThrottleFn } from "@vueuse/core";
import { useDashBoardStore } from "@/stores/dashBoardStore";
import { storeToRefs } from "pinia";
import {
  iconMapDay,
  iconMapNight,
  wmoCodeDescription
} from "@/parameter/weatherCode";
import { isValidEnglishLettersOnly } from "@/utils/validator";

export function useSearchBoard() {
  const {
    autoCompleteList,
    isShowAutoComplete,
    currentCityWeather,
    forecasts
  } = storeToRefs(useDashBoardStore());

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
        ({ country, latitude, longitude, timezone, name }) => ({
          country,
          latitude,
          longitude,
          timezone,
          name
        })
      );
    }
  }, 1500);

  const fetchWeather = useThrottleFn(async () => {
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
    forecasts.value = daily.time.slice(0, 5).map((date, index) => ({
      date,
      weatherCode: iconMapDay[daily.weather_code[index]],
      weatherDescription: wmoCodeDescription[daily.weather_code[index]],
      temperature: `${daily.temperature_2m_max[index]} ${current_units.temperature_2m} - ${daily.temperature_2m_min[index]} ${current_units.temperature_2m}`
    }));
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
  return {
    searchCity,
    searchParameter,
    handleCompleteListEmit,
    fetchLocation,
    fetchWeather,
    handleFetchWeatherUnit,
    alertRef,
    alertMessage,
    toggleAlert,
    searchInputRef,
    inputErrorMessageRef,
    inputErrorMessage,
    validateInput,
    addValidationStyle,
    resetValidationStyle,
    isShowAutoComplete,
    autoCompleteList
  };
}
