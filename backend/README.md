# Rhythm Backend

A production-ready music streaming backend built with Fastify, TypeScript, Prisma, and PostgreSQL.

## Features

- ✅ Type-safe TypeScript configuration
- ✅ Fastify for high-performance API
- ✅ Prisma ORM for database management
- ✅ PostgreSQL as primary database
- ✅ Zod for schema validation
- ✅ Centralized error handling
- ✅ Health check endpoints
- ✅ CORS support
- ✅ Environment variable validation
- ✅ Structured logging
- ✅ Plugin-based architecture
- ✅ Graceful shutdown handling

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration files
│   │   └── env.ts       # Environment variable validation
│   ├── routes/          # API routes
│   │   └── health.ts   # Health check routes
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── middleware/      # Middleware
│   │   └── error-handler.ts
│   ├── plugins/         # Fastify plugins
│   │   ├── database.ts  # Prisma connection
│   │   └── cors.ts      # CORS configuration
│   ├── schemas/         # Zod validation schemas
│   │   ├── user.ts
│   │   └── song.ts
│   ├── utils/           # Utility functions
│   │   ├── logger.ts
│   │   ├── errors.ts
│   │   └── response.ts
│   └── index.ts         # Application entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── dist/                # Compiled JavaScript (generated)
├── .env                 # Environment variables (gitignored)
├── .env.example         # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. **Setup directory structure:**
   ```bash
   npm run setup
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and settings
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Setup Prisma:**
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

## Environment Variables

```env
NODE_ENV=development              # Environment: development, production, test
PORT=3000                         # Server port
DATABASE_URL=postgresql://...     # PostgreSQL connection string
LOG_LEVEL=debug                   # Log level: debug, info, warn, error
CORS_ORIGIN=http://localhost:3000 # CORS allowed origins (comma-separated)
```

## Scripts

```bash
# Development with hot reload
npm run dev

# Build TypeScript
npm run build

# Production start
npm start

# Format code with Prettier
npm run format

# Type checking
npm run type-check

# Database scripts
npm run prisma:migrate          # Run migrations
npm run prisma:studio           # Open Prisma Studio
npm run prisma:generate         # Generate Prisma client
```

## API Endpoints

### Health Check
- `GET /health` - Health check endpoint
- `GET /` - Server info and status

All responses follow the standard format:
```json
{
  "success": true,
  "data": {...},
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

Error responses:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {...}
  },
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Error Handling

Custom error classes available:
- `AppError` - Base error class
- `ValidationError` - 400 Bad Request
- `NotFoundError` - 404 Not Found
- `UnauthorizedError` - 401 Unauthorized
- `ForbiddenError` - 403 Forbidden
- `ConflictError` - 409 Conflict

## Database Schema

### Models
- **User** - User accounts
- **Song** - Music tracks
- **Playlist** - User playlists
- **PlaylistSong** - Playlist contents
- **LikedSong** - User liked songs
- **UserFollow** - User follows

## Plugin Architecture

The application uses Fastify's plugin system for clean separation of concerns:

```typescript
// Example: Custom plugin
export default fp(async (fastify) => {
  // Plugin registration logic
}, { name: 'plugin-name' });
```

Registered plugins:
- CORS - Cross-Origin Resource Sharing
- Database - Prisma client connection

## Validation

Use Zod schemas for request validation:

```typescript
import { userSignUpSchema } from '@schemas/user';

fastify.post('/auth/signup', async (request, reply) => {
  const data = userSignUpSchema.parse(request.body);
  // Handle registration
});
```

## Logging

Structured logging with color output:

```typescript
import { logger } from '@utils/logger';

logger.debug('Debug message', { data: 'value' });
logger.info('Info message');
logger.warn('Warning message');
logger.error('Error message', error);
```

## Development

### Adding a New Route

1. Create route file in `src/routes/`
2. Export async function that registers routes
3. Register in `src/index.ts`

```typescript
export async function usersRoute(fastify: FastifyInstance) {
  fastify.get('/users', async (request, reply) => {
    const users = await fastify.prisma.user.findMany();
    return successResponse(users);
  });
}
```

### Adding a Service

Create business logic in `src/services/`:

```typescript
export class UserService {
  constructor(private prisma: PrismaClient) {}

  async getUserById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
```

### Adding a Controller

Create request handlers in `src/controllers/`:

```typescript
export class UserController {
  constructor(private userService: UserService) {}

  async getUser(request: FastifyRequest, reply: FastifyReply) {
    const user = await this.userService.getUserById(request.params.id);
    return successResponse(user);
  }
}
```

## Testing Endpoints

### Health Check
```bash
curl http://localhost:3000/health
```

### Root
```bash
curl http://localhost:3000/
```

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables

3. Run migrations:
   ```bash
   npx prisma migrate deploy
   ```

4. Start the server:
   ```bash
   npm start
   ```

## Performance Tips

- Use Prisma's `select` and `include` for optimal queries
- Implement caching for frequently accessed data
- Use connection pooling for database connections
- Enable gzip compression in Fastify
- Monitor memory and CPU usage
- Use database indexes on frequently queried fields

## Security Considerations

- Validate all inputs with Zod schemas
- Use environment variables for sensitive data
- Implement authentication and authorization
- Use HTTPS in production
- Enable CORS only for trusted origins
- Sanitize error messages in production
- Keep dependencies updated

## Troubleshooting

### Database Connection Error
- Check `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Verify credentials and permissions

### Port Already in Use
- Change `PORT` in `.env`
- Or kill the process using the port

### Prisma Client Not Generated
- Run: `npx prisma generate`
- Ensure `schema.prisma` is valid

### TypeScript Errors
- Run: `npm run type-check`
- Ensure all dependencies are installed

## License

MIT

## Support

For issues, feature requests, or questions, please open an issue in the repository.
