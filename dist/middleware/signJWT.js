"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const logging_1 = __importDefault(require("../config/logging"));
const NAMESPACE = "Auth";
const signJWT = (user, callback) => {
    var timeSinchEpoch = new Date().getTime();
    var expirationTime = timeSinchEpoch + Number(config_1.default.server.token.expireTime) * 100000;
    var expirationTimeInseconds = Math.floor(expirationTime / 1000);
    logging_1.default.info(NAMESPACE, `Attempting to sign token for ${user.userName}`);
    try {
        jsonwebtoken_1.default.sign({
            username: user.userName,
            role: user.roleNames,
        }, config_1.default.server.token.secret, {
            issuer: config_1.default.server.token.issuer,
            algorithm: "HS256",
            expiresIn: expirationTimeInseconds,
        }, (error, token) => {
            if (error) {
                callback(error, null, null);
            }
            else if (token) {
                callback(null, token, expirationTimeInseconds);
            }
        });
    }
    catch (error) {
        callback(error, null, null);
    }
};
exports.default = signJWT;
//# sourceMappingURL=signJWT.js.map