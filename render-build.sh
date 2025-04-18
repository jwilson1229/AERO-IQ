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

# Build the client
cd Client
npm install
npm run build

# Copy client build to server public directory
mkdir -p ../Server/dist/public
cp -r dist/* ../Server/dist/public/

echo "Build completed successfully!"
