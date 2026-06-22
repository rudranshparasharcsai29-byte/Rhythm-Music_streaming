// This file will be moved to src/utils/logger.ts
import env from '../config/env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel = LOG_LEVELS[env.LOG_LEVEL as LogLevel];

const colors = {
  reset: '\x1b[0m',
  debug: '\x1b[36m', // cyan
  info: '\x1b[32m',  // green
  warn: '\x1b[33m',  // yellow
  error: '\x1b[31m', // red
};

function log(level: LogLevel, message: string, data?: unknown) {
  if (LOG_LEVELS[level] < currentLevel) {
    return;
  }

  const timestamp = new Date().toISOString();
  const color = colors[level];
  const prefix = `${color}[${timestamp}] [${level.toUpperCase()}]${colors.reset}`;

  if (data) {
    console.log(`${prefix} ${message}`, data);
  } else {
    console.log(`${prefix} ${message}`);
  }
}

export const logger = {
  debug: (message: string, data?: unknown) => log('debug', message, data),
  info: (message: string, data?: unknown) => log('info', message, data),
  warn: (message: string, data?: unknown) => log('warn', message, data),
  error: (message: string, data?: unknown) => log('error', message, data),
};
