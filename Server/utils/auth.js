"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = signToken;
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET_KEY || 'supersecret';
const expiration = '2h';
function signToken({ _id, username, email }) {
    const payload = { _id, username, email };
    return jsonwebtoken_1.default.sign({ data: payload }, secret, { expiresIn: expiration });
}
function authMiddleware({ req }) {
    let token = req.headers.authorization || '';
    if (token.startsWith('Bearer'))
        token = token.slice(7);
    try {
        const { data } = jsonwebtoken_1.default.verifiy(token, secret);
        req.user = data;
    }
    catch (error) {
        return req;
    }
}
