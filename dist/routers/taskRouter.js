"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const taskService_1 = __importDefault(require("../services/taskService"));
const BaseRouter_1 = require("./BaseRouter");
/**
 * @description TaskRouter
 */
class TaskRouter extends BaseRouter_1.BaseRouter {
    constructor() {
        super();
        this.taskService = taskService_1.default;
        this.init();
    }
    /**
     * Connect routes to their matching controller endpoints.
     */
    init() {
        this.router.get("/GetAll", this.taskService.getAll);
        this.router.post("/Save", this.taskService.Save);
        this.router.delete("/Delete", this.taskService.Delete);
        this.router.delete("/Archive", this.taskService.archive);
        this.router.post("/DeArchive", this.taskService.deArchive);
    }
}
module.exports = new TaskRouter().router;
//# sourceMappingURL=taskRouter.js.map