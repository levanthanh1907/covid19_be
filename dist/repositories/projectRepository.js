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
const projectModel_1 = require("../models/projectModel");
const baseRepository_1 = require("./baseRepository");
class ProjectRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super("Project", projectModel_1.ProjectSchema);
    }
    createProject(project) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = (yield this.lastId()) + 1;
            let newProject = new projectModel_1.Project(Object.assign(Object.assign({ _id: mongoose_1.Types.ObjectId() }, project), { id }));
            try {
                yield newProject.save();
                return this.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteProject(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield projectModel_1.Project.deleteOne({ id: id });
                return true;
            }
            catch (error) {
                throw error;
            }
        });
    }
    active(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield projectModel_1.Project.findOne({ id: id });
                return yield project.update({ status: 0 });
            }
            catch (error) {
                throw error;
            }
        });
    }
    inActive(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield projectModel_1.Project.findOne({ id: id });
                return yield project.update({ status: 1 });
            }
            catch (error) {
                throw error;
            }
        });
    }
    findByProjectId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let project = yield projectModel_1.Project.find({ id });
                return project;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findStatus(status, search) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let findProject = new RegExp(search, "i");
                if (status == 0) {
                    return yield projectModel_1.Project.find({ status: 0, name: findProject });
                }
                else if (status == 1) {
                    return yield projectModel_1.Project.find({ status: 1, name: findProject });
                }
                else {
                    return yield projectModel_1.Project.find({ name: findProject });
                }
            }
            catch (error) { }
        });
    }
    findProjectByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const project = yield projectModel_1.Project.findOne({ name });
                if (!project)
                    return;
                return project;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
module.exports = new ProjectRepository();
//# sourceMappingURL=ProjectRepository.js.map