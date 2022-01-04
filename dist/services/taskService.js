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
const taskRepository_1 = __importDefault(require("../repositories/taskRepository"));
class TaskService {
    constructor() {
        this.taskRepository = taskRepository_1.default;
        this.default = (req, res, next) => { };
        this.Save = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let task = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                if (task.id) {
                    let edit = yield this.taskRepository.findById(task.id);
                    if (edit) {
                        let updateTask = yield edit.update({
                            name: task.name,
                        });
                        response = Object.assign(Object.assign({}, response), { success: true, result: updateTask });
                        res.status(200).json(response);
                    }
                    else {
                        response = Object.assign(Object.assign({}, response), { error: {
                                code: 0,
                                message: `Task id ${task.id} does not exist !!`,
                                details: null,
                                validationErrors: null,
                            } });
                        res.status(500).json(response);
                    }
                }
                else {
                    if (!(yield this.taskRepository.findByName(task.name))) {
                        let saveTask = yield this.taskRepository.create(task);
                        response = Object.assign(Object.assign({}, response), { result: saveTask, success: true });
                        res.status(200).json(response);
                    }
                    else {
                        response = Object.assign(Object.assign({}, response), { error: {
                                code: 0,
                                message: `Task name ${task.name} already existed !!`,
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
                const deleteTask = yield this.taskRepository.delete(parseInt(id));
                response = Object.assign(Object.assign({}, response), { result: "Delete task successfully", success: true });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                let getTask = yield this.taskRepository.findAll();
                response = Object.assign(Object.assign({}, response), { success: true, result: getTask });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.archive = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                if (yield this.taskRepository.findById(parseInt(id))) {
                    yield this.taskRepository.archiveTask(parseInt(id));
                    response = Object.assign(Object.assign({}, response), { success: true });
                    res.status(200).json(response);
                }
                else {
                    response = Object.assign(Object.assign({}, response), { error: {
                            code: 0,
                            message: `This taskId ${id} is in a project ,You can't delete task`,
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
        this.deArchive = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                if (yield this.taskRepository.findById(parseInt(id))) {
                    yield this.taskRepository.deArchiveTask(parseInt(id));
                    response = Object.assign(Object.assign({}, response), { success: true });
                    res.status(200).json(response);
                }
                else {
                    response = Object.assign(Object.assign({}, response), { error: {
                            code: 0,
                            message: `This taskId ${id} is in a project ,You can't restore task`,
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
    }
    defaultMethod(req, res, next) {
        throw new Error("Method not implemented.");
    }
}
module.exports = new TaskService();
//# sourceMappingURL=taskService.js.map