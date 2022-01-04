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
exports.BaseRepository = void 0;
const mongoose_1 = require("mongoose");
class BaseRepository {
    constructor(modelName, schema) {
        this.model = (0, mongoose_1.model)(modelName, schema);
    }
    lastId() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.model.findOne().sort({ id: -1 });
                if (item)
                    return item.id;
                return 0;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (yield this.lastId()) + 1;
            let newItem = new this.model(Object.assign(Object.assign({}, item), { id }));
            try {
                yield newItem.save();
                return yield this.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    update(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.updateOne({ id: item.id }, item);
                return yield this.findById(item.id);
            }
            catch (error) { }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.deleteOne({ id: id });
                return true;
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne({ id: id });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.find();
            }
            catch (error) { }
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne({ name: name });
            }
            catch (error) { }
        });
    }
    SaveAndUpdate(item) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.model.updateOne({ id: item.id }, item);
                return yield this.findById(item.id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=baseRepository.js.map