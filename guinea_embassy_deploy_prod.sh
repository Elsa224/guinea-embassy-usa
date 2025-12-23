#!/bin/bash
set -e

# Configuration
APP_NAME="cgci-newyork.com"
SERVER_IP="54.204.239.244"
SERVER_USER="root"
SERVER_PATH="/var/www/html/${APP_NAME}"
LOCAL_BUILD_DIR=".next"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting first part of deployment of ${APP_NAME}...${NC}"

# Build the application locally
echo -e "${GREEN}Building application...${NC}"
pnpm build

# Create a temporary deployment package
echo -e "${GREEN}Creating deployment package...${NC}"
mkdir -p consulat_app_deploy
cp -r ${LOCAL_BUILD_DIR} consulat_app_deploy/
cp -r public consulat_app_deploy/
cp -r prisma consulat_app_deploy/
cp package.json pnpm-lock.yaml next.config.ts consulat_app_deploy/
# cp -r messages consulat_app_deploy/
# cp middleware.ts consulat_app_deploy/
cp ecosystem.config.js consulat_app_deploy/

# Create .env.production file for deployment
cp .env consulat_app_deploy/ || echo "# Production Environment" > consulat_app_deploy/.env

# Create a deployment archive
echo -e "${GREEN}Creating deployment archive...${NC}"
tar -czf consulat_app_deploy.tar.gz -C consulat_app_deploy .

# Upload to server
echo -e "${GREEN}Uploading to server...${NC}"
scp consulat_app_deploy.tar.gz ${SERVER_USER}@${SERVER_IP}:~/ || { echo -e "${RED}Upload failed${NC}"; exit 1; }

# Execute deployment commands on the server
echo -e "${GREEN}Deploying on server...${NC}"
ssh -t ${SERVER_USER}@${SERVER_IP} "
  set -e
  echo -e '${GREEN}Creating backup of current version...${NC}'
  if [ -d ${SERVER_PATH} ]; then
    timestamp=\$(date +%Y_%m_%d_%H_%M_%S)
    sudo mkdir -p ${SERVER_PATH}_backups
    sudo tar -czf ${SERVER_PATH}_backups/backup_\${timestamp}.tar.gz -C ${SERVER_PATH} . || echo -e '${RED}Backup failed, but continuing...${NC}'
  fi
  
  echo -e '${GREEN}Extracting the uploaded archive...${NC}'
  sudo mkdir -p ${SERVER_PATH}
  sudo tar -xzf ~/consulat_app_deploy.tar.gz -C ${SERVER_PATH}
  
  echo -e '${GREEN}Setting permissions...${NC}'
  sudo chown -R ${SERVER_USER}:${SERVER_USER} ${SERVER_PATH}
  
  echo -e '${GREEN}Creating log directory...${NC}'
  sudo mkdir -p /var/log/agri_cantine
  sudo chown ${SERVER_USER}:${SERVER_USER} /var/log/agri_cantine
"

# Upload server deployment script
echo -e "${BLUE}📋 Uploading server deployment script...${NC}"
scp consulat_app_deploy_2_prod.sh ${SERVER_USER}@${SERVER_IP}:~/ || { echo -e "${RED}❌ Server script upload failed${NC}"; exit 1; }

# Clean up local deployment files
echo -e "${GREEN}Cleaning up local deployment files...${NC}"
rm -rf consulat_app_deploy consulat_app_deploy.tar.gz

echo -e "${GREEN}First step of deployment complete ! ${NC}"