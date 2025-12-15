# 🗄️ Database Migration Guide

This guide explains how to migrate your local database to production for the Consulat Général application.

## 📋 Overview

There are several methods to migrate your database from local to production:

1. **Method 1**: PostgreSQL dump/restore (Recommended for PostgreSQL)
2. **Method 2**: JSON export/import scripts (Recommended for complex data)
3. **Method 3**: Prisma migration with seed (For schema only)

## 🚀 Method 1: PostgreSQL Dump/Restore

### Prerequisites
- PostgreSQL installed on both local and production
- Access to both databases
- Network access to production server

### Step 1: Export Local Database
```bash
# Create a complete database dump
pg_dump $LOCAL_DATABASE_URL > local_backup_$(date +%Y%m%d_%H%M%S).sql

# Or with compression (recommended for large databases)
pg_dump $LOCAL_DATABASE_URL | gzip > local_backup_$(date +%Y%m%d_%H%M%S).sql.gz
```

### Step 2: Upload to Production Server
```bash
# Upload the backup file
scp local_backup_*.sql.gz root@54.204.239.244:~/

# Alternative: Upload to a temporary location
rsync -avz local_backup_*.sql.gz root@54.204.239.244:~/database-backups/
```

### Step 3: Import on Production
```bash
# SSH to production server
ssh root@54.204.239.244

# Navigate to backup location
cd ~/

# Decompress if needed
gunzip local_backup_*.sql.gz

# IMPORTANT: Backup existing production data first!
pg_dump $PRODUCTION_DATABASE_URL > production_backup_$(date +%Y%m%d_%H%M%S).sql

# Drop and recreate database (CAUTION: This deletes all existing data)
dropdb consulat_db
createdb consulat_db

# Import the local database
psql $PRODUCTION_DATABASE_URL < local_backup_*.sql

# Verify import
psql $PRODUCTION_DATABASE_URL -c "SELECT COUNT(*) FROM posts;"
```

## 🛠️ Method 2: JSON Export/Import Scripts (Recommended)

### Step 1: Export Local Database
```bash
# Export your local database to JSON
pnpm db:export

# This creates a file in database-exports/ directory
# Example: database-exports/database-export-2025-12-05T15-30-45.json
```

### Step 2: Upload Export File
```bash
# Upload the export file to production
scp database-exports/database-export-*.json root@54.204.239.244:~/
```

### Step 3: Import on Production
```bash
# SSH to production server
ssh root@54.204.239.244

# Navigate to application directory
cd /var/www/html/cgci-newyork.com

# IMPORTANT: Backup existing production data first!
pnpm db:export

# Import the local database
pnpm db:import ~/database-export-*.json

# Restart the application
pm2 restart consulat_app
```

## 🔄 Method 3: Schema Migration + Seed

### For Fresh Production Setup
```bash
# On production server
cd /var/www/html/cgci-newyork.com

# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed with initial data
pnpm db:seed

# If you have custom data, use Method 2 instead
```

## 🛡️ Safety Measures

### Always Backup Production First
```bash
# Create production backup before migration
pg_dump $PRODUCTION_DATABASE_URL > production_backup_$(date +%Y%m%d_%H%M%S).sql

# Or using our export script
pnpm db:export
```

### Verify Migration Success
```bash
# Check record counts
psql $PRODUCTION_DATABASE_URL -c "
SELECT 
  'posts' as table_name, COUNT(*) as count FROM posts
UNION ALL
SELECT 
  'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 
  'categories' as table_name, COUNT(*) as count FROM categories;
"

# Test application functionality
curl https://cgci-newyork.com/api/public/posts

# Check admin login
curl -X POST https://cgci-newyork.com/api/auth/signin
```

## 📊 Migration Checklist

### Pre-Migration
- [ ] Backup production database
- [ ] Verify local database is complete
- [ ] Stop production application traffic (optional)
- [ ] Verify export file integrity

### During Migration
- [ ] Monitor import progress
- [ ] Check for errors in logs
- [ ] Verify foreign key relationships
- [ ] Test critical functionality

### Post-Migration
- [ ] Restart application services
- [ ] Test user authentication
- [ ] Verify article display
- [ ] Test admin dashboard
- [ ] Check file uploads
- [ ] Monitor application logs

## 🐛 Troubleshooting

### Common Issues

#### Import Fails with Foreign Key Errors
```bash
# Disable foreign key checks temporarily
psql $DATABASE_URL -c "SET session_replication_role = replica;"
# Run import
# Re-enable checks
psql $DATABASE_URL -c "SET session_replication_role = DEFAULT;"
```

#### Character Encoding Issues
```bash
# Set UTF-8 encoding during import
psql $DATABASE_URL -c "SET client_encoding = 'UTF8';"
```

#### Permission Errors
```bash
# Grant permissions to database user
psql -c "GRANT ALL PRIVILEGES ON DATABASE consulat_db TO consulat_user;"
psql consulat_db -c "GRANT ALL ON ALL TABLES IN SCHEMA public TO consulat_user;"
```

#### Large Database Performance
```bash
# For large databases, use parallel processing
pg_dump -j 4 $DATABASE_URL > backup.sql  # 4 parallel jobs
```

### Rollback Procedure
If migration fails:

```bash
# Stop application
pm2 stop consulat_app

# Restore from backup
dropdb consulat_db
createdb consulat_db
psql $PRODUCTION_DATABASE_URL < production_backup_*.sql

# Restart application
pm2 start consulat_app

# Verify rollback success
curl https://cgci-newyork.com/api/public/posts
```

## 📝 Environment Variables

Ensure these are set correctly on production:

```bash
# Production database URL
DATABASE_URL="postgresql://username:password@localhost:5432/consulat_db"

# Verify connection
psql $DATABASE_URL -c "SELECT version();"
```

## 🔧 Useful Commands

### Database Information
```bash
# Check database size
psql $DATABASE_URL -c "SELECT pg_size_pretty(pg_database_size(current_database()));"

# List all tables
psql $DATABASE_URL -c "\dt"

# Check specific table counts
psql $DATABASE_URL -c "SELECT schemaname,tablename,n_tup_ins FROM pg_stat_user_tables;"
```

### Connection Testing
```bash
# Test database connection
psql $DATABASE_URL -c "SELECT NOW();"

# Test application database access
cd /var/www/html/cgci-newyork.com
npx prisma db pull
```

### Performance Optimization
```bash
# Analyze tables after import
psql $DATABASE_URL -c "ANALYZE;"

# Reindex for better performance
psql $DATABASE_URL -c "REINDEX DATABASE consulat_db;"
```

## 📞 Support

### Quick Reference
- **Local DB**: Use `pnpm db:export`
- **Production**: `/var/www/html/cgci-newyork.com`
- **Backups**: Store in `~/database-backups/`
- **Logs**: Check PM2 logs with `pm2 logs consulat_app`

### Emergency Contacts
- System Administrator: [Contact Info]
- Database Administrator: [Contact Info]
- Development Team: [Contact Info]

---

**⚠️ Important**: Always test the migration process on a staging environment first before applying to production!

**Last Updated**: December 2025