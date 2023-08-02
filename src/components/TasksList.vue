<template>
  <div class="pt-12 w-3/5 m-auto">
    <h1 class="text-3xl text-gray-600 pb-8">Task List</h1>

    <div class="flex items-center justify-between py-6">
      <p class="text-sm text-gray-600">{{ tasks.length }} Tasks</p>
      <button
        class="text-sm font-medium text-blue-500 bg-blue-100 rounded-lg border border-blue-300 py-1 px-3 shadow-sm hover:bg-blue-200"
      >
        New Task
      </button>
    </div>
    <div class="border rounded-lg overflow-hidden border-gray-300 shadow-sm">
      <table class="w-full">
        <thead class="bg-blue-50 text-gray-500 font-medium text-base">
          <tr>
            <td class="w-1/3">Title</td>
            <td class="w-1/4">Schedule</td>
            <td class="w-1/4 text-center">Status</td>
            <td class="w-1/6"></td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task">
            <td class="w-1/3">{{ task.title }}</td>
            <td class="w-1/4">{{ task.schedule }}</td>
            <td class="w-1/4">
              <div :class="`status-${task.status.replace(/\s/g, '')}`">
                {{ task.status }}
              </div>
            </td>
            <td class="w-1/6">...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

const store = useStore();


onMounted(() => {
  store.dispatch("tasks/getTasksList");
});

const tasks = computed(() => store.state.tasks.tasks_list);
</script>

<style lang="scss" scoped>
thead {
  tr {
    @apply border-b border-gray-300;
  }
  td {
    @apply pl-4 py-2;
  }
}
tbody {
  tr {
    @apply border-b border-gray-300;
  }
  td {
    @apply pl-4 py-2 bg-white text-gray-600 text-sm;
  }
}

.status-Notstarted {
  @apply w-fit m-auto font-bold bg-blue-100 text-blue-400 rounded-lg py-1 px-2;
}
.status-Inprogress {
  @apply w-fit m-auto font-bold bg-green-100 text-green-400 rounded-lg py-1 px-2;
}
.status-Finished {
  @apply w-fit m-auto font-bold bg-red-100 text-red-400 rounded-lg py-1 px-2;
}
</style>
