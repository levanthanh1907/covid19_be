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
const mongoose_1 = require("mongoose");
const projectUserModel_1 = require("../models/projectUserModel");
const baseRepository_1 = require("./baseRepository");
class ProjectUserRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super("ProjectUser", projectUserModel_1.ProjectUserSchema);
    }
    createProjectUser(userId, projectId, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (yield this.lastId()) + 1;
            const newProjectUser = new projectUserModel_1.ProjectUser({
                _id: mongoose_1.Types.ObjectId(),
                projectId,
                userId,
                type,
                id,
            });
            try {
                yield newProjectUser.save();
                return this.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield projectUserModel_1.ProjectUser.find({ userId });
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteUserProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield projectUserModel_1.ProjectUser.deleteOne({ id: id });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByProjectId(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let project = yield projectUserModel_1.ProjectUser.find({ projectId });
                if (!project)
                    return;
                return project;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getMemberProject(projectId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let members = yield projectUserModel_1.ProjectUser.find({ projectId });
                members = members.filter(function (member) {
                    return member.type != 2;
                });
                return members.length;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
module.exports = new ProjectUserRepository();
//# sourceMappingURL=projectUserRepository.js.map