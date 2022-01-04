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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.TaskSchema = void 0;
const mongoose_1 = require("mongoose");
const taskType_1 = require("../type/taskType");
exports.TaskSchema = new mongoose_1.Schema({
    id: { type: Number, require: true, unique: true },
    name: { type: String, require: true, unique: true },
    type: { type: taskType_1.TaskType },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true,
});
exports.Task = (0, mongoose_1.model)("Task", exports.TaskSchema, "tasks");
exports.TaskSchema.path("name").validate((value) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield exports.Task.count({ name: value });
    return !count;
}), "name already exists");
//# sourceMappingURL=taskModel.js.map