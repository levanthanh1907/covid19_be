"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const express_jwt_1 = __importDefault(require("express-jwt"));
const config_1 = __importDefault(require("../config/config"));
function authorize(roles = []) {
    try {
        if (typeof roles === "string") {
            roles = [roles];
        }
        return [
            (0, express_jwt_1.default)({ secret: config_1.default.server.token.secret, algorithms: ["HS256"] }),
            (req, res, next) => {
                console.log(req.user);
                if (!roles.some((e) => req.user.role.includes(e))) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                next();
            },
        ];
    }
    catch (error) { }
}
exports.authorize = authorize;
//# sourceMappingURL=Authorize.js.map