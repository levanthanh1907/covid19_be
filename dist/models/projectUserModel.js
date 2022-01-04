"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectUser = exports.ProjectUserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProjectUserSchema = new mongoose_1.Schema({
    _id: mongoose_1.Types.ObjectId,
    projectId: { type: Number },
    userId: { type: Number },
    type: { type: Number },
    id: { type: Number },
}, {
    timestamps: true,
});
exports.ProjectUser = (0, mongoose_1.model)("ProjectUser", exports.ProjectUserSchema, "projectusers");
//# sourceMappingURL=projectUserModel.js.map