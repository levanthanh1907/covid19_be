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
exports.Project = exports.ProjectSchema = void 0;
const mongoose_1 = require("mongoose");
const projectType_1 = require("../type/projectType");
exports.ProjectSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    name: { type: String, require: true, unique: true },
    properties: { type: String, require: true, unique: true },
    status: { type: Number, enum: Object.values(projectType_1.ProjectStatus) },
    timeStart: { type: Date, default: Date.now },
    timeEnd: { type: Date, default: Date.now },
    projectType: { type: projectType_1.ProjectType, enum: Object.values(projectType_1.ProjectType) },
    customerId: { type: Number },
    note: { type: String, default: null },
    isAllUserBelongTo: { type: Boolean },
    id: { type: Number, require: true, unique: true },
}, {
    timestamps: true,
});
exports.Project = (0, mongoose_1.model)("Project", exports.ProjectSchema, "projects");
exports.ProjectSchema.path("name").validate((value) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield exports.Project.count({ name: value });
    return !count;
}), "name already exists");
//# sourceMappingURL=projectModel.js.map