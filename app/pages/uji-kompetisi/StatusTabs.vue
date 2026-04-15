<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "mengajukan",
  },
});

const emit = defineEmits(["update:modelValue"]);

const tabs = [
  { value: "mengajukan", label: "Mengajukan" },
  { value: "diterima", label: "Diterima" },
  { value: "ditolak", label: "Ditolak" },
];

const getTabClass = (tabValue) => {
  const baseClass = "px-4 py-2 rounded-lg font-medium transition";
  if (props.modelValue === tabValue) {
    return `${baseClass} bg-blue-600 text-white`;
  } else {
    return `${baseClass} bg-gray-200 text-gray-700 hover:bg-gray-300`;
  }
};

const selectTab = (value) => {
  emit("update:modelValue", value);
};
</script>

<template>
  <div class="flex gap-2 mb-4">
    <button v-for="tab in tabs" :key="tab.value" @click="selectTab(tab.value)" :class="getTabClass(tab.value)">
      {{ tab.label }}
    </button>
  </div>
</template>
