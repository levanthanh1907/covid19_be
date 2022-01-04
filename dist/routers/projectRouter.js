"use strict";
const baseRouter_1 = require("./baseRouter");
const projectService = require("../services/projectService");
/**
 * @description ProjectRouter
 */
class ProjectRouter extends baseRouter_1.BaseRouter {
    constructor() {
        super();
        this.projectService = projectService;
        this.init();
    }
    /**
     * Connect routes to their matching projectService endpoints.
     */
    init() {
        this.router.post("/Save", this.projectService.Save);
        this.router.delete("/Delete", this.projectService.Delete);
        this.router.post("/Active", this.projectService.active);
        this.router.post("/Inactive", this.projectService.Inactive);
        this.router.get("/getAll", this.projectService.getAll);
        this.router.get("/get", this.projectService.get);
    }
}
module.exports = new ProjectRouter().router;
//# sourceMappingURL=projectRouter.js.map