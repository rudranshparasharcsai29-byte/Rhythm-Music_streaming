#!/usr/bin/env node

/**
 * Setup and verification script for Rhythm Backend
 * This script will:
 * 1. Create directory structure
 * 2. Move files to their final locations
 * 3. Verify all files are in place
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🎵 Rhythm Backend Setup\n');

// Step 1: Create directory structure
console.log('📁 Creating directory structure...');
const dirs = [
  'src',
  'src/config',
  'src/routes',
  'src/controllers',
  'src/services',
  'src/middleware',
  'src/schemas',
  'src/utils',
  'src/plugins',
  'prisma',
  'dist',
];

for (const dir of dirs) {
  const fullPath = path.join(__dirname, dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
}
console.log('✓ Directory structure created');

// Step 2: Move files to final locations
console.log('\n📦 Organizing files...');
const moves = [
  ['env.ts', 'src/config/env.ts'],
  ['logger.ts', 'src/utils/logger.ts'],
  ['errors.ts', 'src/utils/errors.ts'],
  ['response.ts', 'src/utils/response.ts'],
  ['database.ts', 'src/plugins/database.ts'],
  ['cors.ts', 'src/plugins/cors.ts'],
  ['health.ts', 'src/routes/health.ts'],
  ['error-handler.ts', 'src/middleware/error-handler.ts'],
  ['index.ts', 'src/index.ts'],
  ['user.ts', 'src/schemas/user.ts'],
  ['song.ts', 'src/schemas/song.ts'],
  ['schema.prisma', 'prisma/schema.prisma'],
];

let moveCount = 0;
for (const [from, to] of moves) {
  const fromPath = path.join(__dirname, from);
  const toPath = path.join(__dirname, to);
  if (fs.existsSync(fromPath)) {
    try {
      fs.renameSync(fromPath, toPath);
      moveCount++;
    } catch (error) {
      console.warn(`⚠ Could not move ${from}`);
    }
  }
}
console.log(`✓ Organized ${moveCount} files`);

// Step 3: Create .gitkeep files for empty directories
console.log('\n🔒 Creating directory placeholders...');
const gitkeepDirs = [
  'src/controllers',
  'src/services',
  'src/routes',
  'src/middleware',
];

for (const dir of gitkeepDirs) {
  const gitkeepPath = path.join(__dirname, dir, '.gitkeep');
  if (!fs.existsSync(gitkeepPath)) {
    fs.writeFileSync(gitkeepPath, '');
  }
}
console.log('✓ Placeholder files created');

// Step 4: Verify structure
console.log('\n✅ Verifying setup...');
const requiredFiles = [
  'src/config/env.ts',
  'src/utils/logger.ts',
  'src/utils/errors.ts',
  'src/utils/response.ts',
  'src/plugins/database.ts',
  'src/plugins/cors.ts',
  'src/routes/health.ts',
  'src/middleware/error-handler.ts',
  'src/index.ts',
  'src/schemas/user.ts',
  'src/schemas/song.ts',
  'prisma/schema.prisma',
  'package.json',
  'tsconfig.json',
  '.env.example',
  'README.md',
];

let verified = 0;
for (const file of requiredFiles) {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    verified++;
  } else {
    console.warn(`⚠ Missing: ${file}`);
  }
}

console.log(`✓ ${verified}/${requiredFiles.length} files verified\n`);

// Step 5: Show next steps
console.log('🚀 Setup Complete!\n');
console.log('📋 Next Steps:');
console.log('1. cd backend');
console.log('2. Update .env with your database URL');
console.log('3. npm install');
console.log('4. npx prisma generate');
console.log('5. npx prisma migrate dev --name init');
console.log('6. npm run dev\n');

console.log('📚 Documentation: See README.md for complete setup guide');
