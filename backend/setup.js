#!/usr/bin/env node

/**
 * Complete Backend Setup Script
 * Run this ONCE to initialize your Rhythm backend
 * Usage: npm run setup
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function log(icon, message) {
  console.log(`${icon} ${message}`);
}

function logSection(title) {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`  ${title}`);
  console.log('='.repeat(50) + '\n');
}

async function runCommand(command, description) {
  return new Promise((resolve) => {
    log('⏳', `${description}...`);
    exec(command, { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        log('⚠️ ', `${description} - skipped (may not be available)`);
      } else {
        log('✓', description);
      }
      resolve(!error);
    });
  });
}

async function main() {
  console.clear();
  logSection('🎵 RHYTHM BACKEND SETUP');

  // Step 1: Directory structure
  logSection('Step 1: Creating Directory Structure');

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
      log('✓', `Created ${dir}`);
    } else {
      log('→', `${dir} (already exists)`);
    }
  }

  // Step 2: Move files
  logSection('Step 2: Organizing Source Files');

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
    ['userService.ts', 'src/services/userService.ts'],
    ['userController.ts', 'src/controllers/userController.ts'],
    ['userRoutes.ts', 'src/routes/userRoutes.ts'],
  ];

  let movedCount = 0;
  for (const [from, to] of moves) {
    const fromPath = path.join(__dirname, from);
    const toPath = path.join(__dirname, to);
    
    if (fs.existsSync(fromPath) && !fs.existsSync(toPath)) {
      try {
        fs.renameSync(fromPath, toPath);
        log('✓', `Moved ${from} → ${to}`);
        movedCount++;
      } catch (error) {
        log('→', `${from} (could not move)`);
      }
    } else if (fs.existsSync(toPath)) {
      log('→', `${to} (already exists)`);
    }
  }

  // Step 3: Create .gitkeep files
  logSection('Step 3: Creating Directory Placeholders');

  const placeholderDirs = [
    'src/controllers',
    'src/services',
  ];

  for (const dir of placeholderDirs) {
    const gitkeepPath = path.join(__dirname, dir, '.gitkeep');
    if (!fs.existsSync(gitkeepPath)) {
      fs.writeFileSync(gitkeepPath, '# Add your files here\n');
      log('✓', `Created placeholder for ${dir}`);
    }
  }

  // Step 4: Verify required files
  logSection('Step 4: Verifying Setup');

  const requiredFiles = [
    'src/index.ts',
    'src/config/env.ts',
    'src/utils/logger.ts',
    'src/utils/errors.ts',
    'src/utils/response.ts',
    'src/plugins/database.ts',
    'src/plugins/cors.ts',
    'src/routes/health.ts',
    'src/middleware/error-handler.ts',
    'src/schemas/user.ts',
    'src/schemas/song.ts',
    'src/services/userService.ts',
    'src/controllers/userController.ts',
    'src/routes/userRoutes.ts',
    'prisma/schema.prisma',
    'package.json',
    'tsconfig.json',
    '.env.example',
    'README.md',
    'SETUP.md',
  ];

  let verified = 0;
  for (const file of requiredFiles) {
    const fullPath = path.join(__dirname, file);
    if (fs.existsSync(fullPath)) {
      log('✓', file);
      verified++;
    } else {
      log('✗', `Missing: ${file}`);
    }
  }

  logSection('Setup Summary');
  log('📊', `Files verified: ${verified}/${requiredFiles.length}`);
  log('📁', `Directories created: ${dirs.length}`);
  log('📦', `Files organized: ${movedCount}`);

  logSection('✅ SETUP COMPLETE!');

  console.log('Next steps:\n');
  log('1️⃣ ', 'Update .env with your configuration:');
  console.log('   - DATABASE_URL=postgresql://user:pass@localhost:5432/rhythm_db\n');
  
  log('2️⃣ ', 'Install dependencies:');
  console.log('   npm install\n');
  
  log('3️⃣ ', 'Generate Prisma client:');
  console.log('   npx prisma generate\n');
  
  log('4️⃣ ', 'Create database and run migrations:');
  console.log('   npx prisma migrate dev --name init\n');
  
  log('5️⃣ ', 'Start development server:');
  console.log('   npm run dev\n');
  
  log('📖', 'Read SETUP.md for detailed setup instructions');
  log('📚', 'Read README.md for API documentation\n');

  console.log('🎵 Ready to build amazing music features!\n');
}

main().catch((error) => {
  log('❌', `Setup failed: ${error.message}`);
  process.exit(1);
});
