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
const get_1 = __importDefault(require("../middleware/get"));
const roleRepository_1 = __importDefault(require("../repositories/roleRepository"));
class MyTimesheetService {
    constructor() {
        this.roleRepository = roleRepository_1.default;
        this.default = (req, res, next) => { };
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let role = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                let newRole = yield this.roleRepository.createRole(role);
                newRole = (0, get_1.default)(newRole, ["id", "name", "displayName", "description"]);
                response = Object.assign(Object.assign({}, response), { result: Object.assign({}, newRole), success: true });
                res.status(200).json(response);
            }
            catch (error) {
                throw error;
            }
        });
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const role = req.body;
            let response = {
                result: null,
                targetUrl: null,
                success: false,
                error: null,
                unAuthRequest: false,
                __abp: true,
            };
            try {
                yield this.roleRepository.findById(role.id);
                let editRole = yield this.roleRepository.update(role);
                editRole = (0, get_1.default)(editRole, ["id", "name", "displayName", "description"]);
                response = Object.assign(Object.assign({}, response), { result: Object.assign({}, editRole), success: true });
                res.status(200).json(response);
            }
            catch (error) {
                throw error;
            }
        });
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
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
                const deleteRole = yield this.roleRepository.delete(parseInt(id));
                response = Object.assign(Object.assign({}, response), { result: "Delete role successfully", success: true });
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
                let role = yield this.roleRepository.findAll();
                response = Object.assign(Object.assign({}, response), { success: true, result: role });
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
module.exports = new MyTimesheetService();
//# sourceMappingURL=roleService.js.map