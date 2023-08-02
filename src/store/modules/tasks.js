import axios from "axios";

const state = () => ({
  tasks_list: [],
});

const getters = {};

const actions = {
  getTasksList({ commit }) {
    axios.get("/api/tasks").then((res) => {
      commit("setTasks", res.data.tasks);
    });
  },
};

const mutations = {
  setTasks(state, tasks) {
    state.tasks_list = tasks;
  },
  addNewTask(state, task) {
    state.tasks_list.push(task);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
