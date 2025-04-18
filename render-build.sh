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

# For the client build, we'll use a simpler approach for Render
cd Client

# Install all dependencies including dev dependencies
npm install --include=dev

# Explicitly install Vite and React plugin globally for this build
npm install -g vite @vitejs/plugin-react

# Create a simplified temporary Vite config for production build
cat > vite.config.simple.js << 'EOL'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
EOL

# Build with the simplified config
VITE_SKIP_TS_CHECK=true vite build --config vite.config.simple.js --mode production

# Copy client build to server public directory
mkdir -p ../Server/dist/public
cp -r dist/* ../Server/dist/public/

echo "Build completed successfully!"
