import fs = require("fs");
import { BaseRouter } from "./baseRouter";
import { authen } from "../middleware/Authen";
import projectService = require("../services/projectService");

/**
 * @description ProjectRouter
 */
class ProjectRouter extends BaseRouter {
  private projectService = projectService;

  constructor() {
    super();
    this.init();
  }

  /**
   * Connect routes to their matching projectService endpoints.
   */
  protected init() {
    this.router.post("/Save", this.projectService.Save);
    this.router.delete("/Delete", this.projectService.Delete);
    this.router.post("/Active", this.projectService.active);
    this.router.post("/Inactive", this.projectService.Inactive);
    this.router.get("/getAll", this.projectService.getAll);
    this.router.get("/get", this.projectService.get);
  }
}

export = new ProjectRouter().router;