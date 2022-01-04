"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberType = exports.ProjectType = exports.ProjectStatus = void 0;
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Deactive"] = 1] = "Deactive";
})(ProjectStatus = exports.ProjectStatus || (exports.ProjectStatus = {}));
var ProjectType;
(function (ProjectType) {
    ProjectType[ProjectType["C\u00F3 tr\u1EE3 c\u1EA5p ch\u00EDnh ph\u1EE7"] = 0] = "C\u00F3 tr\u1EE3 c\u1EA5p ch\u00EDnh ph\u1EE7";
    ProjectType[ProjectType["T\u1EF1 chi tr\u1EA3"] = 1] = "T\u1EF1 chi tr\u1EA3";
})(ProjectType = exports.ProjectType || (exports.ProjectType = {}));
var MemberType;
(function (MemberType) {
    MemberType[MemberType["Member"] = 0] = "Member";
    MemberType[MemberType["Project Manager"] = 1] = "Project Manager";
    MemberType[MemberType["Deactive"] = 2] = "Deactive";
})(MemberType = exports.MemberType || (exports.MemberType = {}));
//# sourceMappingURL=projectType.js.map