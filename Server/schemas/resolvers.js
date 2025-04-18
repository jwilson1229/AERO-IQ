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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const User_1 = require("../models/User");
const auth_1 = require("../utils/auth");
const BetSlip_1 = __importDefault(require("../models/BetSlip"));
exports.resolvers = {
    Query: {
        me: (_, __, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user)
                throw new Error("Denied");
            return User_1.User.findById(context.user._id);
        }),
    },
    Mutation: {
        addUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { username, email, password }) {
            const user = yield User_1.User.create({ username, email, password });
            const token = (0, auth_1.signToken)(user);
            return { token, user };
        }),
        login: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password }) {
            const user = yield User_1.User.findOne({ email });
            if (!user) {
                throw new Error("Invalid Login: User not found");
            }
            const isMatch = yield user.isCorrectPassword(password);
            if (!isMatch) {
                throw new Error("Invalid Login: Incorrect password");
            }
            const token = (0, auth_1.signToken)(user);
            return { token, user };
        }),
        createBetSlip: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.user) {
                throw new Error('You must be logged in to create a bet slip');
            }
            const betSlip = yield BetSlip_1.default.create(Object.assign(Object.assign({}, args), { user: context.user._id }));
            return betSlip;
        })
    }
};
