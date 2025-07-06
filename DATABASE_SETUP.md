# ELAB Solutions - Database Setup Guide

## 🎯 Overview

This guide covers the complete PostgreSQL database setup for ELAB Solutions International, including healthcare compliance features (HIPAA, GDPR) and enterprise-grade security.

## 📋 Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- npm or yarn package manager

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the environment template:
```bash
cp .env.example .env
```

Update `.env` with your database credentials:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/elab_solutions_dev?schema=public"
```

### 3. Database Setup

Generate Prisma client:
```bash
npm run db:generate
```

Create and run migrations:
```bash
npm run db:migrate
```

Seed the database with test data:
```bash
npm run db:seed
```

## 🗄️ Database Schema

### Core Models

- **Users**: Healthcare professionals and applicants
- **Applications**: DataFlow, licensing, and placement applications
- **Documents**: Secure document storage with verification
- **Payments**: Multi-gateway payment processing
- **Workflows**: Application processing workflows
- **Notifications**: Multi-channel notification system
- **Audit Logs**: Compliance and security tracking

### Healthcare Compliance Features

- **HIPAA Compliance**: Audit logging for all data access
- **GDPR Compliance**: Data export and deletion capabilities
- **Encryption**: Sensitive data encryption at rest
- **Access Control**: Role-based permissions system

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with test data |
| `npm run db:reset` | Reset database (⚠️ Destructive) |
| `npm run db:studio` | Open Prisma Studio |

## 🔐 Test Credentials

After seeding, you can use these test accounts:

### Admin Account
- **Email**: admin@elabsolutions.com
- **Password**: admin123!
- **Role**: Super Admin

### Consultant Account
- **Email**: consultant@elabsolutions.com
- **Password**: consultant123!
- **Role**: Consultant

### Applicant Account
- **Email**: nurse.jane@example.com
- **Password**: applicant123!
- **Role**: Applicant

## 🏥 Healthcare Compliance

### HIPAA Compliance
- All database operations are logged for audit trails
- Sensitive data access is monitored and recorded
- User authentication and authorization tracking

### GDPR Compliance
- Data export functionality for user data portability
- Data deletion capabilities for "right to be forgotten"
- Consent tracking and management

### Security Features
- Password hashing with bcrypt
- Session management with secure tokens
- Role-based access control (RBAC)
- Audit logging for all sensitive operations

## 🔧 Database Configuration

### Connection Pooling
```typescript
// Configured in src/lib/database/prisma.ts
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['query', 'info', 'warn', 'error'],
});
```

### Environment Variables
```env
# Database
DATABASE_URL="postgresql://..."
DATABASE_POOL_SIZE=10
DATABASE_TIMEOUT=30000

# Security
JWT_SECRET="your-jwt-secret"
ENCRYPTION_KEY="your-encryption-key"
```

## 📊 Monitoring & Health Checks

### Database Health Check
```typescript
import { checkDatabaseConnection } from './src/lib/database/prisma';

const isHealthy = await checkDatabaseConnection();
```

### Database Statistics
```typescript
import { getDatabaseStats } from './src/lib/database/prisma';

const stats = await getDatabaseStats();
// Returns: { users: 100, applications: 50, documents: 200 }
```

## 🚨 Troubleshooting

### Common Issues

1. **Connection Failed**
   ```bash
   Error: Can't reach database server
   ```
   - Verify PostgreSQL is running
   - Check DATABASE_URL in .env
   - Ensure database exists

2. **Migration Errors**
   ```bash
   Error: Migration failed
   ```
   - Check database permissions
   - Verify schema compatibility
   - Reset database if needed: `npm run db:reset`

3. **Prisma Client Not Found**
   ```bash
   Error: Cannot find module '@prisma/client'
   ```
   - Run: `npm run db:generate`
   - Restart your development server

### Reset Database
⚠️ **Warning**: This will delete all data!

```bash
npm run db:reset
npm run db:seed
```

## 🔄 Migration Workflow

### Creating New Migrations
1. Modify `prisma/schema.prisma`
2. Run `npm run db:migrate`
3. Name your migration descriptively
4. Commit both schema and migration files

### Production Migrations
```bash
# Generate migration without applying
npx prisma migrate diff --preview-feature

# Apply migrations in production
npx prisma migrate deploy
```

## 📈 Performance Optimization

### Indexing Strategy
- Primary keys: Automatic B-tree indexes
- Foreign keys: Automatic indexes for relationships
- Search fields: Composite indexes for common queries
- Timestamps: Indexes for date-based filtering

### Query Optimization
- Use `select` to limit returned fields
- Implement pagination for large datasets
- Use `include` strategically for relations
- Monitor query performance with logging

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit secrets to version control
2. **Database Access**: Use least-privilege principle
3. **Audit Logging**: Monitor all sensitive operations
4. **Data Encryption**: Encrypt sensitive fields at application level
5. **Regular Backups**: Implement automated backup strategy

## 📞 Support

For database-related issues:
1. Check this documentation
2. Review Prisma documentation
3. Check application logs
4. Contact the development team

---

**Last Updated**: July 4, 2025  
**Version**: 1.0.0
