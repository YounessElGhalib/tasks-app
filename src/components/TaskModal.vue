<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div class="flex items-center justify-center min-h-screen">
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
      ></div>
      <div
        class="inline-block align-bottom w-[600px] bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all"
      >
        <div class="bg-white px-10 py-6 w-3/4">
          <h3 class="text-xl py-4 text-gray-600">{{ action }} Task</h3>
          <div class="pb-4">
            <label>Title</label>
            <input class="input" placeholder="Title" v-model="task.title" />
          </div>
          <div class="pb-4">
            <label>Schedule</label>
            <input
              class="input"
              placeholder="Schedule"
              v-model="task.schedule"
            />
          </div>
          <div class="pb-4">
            <label>Status</label>
            <select class="input" v-model="task.status">
              <option value="Not started" selected>Not started</option>
              <option value="In progress">In progress</option>
              <option value="Finished">Finished</option>
            </select>
          </div>
        </div>
        <div
          class="flex items-center justify-end bg-gray-50 px-4 py-4 space-x-3"
        >
          <button class="cancel-btn" @click="emit('closeModal')">Cancel</button>
          <button
            v-if="action === 'Add'"
            class="primary-btn flex items-center space-x-1"
            @click="add"
          >
            <p>Add Task</p>
          </button>
          <button
            v-if="action === 'Update'"
            class="primary-btn flex items-center space-x-1"
            @click="update"
          >
            <p>Update Task</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps({
  action: {
    type: String,
    default: "Add",
  },
  task_prop: {
    type: Object,
  },
});

const store = useStore();
const emit = defineEmits(["closeModal"]);
const task = computed(() => props.task_prop);

function add() {
  if (!Object.values(task.value).every((val) => val)) {
    alert("all fields are required!");
    return;
  }
  store.dispatch("tasks/addNewTask", task.value).then(() => emit("closeModal"));
}

function update() {
  if (!Object.values(task.value).every((val) => val)) {
    alert("all fields are required!");
    return;
  }
  store
    .dispatch("tasks/updateTask", task.value)
    .then(() => emit("closeModal"));
}
</script>

<style>
</style>