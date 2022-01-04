import { authen } from "../middleware/Authen";
import taskService from "../services/taskService";
import { BaseRouter } from "./BaseRouter";

/**
 * @description TaskRouter
 */
class TaskRouter extends BaseRouter {
  private taskService = taskService;

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  protected init() {
    this.router.get("/GetAll", this.taskService.getAll);
    this.router.post("/Save", this.taskService.Save);
    this.router.delete("/Delete", this.taskService.Delete);
    this.router.delete("/Archive", this.taskService.archive);
    this.router.post("/DeArchive", this.taskService.deArchive)
  }
}

export = new TaskRouter().router;
