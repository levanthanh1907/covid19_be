"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authen = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const authen = (req, res, next) => {
    var _a;
    let response = {
        result: null,
        targetUrl: null,
        success: false,
        error: {
            code: 0,
            message: "Currently the user is not logged in !!",
            details: null,
            validationErrors: null,
        },
        unAuthRequest: true,
        __abp: true,
    };
    try {
        let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (token) {
            jsonwebtoken_1.default.verify(token, config_1.default.server.token.secret, (error, decoded) => {
                if (error) {
                    return res.status(400).json({
                        message: error.message,
                        error,
                    });
                }
                else {
                    res.locals.jwt = decoded;
                    req.user = decoded;
                    next();
                }
            });
        }
        else {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }
    }
    catch (error) {
        res.status(401).json(response);
    }
};
exports.authen = authen;
//# sourceMappingURL=Authen.js.map