<template>
  <div class="bg-gray-50 h-screen">
    <TasksList />
  </div>
</template>

<script>
import TasksList from "./components/TasksList.vue";

export default {
  name: "App",
  components: {
    TasksList,
  },
};
</script>

<style>
</style>
