# Rhythm Backend - Setup Guide

## Quick Start

### 1. Initialize Backend Structure
```bash
cd backend
node verify-setup.js
```

This will:
- ✓ Create the complete directory structure
- ✓ Organize all source files
- ✓ Verify all files are in place

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Database
Edit `.env` file:
```env
# PostgreSQL connection
DATABASE_URL=postgresql://username:password@localhost:5432/rhythm_db

# Optional: Adjust other settings
PORT=3000
LOG_LEVEL=debug
```

### 4. Setup Prisma
```bash
# Generate Prisma client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init
```

### 5. Start Development Server
```bash
npm run dev
```

Server will run at `http://localhost:3000`

## Project Structure After Setup

```
backend/
├── src/
│   ├── config/
│   │   └── env.ts                 # Environment validation (Zod)
│   ├── routes/
│   │   └── health.ts              # Health check endpoints
│   ├── controllers/               # Request handlers (add your own)
│   ├── services/                  # Business logic (add your own)
│   ├── middleware/
│   │   └── error-handler.ts       # Global error handling
│   ├── plugins/
│   │   ├── database.ts            # Prisma client connection
│   │   └── cors.ts                # CORS configuration
│   ├── schemas/
│   │   ├── user.ts                # User validation schemas
│   │   └── song.ts                # Song validation schemas
│   ├── utils/
│   │   ├── logger.ts              # Structured logging
│   │   ├── errors.ts              # Custom error classes
│   │   └── response.ts            # API response helpers
│   └── index.ts                   # Server entry point
├── prisma/
│   └── schema.prisma              # Database schema
├── dist/                          # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
├── .env                           # Your local settings (gitignored)
├── .env.example                   # Template for .env
└── README.md
```

## Available Scripts

```bash
# Development
npm run dev                 # Start with hot reload (tsx watch)

# Building
npm run build              # Compile TypeScript to JavaScript
npm run type-check         # Check TypeScript types

# Code Quality
npm run format             # Format code with Prettier

# Database
npm run prisma:generate    # Generate Prisma client
npm run prisma:migrate     # Run migrations interactively
npm run prisma:studio      # Open Prisma Studio (visual DB editor)

# Production
npm start                  # Run compiled JavaScript
```

## API Endpoints

### Health Checks
```bash
GET /                    # Server info
GET /health             # Health status
```

### Response Format
All endpoints return standardized responses:

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": { ... }
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Database Schema

The included schema has models for:

- **User** - User accounts with profile info
- **Song** - Music tracks with metadata
- **Playlist** - Collections of songs
- **PlaylistSong** - Songs in playlists (junction table)
- **LikedSong** - User's liked songs (junction table)
- **UserFollow** - User follow relationships (junction table)

View `prisma/schema.prisma` for complete schema definition.

## Adding Your First Route

### Example: User Endpoints

1. **Create a controller** (`src/controllers/userController.ts`):
```typescript
import { FastifyRequest, FastifyReply } from 'fastify';
import { successResponse } from '../utils/response';

export class UserController {
  static async getUsers(request: FastifyRequest, reply: FastifyReply) {
    const users = await request.server.prisma.user.findMany({
      select: { id: true, name: true, email: true }
    });
    return successResponse(users);
  }
}
```

2. **Create a route** (`src/routes/userRoutes.ts`):
```typescript
import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/userController';

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get('/users', UserController.getUsers);
}
```

3. **Register in `src/index.ts`**:
```typescript
import { userRoutes } from './routes/userRoutes';

// After healthRoute registration:
await userRoutes(fastify);
```

## Database Queries with Prisma

```typescript
// In your service or controller
const user = await fastify.prisma.user.findUnique({
  where: { id: 'user-id' },
  include: { playlists: true, likedSongs: { include: { song: true } } }
});
```

## Error Handling

Custom error classes are available:

```typescript
import { NotFoundError, ValidationError } from '../utils/errors';

// Usage
if (!user) {
  throw new NotFoundError('User');  // Returns 404
}

throw new ValidationError('Invalid email', { field: 'email' });  // Returns 400
```

Errors are automatically caught and formatted by the error handler middleware.

## Validation with Zod

```typescript
import { userSignUpSchema } from '../schemas/user';

fastify.post('/auth/signup', async (request, reply) => {
  const data = userSignUpSchema.parse(request.body);
  // Errors throw ValidationError automatically via error handler
  
  const user = await fastify.prisma.user.create({ data });
  return successResponse(user);
});
```

## Logging

```typescript
import { logger } from '../utils/logger';

logger.debug('Debug info', { userId: 123 });
logger.info('User created', { userId: 123 });
logger.warn('Rate limit approaching');
logger.error('Database connection failed', error);
```

Log level controlled by `LOG_LEVEL` env var (debug, info, warn, error).

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | development | Environment (development, production, test) |
| `PORT` | 3000 | Server port |
| `DATABASE_URL` | ❌ Required | PostgreSQL connection string |
| `LOG_LEVEL` | info | Logging level |
| `CORS_ORIGIN` | * | Allowed origins (comma-separated) |

## Troubleshooting

### "Cannot find module '@prisma/client'"
```bash
npm install
npx prisma generate
```

### TypeScript errors
```bash
npm run type-check
npm install --save-dev typescript @types/node
```

### Port 3000 already in use
Edit `.env`: `PORT=3001` then restart

### Database connection error
- Verify PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Test connection: `psql postgresql://...`

### Prisma client out of sync
```bash
npx prisma generate
npx prisma db push
```

## Production Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Set environment variables**
   ```bash
   export NODE_ENV=production
   export DATABASE_URL=production_url
   ```

3. **Run migrations**
   ```bash
   npx prisma migrate deploy
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## Performance Best Practices

- Use Prisma `select` to fetch only needed fields
- Add database indexes on frequently queried columns
- Implement caching for read-heavy operations
- Use connection pooling (included with Prisma)
- Monitor query performance with Prisma Studio
- Set appropriate `LOG_LEVEL` (warn/error in production)

## Security Checklist

- [ ] All inputs validated with Zod schemas
- [ ] Error messages don't leak sensitive data
- [ ] Database credentials in `.env` (not committed)
- [ ] HTTPS enabled in production
- [ ] CORS_ORIGIN restricted to trusted domains
- [ ] Rate limiting implemented
- [ ] Authentication/authorization added
- [ ] SQL injection prevention (Prisma handles this)
- [ ] Dependencies regularly updated

## Next Steps

1. ✅ Backend structure created
2. ⬜ Add authentication module
3. ⬜ Add user registration/login
4. ⬜ Add music upload functionality
5. ⬜ Add playlist management
6. ⬜ Add search and filtering
7. ⬜ Setup testing (Jest)
8. ⬜ Add API documentation (Swagger)
9. ⬜ Setup CI/CD pipeline

## Support & Resources

- [Fastify Documentation](https://www.fastify.io/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---

**Happy coding! 🎵**
