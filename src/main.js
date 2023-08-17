import "./assets/style/tailwind.scss";
import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import { makeServer } from "./server";
console.log("NODE_ENV -> ", process.env.NODE_ENV);
if (
  process.env.NODE_ENV === "development" ||
  process.env.NODE_ENV === "production"
) {
  makeServer();
}

const app = createApp(App);
app.use(store);
app.mount("#app");
