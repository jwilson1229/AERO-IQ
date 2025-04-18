import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import cors from 'cors';
import { authMiddleware } from './utils/auth.js';
import dotenv from 'dotenv';
dotenv.config();
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const startApolloServer = async () => {
    await server.start();
    await db();
    const app = express();
    app.use(cors({
        origin: '*',
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    }));
    app.options('*', cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    if (process.env.NODE_ENV === 'production') {
        // Serve static files from the React app
        app.use(express.static(path.join(__dirname, 'public')));
        // For any other route, send the index.html file
        app.get('*', (_req, res) => {
            res.sendFile(path.join(__dirname, 'public/index.html'));
        });
    }
    app.use('/graphql', expressMiddleware(server, {
        context: authMiddleware
    }));
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`✅ API server running on port ${PORT}`);
        console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
    });
};
startApolloServer();
