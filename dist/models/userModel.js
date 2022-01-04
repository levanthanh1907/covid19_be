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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = require("validator");
const userType_1 = require("../type/userType");
exports.UserSchema = new mongoose_1.Schema({
    id: { type: Number, require: true, unique: true },
    userName: {
        type: String,
        require: [true, "The UserName field is required"],
        unique: true,
    },
    password: {
        type: String,
        requied: [true, "The PassWord field is required"],
        minlength: [6, "password can't be shorter than 6 characters"],
    },
    emailAddress: {
        type: String,
        required: "Email address is required",
        validate: [validator_1.isEmail, "Please fill a valid email address"],
    },
    name: { type: String, require: [true, "The Name field is required"] },
    surname: { type: String, require: [true, "The SurName field is required"] },
    fullName: { type: String, require: true },
    address: { type: String, default: null },
    phoneNumber: { type: String, default: null },
    roleNames: [String],
    avatarPath: { type: String, default: null },
    TreatmentHospital: { type: userType_1.TreatmentHospital, enum: Object.values(userType_1.TreatmentHospital) },
    sex: { type: userType_1.Sex, enum: Object.values(userType_1.Sex) },
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", exports.UserSchema, "users");
exports.UserSchema.path("userName").validate((value) => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield exports.User.count({ userName: value });
    return !count;
}), "userName already exists");
//# sourceMappingURL=userModel.js.map