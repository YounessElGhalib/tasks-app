<template>
  <div class="pt-12 px-4 w-full xl:w-4/6 md:w-10/12 m-auto">
    <h1 class="text-3xl text-gray-600 pb-8">Task List</h1>

    <div class="flex items-center justify-between py-6">
      <p class="text-sm text-gray-600">{{ tasks.length }} Tasks</p>
      <button
        class="primary-btn flex items-center space-x-1"
        @click="openAddModal"
      >
        <PlusIcon class="w-4 h-4" />
        <p>New Task</p>
      </button>
    </div>
    <div class="border rounded-lg overflow-hidden border-gray-300 shadow-sm">
      <table class="w-full">
        <thead
          class="bg-blue-50 hidden md:table-header-group text-gray-500 font-medium text-base"
        >
          <tr>
            <td class="w-5/12">Title</td>
            <td class="w-1/12">Schedule</td>
            <td class="w-3/12 text-center">Status</td>
            <td class="w-3/12"></td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="task in tasks"
            :key="task"
            class="flex flex-col md:table-row"
          >
            <td class="w-full md:w-5/12">
              <div class="flex items-center space-x-4 md:space-x-0">
                <p class="md:hidden">Title :</p>
                <p>{{ task.title }}</p>
              </div>
            </td>
            <td class="w-full md:w-1/12">
              <div class="flex items-center space-x-4 md:space-x-0">
                <p class="md:hidden">Schedule :</p>
                <p>{{ task.schedule }}</p>
              </div>
            </td>
            <td class="w-full md:w-3/12">
              <div class="flex items-center md:justify-center space-x-4 md:space-x-0">
                <p class="md:hidden">Status :</p>
                <div :class="`status-${task.status.replace(/\s/g, '')}`">
                  {{ task.status }}
                </div>
              </div>
            </td>
            <td class="w-full md:w-3/12">
              <div class="flex items-center justify-center space-x-2">
                <button
                  class="cancel-btn flex items-center space-x-1"
                  @click="openUpdateModal(task)"
                >
                  <PencilIcon class="w-5 h-5 text-gray-600 cursor-pointer" />
                  <p>Update</p>
                </button>
                <button
                  class="delete-btn flex items-center space-x-1"
                  @click="deleteTask(task)"
                >
                  <TrashIcon class="w-5 h-5 text-red-600 cursor-pointer" />
                  <p>Delete</p>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <TaskModal
    v-show="show_task_modal"
    :action="action"
    :task_prop="remeber_task"
    @closeModal="closeModal"
  />

  <ConfirmationModal
    v-show="show_confirmation_modal"
    :task_prop="remeber_task"
    @closeModal="closeConfirmationModal"
  />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import TaskModal from "./TaskModal.vue";
import ConfirmationModal from "./ConfirmationModal.vue";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";

const store = useStore();
const show_task_modal = ref(false);
const show_confirmation_modal = ref(false);
const action = ref("Add");
const remeber_task = ref({});

onMounted(() => {
  store.dispatch("tasks/getTasksList");
});

function closeModal() {
  show_task_modal.value = false;
  action.value = "Add";
  remeber_task.value = {
    title: "",
    schedule: "",
    status: "",
  };
}

function closeConfirmationModal() {
  show_confirmation_modal.value = false;
  remeber_task.value = {
    title: "",
    schedule: "",
    status: "",
  };
}

function openUpdateModal(task) {
  show_task_modal.value = true;
  action.value = "Update";
  remeber_task.value = task;
}

function openAddModal() {
  show_task_modal.value = true;
  action.value = "Add";
  remeber_task.value = {
    title: "",
    schedule: "",
    status: "",
  };
}

function deleteTask(task) {
  remeber_task.value = task;
  show_confirmation_modal.value = true;
}

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
