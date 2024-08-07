import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useSearchBoard } from "./useSearchBoard";
vi.mock("@vueuse/core", () => ({
  useThrottleFn: vi.fn((fn) => fn)
}));

vi.mock("@/parameter/weatherCode", () => ({
  iconMapDay: {
    0: "01d",
    3: "04d",
    51: "09d",
    63: "10d",
    95: "11d",
    96: "11d"
  },
  iconMapNight: {
    0: "01n",
    3: "04n",
    51: "09n",
    63: "10n",
    95: "11n",
    96: "11n"
  },
  wmoCodeDescription: {
    0: "Clear sky",
    3: "Overcast",
    51: "Drizzle: Light intensity",
    63: "Rain: Moderate intensity",
    95: "Thunderstorm: Slight or moderate",
    96: "Thunderstorm with slight hail"
  }
}));

vi.mock("@/utils/validator", () => ({
  isValidEnglishLettersOnly: vi.fn((value) => /^[a-zA-Z ]*$/.test(value))
}));
global.fetch = vi.fn();

describe("useSearchBoard", () => {
  let inputErrorMessageRef, alertRef;

  beforeEach(() => {
    setActivePinia(createPinia());
    inputErrorMessageRef = {
      value: { classList: { add: vi.fn(), remove: vi.fn() } }
    };
    alertRef = { value: { alertToggle: vi.fn() } };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("initializes with default values", () => {
    const {
      searchCity,
      searchParameter,
      isShowAutoComplete,
      autoCompleteList
    } = useSearchBoard();

    expect(searchCity.value).toBe("");
    expect(searchParameter.value).toEqual({
      latitude: 0,
      longitude: 0,
      timezone: "",
      unit: ""
    });
    expect(isShowAutoComplete.value).toBe(false);
    expect(autoCompleteList.value).toEqual([]);
  });

  it("validates input correctly", () => {
    const { validateInput, inputErrorMessage } = useSearchBoard();

    expect(validateInput("ValidCity", "Error")).toBe(true);
    expect(inputErrorMessage.value).toBe("-");

    expect(validateInput("Invalid123", "Error")).toBe(false);
    expect(inputErrorMessage.value).toBe("Error");
  });

  it("fetches location data", async () => {
    const { fetchLocation, autoCompleteList, searchCity } = useSearchBoard();
    searchCity.value = "ValidCity";

    global.fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue({
        results: [
          {
            country: "Country",
            latitude: 10,
            longitude: 20,
            timezone: "UTC",
            name: "City"
          }
        ]
      })
    });

    await fetchLocation("ValidCity");

    expect(autoCompleteList.value).toEqual([
      {
        country: "Country",
        latitude: 10,
        longitude: 20,
        timezone: "UTC",
        name: "City"
      }
    ]);
  });

  it("handles fetch location error", async () => {
    const { fetchLocation, autoCompleteList, searchCity, alertMessage } =
      useSearchBoard();
    searchCity.value = "InvalidCity";
    global.fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue({ results: null })
    });

    const alertSpy = vi.spyOn(useSearchBoard(), "toggleAlert");
    await fetchLocation("InvalidCity");
    expect(autoCompleteList.value).toEqual([]);
    vi.waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith("InvalidCity City not found");
    });
    expect(alertMessage.value).toEqual("InvalidCity City not found");
  });

  it("fetches weather data", async () => {
    const {
      fetchWeather,
      searchParameter,
      currentCityWeather,
      forecasts,
      autoCompleteList
    } = useSearchBoard();
    searchParameter.value = {
      country: "Taiwan",
      latitude: 25.04776,
      longitude: 121.53185,
      timezone: "Asia/Taipei"
    };
    autoCompleteList.value = [
      {
        country: "Taiwan",
        latitude: 25.04776,
        longitude: 121.53185,
        timezone: "Asia/Taipei"
      }
    ];
    currentCityWeather.value.cityName = "Taipei";
    global.fetch.mockResolvedValueOnce({
      json: vi.fn().mockResolvedValue({
        current: {
          cloud_cover: 7,
          interval: 900,
          is_day: 1,
          precipitation: 0,
          relative_humidity_2m: 78,
          temperature_2m: 30.6,
          time: "2024-07-22T08:30",
          weather_code: 0,
          wind_direction_10m: 106,
          wind_speed_10m: 6.7
        },
        current_units: {
          cloud_cover: "%",
          interval: "seconds",
          is_day: "",
          precipitation: "mm",
          relative_humidity_2m: "%",
          temperature_2m: "°C",
          time: "iso8601",
          weather_code: "wmo code",
          wind_direction_10m: "°",
          wind_speed_10m: "km/h"
        },
        daily: {
          temperature_2m_max: [34.2, 32, 28.4, 28.6, 33.4, 32.8, 33.9],
          temperature_2m_min: [25.7, 27.6, 26.7, 26.3, 26.2, 27.2, 27.6],
          time: [
            "2024-07-22",
            "2024-07-23",
            "2024-07-24",
            "2024-07-25",
            "2024-07-26",
            "2024-07-27",
            "2024-07-28"
          ],
          weather_code: [51, 51, 63, 95, 3, 96, 95]
        }
      })
    });

    await fetchWeather();

    expect(currentCityWeather.value).toEqual({
      cityName: "Taipei",
      date: "2024-07-22",
      humidity: "78 %",
      temperature: "30.6 °C",
      time: "08:30",
      weatherCode: "01d",
      weatherDescription: "Clear sky",
      windSpeed: "6.7 km/h"
    });
    expect(forecasts.value).toEqual([
      {
        date: "2024-07-22",
        weatherCode: "09d",
        weatherDescription: "Drizzle: Light intensity",
        temperature: "34.2 °C - 25.7 °C"
      },
      {
        date: "2024-07-23",
        weatherCode: "09d",
        weatherDescription: "Drizzle: Light intensity",
        temperature: "32 °C - 27.6 °C"
      },
      {
        date: "2024-07-24",
        weatherCode: "10d",
        weatherDescription: "Rain: Moderate intensity",
        temperature: "28.4 °C - 26.7 °C"
      },
      {
        date: "2024-07-25",
        weatherCode: "11d",
        weatherDescription: "Thunderstorm: Slight or moderate",
        temperature: "28.6 °C - 26.3 °C"
      },
      {
        date: "2024-07-26",
        weatherCode: "04d",
        weatherDescription: "Overcast",
        temperature: "33.4 °C - 26.2 °C"
      }
    ]);
  });
});
