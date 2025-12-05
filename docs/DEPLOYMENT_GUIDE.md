# 🚀 Deployment Guide - Consulat Général de Côte d'Ivoire

This guide provides comprehensive instructions for deploying the Consulat Général de Côte d'Ivoire website to production.

## 📋 Pre-Deployment Checklist

### 🔧 Environment Requirements

#### Server Requirements
- **Operating System**: Ubuntu 20.04 LTS or newer
- **Node.js**: v18.17.0 or newer
- **Package Manager**: pnpm v8.0.0 or newer
- **Process Manager**: PM2 v5.0.0 or newer
- **Database**: PostgreSQL v13 or newer
- **Memory**: Minimum 2GB RAM (4GB recommended)
- **Storage**: Minimum 10GB available space

#### Domain & SSL
- **Domain**: cgci-newyork.com
- **SSL Certificate**: Required for HTTPS
- **DNS Configuration**: Properly configured A records

### 🔐 Environment Variables

Create a `.env.production` file with the following variables:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/consulat_db"

# Authentication
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="https://cgci-newyork.com"

# Admin Account
ADMIN_EMAIL="admin@consulat-ci.org"
ADMIN_PASSWORD="secure-admin-password"

# File Upload (UploadThing)
UPLOADTHING_SECRET="your-uploadthing-secret"
UPLOADTHING_APP_ID="your-uploadthing-app-id"

# Application Settings
NODE_ENV="production"
PORT="3001"

# Logging
LOG_LEVEL="info"
LOG_FILE_PATH="/var/log/consulat_app"

# Optional: Analytics
GOOGLE_ANALYTICS_ID="GA-XXXXXXXXX"
```

### 📦 Dependencies

Ensure these are installed on your server:

```bash
# Install Node.js via NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install pnpm
npm install -g pnpm@latest

# Install PM2
npm install -g pm2@latest

# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib
```

## 🚢 Deployment Steps

### 1. Database Setup

#### Create PostgreSQL Database
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE consulat_db;
CREATE USER consulat_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE consulat_db TO consulat_user;
\q
```

#### Configure Database Connection
```bash
# Update DATABASE_URL in .env.production
DATABASE_URL="postgresql://consulat_user:secure_password@localhost:5432/consulat_db"
```

### 2. Application Deployment

#### Method 1: Using Deployment Scripts (Recommended)

1. **Run the primary deployment script:**
```bash
./consulat_app_deploy_prod.sh
```

2. **SSH to server and run the secondary script:**
```bash
ssh root@54.204.239.244
./consulat_app_deploy_2_prod.sh
```

#### Method 2: Manual Deployment

1. **Build the application locally:**
```bash
pnpm install
pnpm build
```

2. **Create deployment package:**
```bash
mkdir consulat_app_deploy
cp -r .next public package.json pnpm-lock.yaml consulat_app_deploy/
cp ecosystem.config.js consulat_app_deploy/
cp .env.production consulat_app_deploy/.env
```

3. **Upload to server:**
```bash
tar -czf consulat_app_deploy.tar.gz -C consulat_app_deploy .
scp consulat_app_deploy.tar.gz root@54.204.239.244:~/
```

4. **Deploy on server:**
```bash
ssh root@54.204.239.244
sudo mkdir -p /var/www/html/cgci-newyork.com
sudo tar -xzf consulat_app_deploy.tar.gz -C /var/www/html/cgci-newyork.com
cd /var/www/html/cgci-newyork.com
pnpm install --prod --frozen-lockfile
```

### 3. Database Migration & Seeding

```bash
# Run database migrations
cd /var/www/html/cgci-newyork.com
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Seed the database with initial data
pnpm db:seed
```

### 4. PM2 Process Management

#### Start the Application
```bash
cd /var/www/html/cgci-newyork.com
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Monitor the Application
```bash
# View PM2 status
pm2 list

# View logs
pm2 logs consulat_app

# Monitor in real-time
pm2 monit
```

### 5. Nginx Configuration (Optional)

If using Nginx as a reverse proxy:

```nginx
server {
    listen 80;
    server_name cgci-newyork.com www.cgci-newyork.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name cgci-newyork.com www.cgci-newyork.com;

    ssl_certificate /path/to/ssl/certificate.crt;
    ssl_certificate_key /path/to/ssl/private.key;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📊 Post-Deployment Verification

### 1. Health Checks
- [ ] Application starts without errors
- [ ] Database connection successful
- [ ] Admin login works (`admin@consulat-ci.org`)
- [ ] File upload functionality working
- [ ] PDF articles display correctly
- [ ] SSL certificate valid

### 2. Functional Testing
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Actualités page displays articles from database
- [ ] Admin dashboard accessible
- [ ] Create/edit articles works
- [ ] PDF upload and display works
- [ ] Media gallery functional

### 3. Performance Checks
```bash
# Check PM2 status
pm2 list

# Monitor memory usage
pm2 monit

# View application logs
pm2 logs consulat_app --lines 50

# Check database connection
psql $DATABASE_URL -c "SELECT COUNT(*) FROM posts;"
```

## 🔧 Maintenance Commands

### Application Management
```bash
# Restart application
pm2 restart consulat_app

# View logs
pm2 logs consulat_app

# Flush logs
pm2 flush consulat_app

# Stop application
pm2 stop consulat_app

# Delete from PM2
pm2 delete consulat_app
```

### Database Maintenance
```bash
# Backup database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore database
psql $DATABASE_URL < backup_file.sql

# Check database size
psql $DATABASE_URL -c "SELECT pg_size_pretty(pg_database_size('consulat_db'));"
```

### Log Management
```bash
# View application logs
tail -f /var/log/consulat_app/out.log

# View error logs
tail -f /var/log/consulat_app/error.log

# Rotate logs
pm2 install pm2-logrotate
```

## 🚨 Troubleshooting

### Common Issues

#### Application Won't Start
1. Check Node.js version: `node --version`
2. Verify dependencies: `pnpm install`
3. Check environment variables in `.env`
4. Review PM2 logs: `pm2 logs consulat_app`

#### Database Connection Issues
1. Verify PostgreSQL is running: `systemctl status postgresql`
2. Test connection: `psql $DATABASE_URL`
3. Check firewall settings
4. Verify DATABASE_URL format

#### File Upload Problems
1. Check UploadThing credentials
2. Verify file permissions
3. Test media upload in admin dashboard
4. Check server disk space: `df -h`

#### SSL Certificate Issues
1. Verify certificate validity
2. Check Nginx configuration
3. Test HTTPS connection
4. Review SSL logs

### Performance Optimization

#### Memory Management
```javascript
// ecosystem.config.js
{
  max_memory_restart: "512M",
  node_args: "--max-old-space-size=512"
}
```

#### Database Optimization
```sql
-- Create indexes for better performance
CREATE INDEX idx_posts_published ON posts(status, "publishedAt");
CREATE INDEX idx_posts_featured ON posts(featured);
CREATE INDEX idx_posts_type ON posts(type);
```

## 📞 Support

### Server Information
- **IP Address**: 54.204.239.244
- **SSH User**: root
- **Application Path**: `/var/www/html/cgci-newyork.com`
- **Log Path**: `/var/log/consulat_app/`

### Contacts
- **System Admin**: [Contact Information]
- **Technical Support**: [Contact Information]
- **Emergency Contact**: [Contact Information]

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs)

---

## 🔄 Deployment Checklist Summary

- [ ] Server requirements met
- [ ] Environment variables configured
- [ ] Database created and configured
- [ ] Application built and uploaded
- [ ] Dependencies installed
- [ ] Database migrated and seeded
- [ ] PM2 configured and running
- [ ] SSL certificate installed
- [ ] Health checks passed
- [ ] Performance optimized
- [ ] Monitoring setup
- [ ] Backup strategy implemented

**Last Updated**: December 2025
**Version**: 1.0