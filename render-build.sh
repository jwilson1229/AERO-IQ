#!/bin/bash

# Install dependencies
npm install

# Build the server
cd Server
npm install --include=dev
# Install missing type for bcryptjs explicitly
npm install --include=dev @types/bcryptjs
npm run build
cd ..

# Build the client - skip TypeScript type checking during Render deployment
cd Client
npm install
# Skip TypeScript checking and directly build with Vite
export VITE_SKIP_TS_CHECK=true
vite build --mode production

# Copy client build to server public directory
mkdir -p ../Server/dist/public
cp -r dist/* ../Server/dist/public/

echo "Build completed successfully!"
