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
const mongoose_1 = require("mongoose");
const userModel_1 = require("../models/userModel");
const baseRepository_1 = require("./baseRepository");
const projectUserRepository_1 = __importDefault(require("./projectUserRepository"));
class UserRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super("User", userModel_1.UserSchema);
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (yield this.lastId()) + 1;
            const newUser = new userModel_1.User(Object.assign(Object.assign({ _id: mongoose_1.Types.ObjectId() }, user), { avatarPath: "", id, fullName: `${user.surname} ${user.name}` }));
            try {
                return yield newUser.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userModel_1.User.findOne({
                id: id,
            });
            try {
                return yield user.remove();
            }
            catch (error) {
                throw error;
            }
        });
    }
    findAllPaging(filterItems, skip, max, search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let name = new RegExp(search, "i");
                let user = yield userModel_1.User.find({ name })
                    .select("userName emailAddress name surname fullName address phoneNumber roleNames avatarPath type branch sex")
                    .skip(skip)
                    .limit(max);
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    changeAvatar(id, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel_1.User.updateOne({ id }, { avatarPath: path });
                return this.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updatePass(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield userModel_1.User.updateOne({ id: userId }, { password: newPassword });
                return yield this.findById(userId);
            }
            catch (error) { }
        });
    }
    findRoleName() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let roleName = yield userModel_1.User.findOne({ roleNames: "Admin" });
                return roleName;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getManageProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let member = yield projectUserRepository_1.default.findByProjectId(projectId);
                let pms = [];
                member = member.filter(function (members) {
                    return members.type == 1;
                });
                for (let item of member) {
                    let user = yield this.findById(item.userId);
                    pms.push(user.fullName);
                }
                return pms;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
module.exports = new UserRepository();
//# sourceMappingURL=userRepository.js.map