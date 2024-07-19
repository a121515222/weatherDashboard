<script setup>
const props = defineProps({
  forecastProp: {
    type: Object,
    default: {
      date: "2021-01-01",
      weather: "Sunny",
      temperature: "25°C"
    }
  }
});
</script>
<template>
  <div
    class="bg-white p-4 rounded-lg shadow-md flex lg:flex-col justify-center items-center"
  >
    <p>{{ props.forecastProp.date }}</p>
    <img
      src="https://openweathermap.org/img/wn/10d@2x.png"
      alt=""
      class="max-w-24 max-h-24"
    />
    <p>{{ props.forecastProp.temperature }}</p>
  </div>
</template>
