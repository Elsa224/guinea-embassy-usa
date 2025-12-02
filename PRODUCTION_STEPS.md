# Production Deployment Steps - Consular Website

## Overview
The Next.js consular website requires several critical steps to be production-ready. Below are the remaining tasks organized by priority.

## 🚨 Critical Steps (Must Complete Today)

### 1. Database Setup (2-3 hours)
- [ ] Provision PostgreSQL database on AWS RDS
- [ ] Configure security groups and access permissions
- [ ] Update DATABASE_URL in production environment
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Create initial admin user

### 2. Security Configuration (1 hour)
- [ ] Generate new NEXTAUTH_SECRET for production
- [ ] Update all authentication environment variables
- [ ] Configure HTTPS/SSL certificates
- [ ] Set production domain in NEXTAUTH_URL

### 3. File Storage Configuration (1 hour)
- [ ] Verify UploadThing configuration for production
- [ ] Set file upload limits and permissions
- [ ] Configure backup strategy for uploaded files

### 4. Deploy Application (1-2 hours)
- [ ] Update all production environment variables
- [ ] Build application: `npm run build`
- [ ] Deploy using PM2: `pm2 start ecosystem.config.js`
- [ ] Configure reverse proxy (Nginx/Apache)
- [ ] Set up domain DNS records

## ⚠️ Important But Can Be Done Post-Launch

### 5. Email Service (Optional - 2 hours)
- [ ] Configure SMTP settings if email functionality needed
- [ ] Test password reset functionality
- [ ] Set up email templates

### 6. Monitoring & Backup (2-3 hours)
- [ ] Set up database automated backups
- [ ] Configure error monitoring
- [ ] Implement performance monitoring
- [ ] Set up alerts for system issues

### 7. Security Hardening (2 hours)
- [ ] Implement rate limiting
- [ ] Add security headers
- [ ] Configure CORS properly
- [ ] Review and restrict API access

## Timeline Estimate
**Minimum for Launch Today: 5-7 hours**
- Database & Security: 3-4 hours
- Deployment: 1-2 hours
- Testing: 1 hour

## Required Resources
1. AWS account with RDS access
2. Domain name configured
3. SSL certificate
4. Server with Node.js 18+ installed
5. PM2 for process management

## Post-Launch Priority
1. Automated backups
2. Monitoring setup
3. Email functionality
4. Additional security measures

## Contact for Issues
- Database issues: DevOps team
- Application bugs: Development team
- Domain/SSL: IT infrastructure team