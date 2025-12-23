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

echo -e "${RED}Assuming you've done first part of deployment of ${APP_NAME}...${NC}"

echo -e "${GREEN}Starting second part of deployment of ${APP_NAME}...${NC}"

echo -e "${GREEN}Installing production dependencies...${NC}"
cd ${SERVER_PATH}
pnpm install --prod --frozen-lockfile

echo -e "${GREEN}Setting up PM2...${NC}"

# Check if app exists in PM2
APP_EXISTS=$(pm2 list | grep -c "${APP_NAME}" || echo 0)

if [ "$APP_EXISTS" -gt 0 ]; then
    echo -e "${YELLOW}Application ${APP_NAME} found in PM2. Reloading it (keeps same ID)...${NC}"
    pm2 reload ${APP_NAME}
    echo -e "${GREEN}${APP_NAME} reloaded successfully with same PM2 ID${NC}"
else
    echo -e "${YELLOW}Application ${APP_NAME} not found in PM2. Starting for first time...${NC}"
    pm2 start ecosystem.config.js
    echo -e "${GREEN}${APP_NAME} started with new PM2 ID${NC}"
fi

echo -e "${GREEN}Starting ${APP_NAME} with ecosystem file...${NC}"
pm2 start ecosystem.config.js

echo -e "${GREEN}Saving PM2 process list (preserving other apps)...${NC}"
pm2 save

echo -e "${GREEN}PM2 setup completed successfully for ${APP_NAME}!${NC}"

echo -e "${GREEN}Current PM2 status:${NC}"
pm2 list

echo -e "${GREEN}Showing logs for ${APP_NAME}...${NC}"
pm2 logs ${APP_NAME} --lines 20

echo -e "${YELLOW}To monitor all apps: pm2 monit${NC}"
echo -e "${YELLOW}To monitor only ${APP_NAME}: pm2 logs ${APP_NAME}${NC}"

echo -e "${GREEN}Cleaning up...${NC}"
rm ~/consulat_app_deploy.tar.gz

echo -e "${GREEN}Deployment complete!${NC}" || { echo -e "${RED}Deployment on server failed${NC}"; exit 1; }