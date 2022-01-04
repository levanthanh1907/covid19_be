"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.RoleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RoleSchema = new mongoose_1.Schema({
    id: { type: Number, require: true, unique: true },
    userId: { type: Number },
    name: { type: String, require: true, unique: true },
    displayName: { type: String },
    description: { type: String, default: null },
});
exports.Role = (0, mongoose_1.model)("Role", exports.RoleSchema, "roles");
//# sourceMappingURL=roleModel.js.map