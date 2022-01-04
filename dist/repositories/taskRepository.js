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
const taskModel_1 = require("../models/taskModel");
const baseRepository_1 = require("./baseRepository");
class TaskRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super("Task", taskModel_1.TaskSchema);
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (yield this.lastId()) + 1;
            const newTask = new taskModel_1.Task(Object.assign(Object.assign({}, task), { id }));
            try {
                return yield newTask.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield taskModel_1.Task.findOne({
                id: id,
            });
            try {
                return yield task.remove();
            }
            catch (error) {
                throw error;
            }
        });
    }
    archiveTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield taskModel_1.Task.findOne({
                id: id,
            });
            try {
                return yield task.update({ isDeleted: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    deArchiveTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield taskModel_1.Task.findOne({
                id: id,
            });
            try {
                return yield task.update({ isDeleted: false });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
module.exports = new TaskRepository();
//# sourceMappingURL=taskRepository.js.map