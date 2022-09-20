"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idGenerator = void 0;
function idGenerator() {
    return Math.random().toString(36).slice(2);
}
exports.idGenerator = idGenerator;
