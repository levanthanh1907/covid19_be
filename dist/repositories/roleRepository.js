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
const roleModel_1 = require("../models/roleModel");
const baseRepository_1 = require("./baseRepository");
class RoleRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super("Role", roleModel_1.RoleSchema);
    }
    createRole(role) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (yield this.lastId()) + 1;
            const newRole = new roleModel_1.Role(Object.assign(Object.assign({}, role), { id }));
            try {
                return yield newRole.save();
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteRole(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const role = yield roleModel_1.Role.findOne({
                id: id,
            });
            try {
                return yield role.remove();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
module.exports = new RoleRepository();
//# sourceMappingURL=roleRepository.js.map