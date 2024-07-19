<script setup></script>
<template>
  <div class="bg-white p-4 rounded-lg shadow-md flex-1 m-2 h-full flex">
    <div class="grow m-auto flex items-center justify-center">
      <div class="h-full">
        <p class="text-lg">Taipei</p>
        <p class="text">2024-07-19</p>
        <p class="text">13:05</p>
      </div>
    </div>
    <div class="h-full grow flex items-center justify-center">
      <img
        src="https://openweathermap.org/img/wn/10d@2x.png"
        alt=""
        class="max-w-24 max-h-24"
      />
    </div>
    <div class="grow m-auto">
      <p class="text-lg text-center h-full">Temperature</p>
    </div>
    <div class="grow m-auto">
      <p class="text-lg text-center h-full">Wind speed</p>
    </div>
    <div class="grow m-auto">
      <p class="text-lg text-center h-full">Humidity</p>
    </div>
  </div>
</template>
