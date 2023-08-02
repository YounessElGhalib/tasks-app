import { Server, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      task: Model,
    },

    seeds(server) {
      server.create("task", { id: 1, name:'taks 1', content: "content of task number 1." });
      server.create("task", { id: 2, name:'taks 2', content: "content of task number 2." });
    },

    routes() {
      this.namespace = "api";

      this.get("/tasks", (schema) => {
        return schema.tasks.all();
      });
    },
  });

  return server;
}
