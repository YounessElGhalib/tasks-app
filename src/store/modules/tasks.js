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
  addNewTask({ commit }, payload) {
    axios.post("/api/new-task", payload).then((res) => {
      commit("addNewTask", res.data);
      return res.data;
    });
  },
  updateTask({ commit }, payload) {
    axios.put("/api/update-task/" + payload.id, payload).then((res) => {
      commit("updateTask", res.data);
      return res.data;
    });
  },
  deleteTask({ commit }, payload) {
    axios.delete("/api/delete-task/" + payload.id).then((res) => {
      commit("deleteTask", payload);
      return res.data;
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
  updateTask(state, task) {
    let idx = state.tasks_list.findIndex((el) => el.id === task.id);
    state.tasks_list[idx] = task;
  },
  deleteTask(state, task) {
    const idx = state.tasks_list.indexOf(task)
    state.tasks_list.splice(idx, 1)
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
