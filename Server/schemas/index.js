"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
const typeDefs_1 = __importDefault(require("./typeDefs"));
exports.typeDefs = typeDefs_1.default;
const resolvers_1 = require("./resolvers");
Object.defineProperty(exports, "resolvers", { enumerable: true, get: function () { return resolvers_1.resolvers; } });
