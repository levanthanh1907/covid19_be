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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const get_1 = __importDefault(require("../middleware/get"));
class UserService {
    constructor() {
        this.userRepository = userRepository_1.default;
        this.default = (req, res, next) => { };
        this.createUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let user = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                if (!user.userName ||
                    !user.emailAddress ||
                    !user.password ||
                    !user.name ||
                    !user.surname) {
                    response = Object.assign(Object.assign({}, response), { error: {
                            code: 0,
                            message: "Your request is not valid!",
                            details: null,
                            validationErrors: null,
                        } });
                    return res.status(500).json(response);
                }
                const hash = yield bcryptjs_1.default.hash(user.password, 10);
                user["password"] = hash;
                let newUser = yield this.userRepository.createUser(user);
                newUser = (0, get_1.default)(newUser, [
                    "id",
                    "userName",
                    "emailAddress",
                    "name",
                    "surname",
                    "fullName",
                    "address",
                    "phoneNumber",
                    "roleNames",
                    "avatarPath",
                    "TreatmentHospital",
                    "sex",
                ]);
                response = Object.assign(Object.assign({}, response), { result: newUser, success: true });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let user = req.body;
            user.fullName = `${user.surname} ${user.name}`;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                yield this.userRepository.findById(user.id);
                let updateUser = yield this.userRepository.update(user);
                updateUser = (0, get_1.default)(updateUser, [
                    "id",
                    "userName",
                    "emailAddress",
                    "name",
                    "surname",
                    "fullName",
                    "address",
                    "phoneNumber",
                    "roleNames",
                    "avatarPath",
                    "TreatmentHospital",
                    "sex",
                ]);
                response = Object.assign(Object.assign({}, response), { result: updateUser, success: true });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                yield this.userRepository.deleteUser(parseInt(id));
                response = Object.assign(Object.assign({}, response), { result: "Delete user successfully", success: true });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        this.getAllPagging = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let filter = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                let result = [];
                let paggingUser = yield this.userRepository.findAllPaging(filter.filterItems, filter.skipCount, filter.maxResultCount, filter.searchText);
                for (let user of paggingUser) {
                    let list = (0, get_1.default)(user, [
                        "id",
                        "userName",
                        "emailAddress",
                        "name",
                        "surname",
                        "fullName",
                        "address",
                        "phoneNumber",
                        "roleNames",
                        "avatarPath",
                        "TreatmentHospital",
                        "sex",
                    ]);
                    result.push(Object.assign({}, list));
                }
                response = Object.assign(Object.assign({}, response), { success: true, result: {
                        totalCount: paggingUser.length,
                        items: result,
                    } });
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
                let getTask = yield this.userRepository.findAll();
                response = Object.assign(Object.assign({}, response), { success: true, result: getTask });
                res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
        // updateAvatar = async (req: Request, res: Response, next: NextFunction) => {
        //   let path = req.file.path.slice(6);
        //   let userId = req.body.userId;
        //   let response: IResponse = {
        //     result: null,
        //     targetUrl: null,
        //     success: false,
        //     error: null,
        //     unAuthRequest: false,
        //     __abp: true,
        //   };
        //   try {
        //     if (await this.userRepository.findById(userId)) {
        //       await this.userRepository.changeAvatar(userId, path);
        //       response = {
        //         ...response,
        //         result: path,
        //         success: true,
        //       };
        //       res.status(200).json(response);
        //     } else {
        //       response = {
        //         ...response,
        //         result: null,
        //         error: {
        //           code: 0,
        //           details: null,
        //           message: `No file upload!!`,
        //           validationErrors: null,
        //         },
        //         success: false,
        //       };
        //       res.status(500).json(response);
        //     }
        //   } catch (error) {
        //     next(error);
        //   }
        // };
        this.resetPassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { userId, adminPassword, newPassword } = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                yield this.userRepository.findById(parseInt(userId));
                let admin = yield this.userRepository.findRoleName();
                if (yield bcryptjs_1.default.compare(adminPassword, admin.password)) {
                    const hash = yield bcryptjs_1.default.hash(newPassword, 10);
                    yield this.userRepository.updatePass(userId, hash);
                    response = Object.assign(Object.assign({}, response), { result: true, success: true });
                }
                else {
                    response = Object.assign(Object.assign({}, response), { error: {
                            code: 0,
                            message: `Your request is not valid!`,
                            details: null,
                            validationErrors: null,
                        } });
                }
                res.status(200).json(response);
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
module.exports = new UserService();
//# sourceMappingURL=userService.js.map