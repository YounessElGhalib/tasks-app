<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>
      <div
        class="inline-block align-bottom w-[600px] bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all"
      >
        <div class="bg-white px-4">
          <div class="flex items-center space-x-4">
            <div
              class="flex items-center justify-center bg-red-100 rounded-full p-2"
            >
              <ExclamationTriangleIcon class="w-6 h-6 text-red-700" />
            </div>
            <h3 class="text-xl py-4 text-gray-700">Confirmation</h3>
          </div>
          <p class="pl-14 pb-6">Do you want to remeve this Task ?</p>
        </div>
        <div
          class="flex items-center justify-end bg-gray-100 px-4 py-4 space-x-3"
        >
          <button class="cancel-btn" @click="emit('closeModal')">Cancel</button>
          <button class="primary-btn" @click="remove">Confirmer</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import { useStore } from "vuex";

const props = defineProps({
  task_prop: {
    type: Object,
    required: true,
  },
});

const store = useStore();
const emit = defineEmits(["closeModal"]);

function remove() {
  store
    .dispatch("tasks/deleteTask", props.task_prop)
    .then(() => emit("closeModal"));
}
</script>
  
  <style>
</style>