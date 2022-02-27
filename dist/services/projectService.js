"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ProjectTaskRepository_1 = __importDefault(require("../repositories/ProjectTaskRepository"));
const ProjectUserRepository_1 = __importDefault(require("../repositories/ProjectUserRepository"));
const UserRepository_1 = __importDefault(require("../repositories/UserRepository"));
const get_1 = __importDefault(require("../middleware/get"));
const ProjectRepository_1 = __importDefault(require("../repositories/ProjectRepository"));
class ProjectService {
    constructor() {
        this.projectRepository = ProjectRepository_1.default;
        this.projectTaskRepository = ProjectTaskRepository_1.default;
        this.projectUserRepository = ProjectUserRepository_1.default;
        this.userRepository = UserRepository_1.default;
        this.default = (req, res, next) => { };
        this.Save = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const project = req.body;
            const { tasks, users } = project;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                if (project.id) {
                    if (yield this.projectRepository.findById(project.id)) {
                        yield this.projectTaskRepository.deleteTaskProject(project.id);
                        yield this.projectUserRepository.deleteUserProject(project.id);
                        for (let task of tasks) {
                            yield this.projectTaskRepository.createProjectTask(task.taskId, task.projectId, task.billable);
                        }
                        for (let user of users) {
                            yield this.projectUserRepository.createProjectUser(user.projectId, user.userId, user.type);
                        }
                        let editProject = yield this.projectRepository.update(project);
                        editProject = (0, get_1.default)(editProject, [
                            "note",
                            "status",
                            "name",
                            "properties",
                            "projectType",
                            "customerId",
                            "isAllUserBelongTo",
                            "id",
                            "timeStart",
                            "timeEnd",
                        ]);
                        response = Object.assign(Object.assign({}, response), { success: true, result: Object.assign(Object.assign({}, editProject), { tasks: tasks.map((task) => {
                                    return {
                                        id: task.id,
                                        taskId: task.taskId,
                                        billable: task.billable,
                                    };
                                }), users: users.map((user) => {
                                    return {
                                        id: user.id,
                                        userId: user.userId,
                                        type: user.type,
                                    };
                                }) }) });
                        res.status(200).json(response);
                    }
                    else {
                        response = Object.assign(Object.assign({}, response), { error: {
                                code: 0,
                                message: `Project id ${project.id}`,
                                details: null,
                                validationErrors: null,
                            } });
                        res.status(500).json(response);
                    }
                }
                else {
                    if (!(yield this.projectRepository.findByName(project.name))) {
                        let createProject = yield this.projectRepository.createProject(project);
                        createProject = (0, get_1.default)(createProject, [
                            "note",
                            "status",
                            "name",
                            "properties",
                            "projectType",
                            "customerId",
                            "isAllUserBelongTo",
                            "id",
                            "timeStart",
                            "timeEnd",
                        ]);
                        for (let task of tasks) {
                            yield this.projectTaskRepository.createProjectTask(task.taskId, createProject.id, task.billable);
                        }
                        for (let user of users) {
                            yield this.projectUserRepository.createProjectUser(user.userId, createProject.id, user.type);
                        }
                        response = Object.assign(Object.assign({}, response), { result: Object.assign(Object.assign({}, createProject), { tasks: tasks.map((task) => {
                                    return {
                                        id: task.id,
                                        taskId: task.taskId,
                                        billable: task.billable,
                                    };
                                }), users: users.map((user) => {
                                    return {
                                        id: user.id,
                                        userId: user.userId,
                                        type: user.type,
                                    };
                                }) }), success: true });
                        res.status(200).json(response);
                    }
                    else {
                        response = Object.assign(Object.assign({}, response), { error: {
                                code: 0,
                                message: `Project ${project.name} is already exist!`,
                                details: null,
                                validationErrors: null,
                            } });
                        res.status(500).json(response);
                    }
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.Delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                if (yield this.projectRepository.findById(parseInt(id))) {
                    yield this.projectRepository.deleteProject(parseInt(id));
                    yield this.projectTaskRepository.deleteTaskProject(parseInt(id));
                    yield this.projectUserRepository.deleteUserProject(parseInt(id));
                    response = Object.assign(Object.assign({}, response), { result: "Delete project successfully", success: true });
                    res.status(200).json(response);
                }
                else {
                    response = Object.assign(Object.assign({}, response), { error: {
                            code: 0,
                            message: `Not found ${id}!`,
                            details: null,
                            validationErrors: null,
                        } });
                    res.status(200).json(response);
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.active = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const id = req.query.id;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                if (yield this.projectRepository.findById(parseInt(id))) {
                    yield this.projectRepository.active(parseInt(id));
                    response = Object.assign(Object.assign({}, response), { success: true });
                    res.status(200).json(response);
                }
                else {
                    response = Object.assign(Object.assign({}, response), { error: {
                            code: 0,
                            message: `This projectId ${id} is in a project, You can't active project`,
                            details: null,
                            validationErrors: null,
                        } });
                    res.status(500).json(response);
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.Inactive = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let id = req.query.id;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                if (yield this.projectRepository.findById(parseInt(id))) {
                    yield this.projectRepository.inActive(parseInt(id));
                    response = Object.assign(Object.assign({}, response), { success: true });
                    res.status(200).json(response);
                }
                else {
                    response = Object.assign(Object.assign({}, response), { error: {
                            code: 0,
                            message: `This ProjectId ${id} is in a project ,You can't inactive project`,
                            details: null,
                            validationErrors: null,
                        } });
                    res.status(500).json(response);
                }
            }
            catch (error) {
                next(error);
            }
        });
        this.get = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const projectId = req.query.id;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                let project = yield this.projectRepository.findById(parseInt(projectId));
                const tasks = yield this.projectTaskRepository.findByProjectId(parseInt(projectId));
                const users = yield this.projectUserRepository.findByProjectId(parseInt(projectId));
                project = (0, get_1.default)(project, [
                    "name",
                    "properties",
                    "status",
                    "note",
                    "timeStart",
                    "timeEnd",
                    "projectType",
                    "customerId",
                    "id",
                    "isAllUserBelongTo",
                ]);
                response.success = true;
                response.result = Object.assign(Object.assign({}, project), { tasks: tasks.map((task) => {
                        return {
                            id: task.id,
                            taskId: task.taskId,
                            billable: task.billable,
                        };
                    }), users: users.map((user) => {
                        return {
                            id: user.id,
                            userId: user.userId,
                            type: user.type,
                        };
                    }) });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let { status, search } = req.query;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                let result = [];
                let project = yield this.projectRepository.findStatus(parseInt(status), search);
                for (let item of project) {
                    let getMember = yield this.projectUserRepository.getMemberProject(item.id);
                    let getManage = yield this.userRepository.getManageProject(item.id);
                    let getProject = (0, get_1.default)(item, [
                        "activeMember",
                        "code",
                        "id",
                        "name",
                        "pms",
                        "projectType",
                        "status",
                        "timeEnd",
                        "timeStart",
                    ]);
                    let getall = Object.assign(Object.assign({}, getProject), { activeMember: getMember, pms: getManage });
                    result.push(getall);
                }
                response = Object.assign(Object.assign({}, response), { result: result, success: true });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.getUserByProject = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = {
                    result: null,
                    targetUrl: null,
                    success: false,
                    error: null,
                    unAuthRequest: false,
                    __abp: true,
                };
                const { name } = req.params;
                const project = yield this.projectRepository.findProjectByName(name);
                if (!project)
                    return res
                        .status(400)
                        .json({ success: false, message: "Not found project by name" });
                const { id } = project;
                const projectUser = yield this.projectUserRepository.findByProjectId(id);
                if (Array.isArray(projectUser) && projectUser.length === 0)
                    return res
                        .status(400)
                        .json({ success: false, message: "Not found project user" });
                const userid = projectUser.map((user) => user.userId);
                const user = yield Promise.all(userid.map((id) => this.userRepository.findUserById(id)));
                if (Array.isArray(user) && user.length === 0)
                    return res
                        .status(400)
                        .json({ success: false, message: "Not found user" });
                response = Object.assign(Object.assign({}, response), { success: true, result: user });
                return res.status(200).json(response);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    defaultMethod(req, res, next) {
        throw new Error("Method not implemented.");
    }
}
module.exports = new ProjectService();
//# sourceMappingURL=projectService.js.map