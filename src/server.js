import { Server, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    environment,

    models: {
      task: Model,
    },

    seeds(server) {
      server.create("task", {
        id: 1,
        title: "Implement Preject Management system",
        schedule: "Sep 13",
        status: "Not started",
      });
      server.create("task", {
        id: 2,
        title: "Create Index Page",
        schedule: "Aug 1",
        status: "In progress",
      });
      server.create("task", {
        id: 3,
        title: "Design Page Home",
        schedule: "Jul 1",
        status: "Finished",
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/tasks", (schema) => {
        return schema.tasks.all();
      });

      this.post("/new-task", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        let obj = {
          id: schema.tasks.all().length + 1,
          title: attrs.title,
          schedule: attrs.schedule,
          status: attrs.status,
        };
        server.create("task", obj);
        return obj;
      });

      this.put("/update-task/:id", (schema, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        let obj = schema.tasks.find(id);
        obj.title = attrs.title;
        obj.schedule = attrs.schedule;
        obj.status = attrs.status;
        return obj;
      });

      this.delete("/delete-task/:id", (schema, request) => {
        let id = request.params.id;
        return schema.tasks.find(id).destroy();
      });
    },
  });

  return server;
}
