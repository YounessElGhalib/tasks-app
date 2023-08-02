import { Server, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      task: Model,
    },

    seeds(server) {
      server.create("task", { id: 1, title:'Implement Preject Management system', schedule: "Sep 13", status: 'Not started' });
      server.create("task", { id: 2, title:'Create Index Page', schedule: "Aug 1", status: 'In progress' });
      server.create("task", { id: 3, title:'Design Page Home', schedule: "Jul 1", status: 'Finished' });
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
