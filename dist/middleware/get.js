"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get = (object, keys) => {
    return keys.reduce((obj, key) => {
        if (object && object[key] !== undefined) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};
exports.default = get;
//# sourceMappingURL=get.js.map