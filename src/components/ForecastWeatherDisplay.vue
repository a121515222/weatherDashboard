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
  <div class="bg-white p-4 rounded-lg shadow-md text-center">
    <p>{{ props.forecastProp.date }}</p>
    <p>{{ props.forecastProp.weather }}</p>
    <p>{{ props.forecastProp.temperature }}</p>
  </div>
</template>
