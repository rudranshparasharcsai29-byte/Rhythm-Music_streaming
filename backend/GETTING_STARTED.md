# 🎵 Rhythm Backend - Setup Complete!

## Summary

Your production-ready Rhythm backend has been successfully initialized with:

✅ **Framework:** Fastify (high-performance Node.js)
✅ **Language:** TypeScript (strict type safety)
✅ **Database:** PostgreSQL + Prisma ORM
✅ **Validation:** Zod schemas
✅ **Configuration:** Type-safe environment variables
✅ **Error Handling:** Centralized error middleware
✅ **Logging:** Structured logging utility
✅ **Architecture:** Layered (routes → controllers → services → data)
✅ **Plugins:** Modular plugin system (CORS, Database)

## What's Included

### Core Files
- `src/index.ts` - Fastify server setup with plugin registration
- `src/config/env.ts` - Type-safe environment configuration
- `src/middleware/error-handler.ts` - Global error handling

### Utilities
- `src/utils/logger.ts` - Color-coded structured logging
- `src/utils/errors.ts` - Custom error classes
- `src/utils/response.ts` - Standardized API response format

### Plugins
- `src/plugins/database.ts` - Prisma client with connection pooling
- `src/plugins/cors.ts` - CORS configuration

### Routes
- `src/routes/health.ts` - Health check and server info endpoints
- `src/routes/userRoutes.ts` - Example user CRUD routes (ready to use)

### Examples
- `src/controllers/userController.ts` - Example controller (CRUD operations)
- `src/services/userService.ts` - Example service (business logic)
- `src/schemas/user.ts` - Example Zod validation schemas
- `src/schemas/song.ts` - Song validation schemas

### Configuration
- `prisma/schema.prisma` - Complete database schema (User, Song, Playlist, etc.)
- `package.json` - All dependencies and npm scripts
- `tsconfig.json` - TypeScript configuration with path aliases
- `.env.example` - Environment template
- `README.md` - API documentation
- `SETUP.md` - Detailed setup guide

## Quick Start (5 minutes)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Database
```bash
# Edit .env with your PostgreSQL URL
# Example: postgresql://user:password@localhost:5432/rhythm_db

# Generate Prisma client
npx prisma generate

# Create tables and run migrations
npx prisma migrate dev --name init
```

### 3. Start Development Server
```bash
npm run dev
```

Server runs at `http://localhost:3000`

### 4. Test Health Endpoint
```bash
curl http://localhost:3000/health
```

## Available Scripts

```bash
npm run setup           # Initialize backend structure (done once)
npm run dev           # Start with hot reload
npm run build         # Compile TypeScript
npm start             # Run production build
npm run format        # Format code with Prettier
npm run type-check    # Check TypeScript types
npm run prisma:migrate # Interactive database migrations
npm run prisma:studio # Visual database editor
npm run prisma:generate # Generate Prisma client
```

## Project Structure

```
backend/
├── src/
│   ├── config/env.ts              ← Environment setup
│   ├── middleware/error-handler.ts ← Error handling
│   ├── plugins/                    ← Database, CORS
│   ├── utils/                      ← Logger, errors, responses
│   ├── routes/                     ← API endpoints
│   ├── controllers/                ← Request handlers
│   ├── services/                   ← Business logic
│   ├── schemas/                    ← Zod validation
│   └── index.ts                    ← Server entry point
├── prisma/schema.prisma            ← Database schema
├── dist/                           ← Compiled JS (generated)
├── package.json
├── tsconfig.json
├── .env                           ← Your configuration (gitignored)
└── .env.example                   ← Configuration template
```

## Database Schema Included

Models pre-configured in `prisma/schema.prisma`:
- **User** - User accounts with profiles
- **Song** - Music tracks and metadata
- **Playlist** - User playlists
- **PlaylistSong** - Songs in playlists
- **LikedSong** - User liked songs
- **UserFollow** - User follow relationships

All with proper relationships and constraints.

## Example: Using User Routes

The backend includes fully functional user CRUD routes as examples:

```bash
# Get all users
curl http://localhost:3000/users

# Get specific user
curl http://localhost:3000/users/{id}

# Create user (JSON)
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","name":"User","password":"password123"}'

# Update user
curl -X PUT http://localhost:3000/users/{id} \
  -H "Content-Type: application/json" \
  -d '{"name":"New Name","bio":"My bio"}'

# Delete user
curl -X DELETE http://localhost:3000/users/{id}
```

## API Response Format

All endpoints return standardized responses:

**Success (200):**
```json
{
  "success": true,
  "data": { "id": "123", "name": "John" },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

**Error (4xx/5xx):**
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "User not found",
    "details": null
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Adding New Features

### Add a Route
1. Create `src/routes/featureRoutes.ts`
2. Import and register in `src/index.ts`
3. Use example user routes as template

### Add a Service
1. Create `src/services/featureService.ts`
2. Extend with database queries using `this.prisma`
3. Follow UserService pattern

### Add Validation
1. Create `src/schemas/featureSchema.ts`
2. Define Zod schemas
3. Use in controllers: `schema.parse(data)`

## Configuration

Edit `.env` with your settings:

```env
# Server
NODE_ENV=development              # environment
PORT=3000                         # server port
LOG_LEVEL=debug                   # debug|info|warn|error

# Database (required)
DATABASE_URL=postgresql://...     # PostgreSQL connection

# CORS
CORS_ORIGIN=*                     # allowed origins (comma-separated)
```

## Performance Features

- ✅ Connection pooling (Prisma)
- ✅ Efficient query building
- ✅ Type-safe database operations
- ✅ Async/await throughout
- ✅ Error handling (no crashes)
- ✅ Structured logging (debug mode available)

## Security Features

- ✅ Input validation (Zod)
- ✅ Type safety (TypeScript strict)
- ✅ Environment validation
- ✅ SQL injection prevention (Prisma)
- ✅ Error message control
- ✅ CORS support
- ✅ Graceful error responses

## Next Steps

1. **Setup Database:** Update `.env` and run Prisma migrations
2. **Start Server:** `npm run dev`
3. **Test API:** Use curl or Postman
4. **Add Features:** Follow included examples
5. **Deploy:** Build with `npm run build`, set env vars, run `npm start`

## Troubleshooting

### "Cannot find module" errors
```bash
npm install
npx prisma generate
```

### TypeScript errors
```bash
npm run type-check
```

### Port already in use
Change `PORT` in `.env`

### Database connection failed
- Verify PostgreSQL is running
- Check `DATABASE_URL` format
- Test: `psql postgresql://...`

## Commands Cheat Sheet

```bash
# Setup
npm install
npx prisma generate
npx prisma migrate dev --name init

# Development
npm run dev              # Start dev server
npm run type-check       # Check types
npm run format           # Format code

# Database
npx prisma studio       # Visual DB editor
npx prisma migrate dev  # Create migration
npx prisma db push      # Push schema changes

# Production
npm run build            # Compile TypeScript
npm start                # Run production

# Debugging
npm run dev             # Server with hot reload
LOG_LEVEL=debug npm start # Production with debug logs
```

## Resources

- [Fastify Docs](https://www.fastify.io/)
- [Prisma Docs](https://www.prisma.io/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Docs](https://zod.dev/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)

## Support

If you encounter issues:

1. Check logs: `npm run dev` (shows all output)
2. Read SETUP.md for detailed instructions
3. Read README.md for API reference
4. Check .env configuration

---

**Your backend is ready! Start building amazing features! 🎵**

For detailed information, see:
- **SETUP.md** - Complete setup and development guide
- **README.md** - API documentation and examples
