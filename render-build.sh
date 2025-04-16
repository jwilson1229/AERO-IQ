#!/bin/bash

# Install dependencies
npm install

# Build the server
cd Server
npm install
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
