#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, 'src');

const directories = [
  'config',
  'routes',
  'controllers',
  'services',
  'middleware',
  'schemas',
  'utils',
  'plugins',
];

const prismaDir = path.join(__dirname, 'prisma');

// Create src and subdirectories
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
  console.log(`✓ Created ${srcDir}`);
}

directories.forEach((dir) => {
  const fullPath = path.join(srcDir, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✓ Created ${fullPath}`);
  }
});

// Create prisma directory
if (!fs.existsSync(prismaDir)) {
  fs.mkdirSync(prismaDir, { recursive: true });
  console.log(`✓ Created ${prismaDir}`);
}

// Move temporary files to their final locations
const moves = [
  { from: 'env.ts', to: 'src/config/env.ts' },
  { from: 'logger.ts', to: 'src/utils/logger.ts' },
  { from: 'errors.ts', to: 'src/utils/errors.ts' },
  { from: 'response.ts', to: 'src/utils/response.ts' },
  { from: 'database.ts', to: 'src/plugins/database.ts' },
  { from: 'cors.ts', to: 'src/plugins/cors.ts' },
  { from: 'health.ts', to: 'src/routes/health.ts' },
  { from: 'error-handler.ts', to: 'src/middleware/error-handler.ts' },
  { from: 'index.ts', to: 'src/index.ts' },
  { from: 'user.ts', to: 'src/schemas/user.ts' },
  { from: 'song.ts', to: 'src/schemas/song.ts' },
  { from: 'schema.prisma', to: 'prisma/schema.prisma' },
  { from: 'controllers.ts', to: 'src/controllers/.gitkeep' },
  { from: 'services.ts', to: 'src/services/.gitkeep' },
  { from: 'middleware.ts', to: 'src/middleware/.gitkeep' },
  { from: 'routes.ts', to: 'src/routes/.gitkeep' },
];

moves.forEach(({ from, to }) => {
  const fromPath = path.join(__dirname, from);
  const toPath = path.join(__dirname, to);
  if (fs.existsSync(fromPath)) {
    try {
      fs.renameSync(fromPath, toPath);
      console.log(`✓ Moved ${from} to ${to}`);
    } catch (error) {
      console.error(`✗ Failed to move ${from}:`, error instanceof Error ? error.message : error);
    }
  }
});

// Add prettier config
const prettierConfig = {
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  tabWidth: 2,
};

const prettierPath = path.join(__dirname, '.prettierrc.json');
if (!fs.existsSync(prettierPath)) {
  fs.writeFileSync(prettierPath, JSON.stringify(prettierConfig, null, 2));
  console.log('✓ Created .prettierrc.json');
}

console.log('\n✓ Backend structure initialized successfully!');
console.log('\nNext steps:');
console.log('1. Update .env with your database URL');
console.log('2. Run: npm install');
console.log('3. Run: npx prisma generate');
console.log('4. Run: npm run dev');
