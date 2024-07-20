<script setup>
const props = defineProps({
  autoCompleteListProp: {
    type: Array,
    default: () => []
  },
  isShowAutoCompleteProp: {
    type: Boolean,
    default: true
  }
});
const emit = defineEmits(["autoCompleteListEmit"]);
const emitList = (list) => {
  emit("autoCompleteListEmit", list);
};
</script>

<template>
  <ul
    v-show="
      props.autoCompleteListProp.length > 0 && props.isShowAutoCompleteProp
    "
    class="absolute bg-white Relative w-full border border-gray-300 rounded-md shadow-md z-0"
  >
    <li
      v-for="list in props.autoCompleteListProp"
      class="hover:bg-gray-100 text-color-800 p-2 cursor-pointer"
      @click="emitList(list)"
    >
      {{ list.name }} {{ list.country }}
    </li>
  </ul>
</template>
