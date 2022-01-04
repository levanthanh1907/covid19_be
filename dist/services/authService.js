"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userModel_1 = require("../models/userModel");
const signJWT_1 = __importDefault(require("../middleware/signJWT"));
/**
 * @description AuthServive.
 */
class AuthServive {
    constructor() {
        this.default = (req, res, next) => { };
        this.login = (req, res, next) => {
            let { userNameOrEmailAddress, password } = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            userModel_1.User.find({ userName: userNameOrEmailAddress })
                .exec()
                .then((users) => {
                if (users.length !== 1) {
                    response = Object.assign(Object.assign({}, response), { error: {
                            code: 0,
                            message: "userNameOrEmailAddress doesn't exist!!!",
                            details: null,
                            validationErrors: null
                        } });
                    return res.status(400).json(response);
                }
                bcryptjs_1.default.compare(password, users[0].password, (error, result) => {
                    if (error) {
                        response = Object.assign(Object.assign({}, response), { error: {
                                code: 0,
                                message: "Password incorrect",
                                details: null,
                                validationErrors: null
                            } });
                        return res.status(400).json(response);
                    }
                    else if (result) {
                        (0, signJWT_1.default)(users[0], (_error, token, expirationTimeInSeconds) => {
                            if (_error) {
                                return res.status(500).json({
                                    message: _error.message,
                                    error: _error,
                                });
                            }
                            else if (token) {
                                response.success = true;
                                response.result = {
                                    accessToken: token,
                                    userId: users[0].id,
                                    expireInSeconds: expirationTimeInSeconds,
                                    encryptedAccessToken: token,
                                };
                                return res.status(200).json(response);
                            }
                        });
                    }
                });
            })
                .catch((err) => {
                res.status(500).json({
                    error: err,
                });
            });
        };
    }
    defaultMethod(req, res, next) {
        throw new Error("Method not implemented.");
    }
}
module.exports = new AuthServive();
//# sourceMappingURL=authService.js.map