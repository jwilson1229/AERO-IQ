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
const express_1 = __importDefault(require("express"));
const node_path_1 = __importDefault(require("node:path"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const index_1 = require("../schemas/index");
const connection_1 = __importDefault(require("../config/connection"));
const cors_1 = __importDefault(require("cors"));
const server = new server_1.ApolloServer({
    typeDefs: index_1.typeDefs,
    resolvers: index_1.resolvers,
});
const startApolloServer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    yield (0, connection_1.default)();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }));
    app.options('*', (0, cors_1.default)());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use(express_1.default.json());
    if (process.env.NODE_ENV === 'production') {
        app.use(express_1.default.static(node_path_1.default.join(__dirname, '../client/dist')));
        app.get('*', (_req, res) => {
            res.sendFile(node_path_1.default.join(__dirname, '../client/dist/index.html'));
        });
    }
    app.use('/graphql', (0, express4_1.expressMiddleware)(server));
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
});
startApolloServer();
