<script setup>
const props = defineProps({
  autoCompleteList: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(["autoCompleteListEmit"]);
const emitList = (list) => {
  emit("autoCompleteListEmit", list);
};
</script>

<template>
  <ul
    v-show="props.autoCompleteList.length > 0"
    class="absolute bg-white Relative w-full border border-gray-300 rounded-md shadow-md z-0"
  >
    <li
      v-for="list in props.autoCompleteList"
      class="hover:bg-gray-100 text-color-800 p-2 cursor-pointer"
      @click="emitList(list)"
    >
      {{ list }}
    </li>
  </ul>
</template>
