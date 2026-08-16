# 📦 DEPLOYMENT GUIDE
## Nginx + CodeIgniter 4 + React + MySQL (Production)

**Updated:** 16 August 2026  
**Target:** Ubuntu Server 22.04 LTS  
**Time to Deploy:** ~45 minutes  
**Difficulty:** Intermediate

---

## 🎯 ARSITEKTUR TARGET

```
┌─────────────────────────────────────────────────────────┐
│                    INTERNET / CLIENTS                    │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTPS (Port 443)
┌──────────────────────────▼──────────────────────────────┐
│                     Nginx (Reverse Proxy)                │
│    ├─ SSL/TLS Termination (Let's Encrypt)               │
│    ├─ Load Balancing                                    │
│    ├─ Gzip Compression                                  │
│    └─ Static File Caching                               │
└─┬──────────────────────────────────────────────────────┘
  │
  ├─────────────────────┬──────────────────────┐
  │                     │                      │
  ▼                     ▼                      ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Frontend    │  │  Backend     │  │   Static     │
│  (React)     │  │  (CI4 API)    │  │   Files      │
│  /var/www/   │  │  /var/www/   │  │   /var/www/  │
│  porto       │  │  api         │  │   static     │
└──────────────┘  └──────┬───────┘  └──────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   PHP-FPM (Port 9000)│
              │   PHP 8.2            │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   MySQL 8.0          │
              │   (Port 3306)        │
              │   Encrypted Backups  │
              └──────────────────────┘
```

---

## 📋 PRE-DEPLOYMENT CHECKLIST

### Server Requirements
- [ ] Ubuntu Server 22.04 LTS
- [ ] 2GB+ RAM (recommended 4GB)
- [ ] 20GB+ SSD storage
- [ ] Internet connection (static IP preferred)
- [ ] Domain name (with DNS control)
- [ ] SSH access with sudo privileges

### Local Requirements
- [ ] React build artifacts ready (dist/)
- [ ] CodeIgniter 4 code + composer.json
- [ ] All environment variables documented
- [ ] Database schema + migrations
- [ ] SSL certificate ready or Let's Encrypt configured

### Code Quality
- [ ] No console errors on production build
- [ ] All tests passing
- [ ] Security audit completed
- [ ] Dependencies updated
- [ ] .env variables in secure location

---

## 🚀 STEP-BY-STEP DEPLOYMENT

### PHASE 1: Server Preparation (10 minutes)

#### 1.1 Update System
```bash
ssh user@your-server.com

sudo apt update
sudo apt upgrade -y
sudo apt autoremove -y

# Verify OS
lsb_release -a
# Output: Ubuntu 22.04.x LTS
```

#### 1.2 Install Essential Tools
```bash
sudo apt install -y curl wget git htop vim nano

# Verify utilities
git --version
curl --version
```

#### 1.3 Setup Firewall
```bash
# Enable UFW (if not already)
sudo ufw enable

# Open necessary ports
sudo ufw allow 22/tcp    # SSH (CRITICAL!)
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3306/tcp  # MySQL (local only, see below)

# Verify firewall status
sudo ufw status numbered
```

#### 1.4 Set Timezone
```bash
sudo timedatectl set-timezone Asia/Jakarta

# Verify
date
```

---

### PHASE 2: Web Server Stack (20 minutes)

#### 2.1 Install Nginx
```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Verify
sudo systemctl status nginx
nginx -v
# Output: nginx version: nginx/1.x.x
```

#### 2.2 Install PHP 8.2 + Extensions
```bash
# Add PHP PPA repository
sudo add-apt-repository ppa:ondrej/php
sudo apt update

# Install PHP 8.2 with required extensions
sudo apt install -y \
  php8.2 \
  php8.2-fpm \
  php8.2-cli \
  php8.2-mysql \
  php8.2-mbstring \
  php8.2-xml \
  php8.2-curl \
  php8.2-zip \
  php8.2-intl \
  php8.2-bcmath \
  php8.2-gd \
  php-composer \
  php8.2-opcache

# Start PHP-FPM
sudo systemctl enable php8.2-fpm
sudo systemctl start php8.2-fpm

# Verify
php8.2 -v
php8.2 -m | grep -E "mbstring|mysql|curl"
```

#### 2.3 Install MySQL 8.0
```bash
sudo apt install -y mysql-server mysql-client

# Secure installation
sudo mysql_secure_installation
# Choose: YES untuk semua pertanyaan (remove test db, disable root remote, etc)

# Verify
sudo systemctl status mysql
mysql --version
```

#### 2.4 Test Web Stack
```bash
# Create test PHP file
echo '<?php phpinfo(); ?>' | sudo tee /var/www/html/info.php > /dev/null

# Visit browser: http://your-ip/info.php
# You should see PHP info page
```

---

### PHASE 3: Frontend Deployment (10 minutes)

#### 3.1 Create Directory Structure
```bash
# Create directories
sudo mkdir -p /var/www/porto
sudo mkdir -p /var/www/static

# Set ownership
sudo chown $USER:$USER /var/www/porto
sudo chown $USER:$USER /var/www/static

# Verify permissions
ls -la /var/www/
```

#### 3.2 Upload React Build
```bash
# From your local machine
rsync -avz --delete dist/ user@your-server:/var/www/porto/

# Verify upload
ssh user@your-server
ls -la /var/www/porto/
# Should show: index.html, assets/, ...
```

#### 3.3 Configure Nginx for Frontend
```bash
# Create Nginx config for frontend
sudo tee /etc/nginx/sites-available/porto.conf > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name porto.domain.com;
    root /var/www/porto;
    index index.html;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_vary on;
    gzip_min_length 1024;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # React SPA routing
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Deny access to sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
EOF

# Enable the config
sudo ln -s /etc/nginx/sites-available/porto.conf /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default  # Remove default site

# Test syntax
sudo nginx -t
# Output: nginx: configuration file test is successful
```

#### 3.4 Enable HTTPS with Let's Encrypt
```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot certonly --standalone -d porto.domain.com

# Update Nginx config to use SSL
sudo tee /etc/nginx/sites-available/porto.conf > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name porto.domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name porto.domain.com;
    root /var/www/porto;
    index index.html;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/porto.domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/porto.domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # HSTS header
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_vary on;
    gzip_min_length 1024;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # React SPA routing
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # Deny access to sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
EOF

# Test and reload
sudo nginx -t
sudo systemctl reload nginx

# Setup auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

#### 3.5 Verify Frontend
```bash
# Reload Nginx
sudo systemctl reload nginx

# Test in browser
# Visit: https://porto.domain.com
# Should see your portfolio (React app)
```

---

### PHASE 4: Backend Deployment (15 minutes)

#### 4.1 Create Directory Structure
```bash
# Create backend directory
sudo mkdir -p /var/www/api
sudo chown $USER:$USER /var/www/api

# Verify
ls -la /var/www/
```

#### 4.2 Upload Backend Code
```bash
# From local machine
rsync -avz --delete backend/ user@your-server:/var/www/api/

# Verify
ssh user@your-server
ls -la /var/www/api/
# Should show: app/, public/, writable/, composer.json, ...
```

#### 4.3 Install PHP Dependencies
```bash
cd /var/www/api

# Install dependencies
composer install --no-dev --optimize-autoloader

# Verify Composer installed successfully
ls -la vendor/
```

#### 4.4 Setup Environment Variables
```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env with your settings
nano .env

# Required .env variables:
# ---
# CI_ENVIRONMENT = production
# database.default.hostname = localhost
# database.default.database = portfolio_db
# database.default.username = portfolio_user
# database.default.password = [STRONG_PASSWORD]
# database.default.port = 3306
# app.baseURL = https://api.domain.com/
# ```
```

#### 4.5 Run Database Migrations
```bash
# Create database & user
sudo mysql -u root -p << EOF
CREATE DATABASE IF NOT EXISTS portfolio_db;
CREATE USER IF NOT EXISTS 'portfolio_user'@'localhost' IDENTIFIED BY 'STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
EOF

# Run migrations
cd /var/www/api
php spark migrate

# Verify (if you have a status table)
php spark db:seed DatabaseSeeder
```

#### 4.6 Setup File Permissions
```bash
cd /var/www/api

# Set writable directory
sudo chown -R www-data:www-data writable/
sudo chmod -R 755 writable/

# Set app permissions
sudo chown -R www-data:www-data app/
sudo chmod -R 755 app/

# Public directory
sudo chown -R www-data:www-data public/
sudo chmod -R 755 public/

# Verify
ls -la | grep writable
ls -la | grep app
```

#### 4.7 Configure Nginx for Backend
```bash
# Create Nginx config for API
sudo tee /etc/nginx/sites-available/api.conf > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name api.domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.domain.com;
    
    root /var/www/api/public;
    index index.php;

    # SSL configuration
    ssl_certificate /etc/letsencrypt/live/api.domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.domain.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # HSTS header
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    
    # CORS headers (adjust origin as needed)
    add_header Access-Control-Allow-Origin "https://porto.domain.com" always;
    add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS" always;
    add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;

    # Gzip compression
    gzip on;
    gzip_types application/json text/plain;
    gzip_min_length 1024;

    # Deny access to sensitive files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }

    # Main application routing
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # PHP-FPM configuration
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
EOF

# Enable the config
sudo ln -s /etc/nginx/sites-available/api.conf /etc/nginx/sites-enabled/

# Test syntax
sudo nginx -t

# Reload
sudo systemctl reload nginx

# Get SSL cert for API domain
sudo certbot certonly --standalone -d api.domain.com

# Update API config with SSL paths
# (Replace certificate paths in config above)
```

#### 4.8 Verify Backend
```bash
# Test API endpoint
curl https://api.domain.com/

# Should return 404 or your CI4 homepage (not an Nginx error page)
# This means PHP-FPM is working!
```

---

### PHASE 5: Database Setup (5 minutes)

#### 5.1 Secure MySQL
```bash
# Already done in Phase 2.3, but double-check:
sudo mysql_secure_installation

# Verify no test database
sudo mysql -u root -p -e "SHOW DATABASES;"
# Should NOT show: test
```

#### 5.2 Create Database & User
```bash
sudo mysql -u root -p << 'EOF'

CREATE DATABASE IF NOT EXISTS portfolio_db;
CREATE USER IF NOT EXISTS 'portfolio_user'@'localhost' IDENTIFIED BY 'YOUR_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_user'@'localhost';
FLUSH PRIVILEGES;

-- Verify
SHOW DATABASES;
SELECT user FROM mysql.user;

EXIT;
EOF
```

#### 5.3 Backup Configuration
```bash
# Create backup directory
sudo mkdir -p /var/backups/mysql

# Create automated backup script
sudo tee /usr/local/bin/backup-mysql.sh > /dev/null <<'EOF'
#!/bin/bash
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_DIR="/var/backups/mysql"
DB_USER="portfolio_user"
DB_PASS="YOUR_STRONG_PASSWORD"
DB_NAME="portfolio_db"

mysqldump -u $DB_USER -p$DB_PASS $DB_NAME | gzip > $BACKUP_DIR/backup_${DATE}.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete
EOF

sudo chmod +x /usr/local/bin/backup-mysql.sh

# Add to crontab (daily at 2 AM)
(sudo crontab -l 2>/dev/null || true; echo "0 2 * * * /usr/local/bin/backup-mysql.sh") | sudo crontab -

# Verify cron job
sudo crontab -l
```

---

### PHASE 6: Final Configuration (5 minutes)

#### 6.1 Configure CI4 for Production
```bash
# Edit /var/www/api/.env
sudo nano /var/www/api/.env

# Set these values:
# CI_ENVIRONMENT = production
# app.forceGlobalSecureRequests = true
# app.CSRFProtection = true
```

#### 6.2 Enable PHP Opcache
```bash
# Edit PHP-FPM config
sudo nano /etc/php/8.2/fpm/conf.d/10-opcache.ini

# Ensure these are set:
opcache.enable=1
opcache.memory_consumption=128
opcache.max_accelerated_files=10000
opcache.revalidate_freq=60

# Restart PHP-FPM
sudo systemctl restart php8.2-fpm
```

#### 6.3 Setup Monitoring
```bash
# Check services status
systemctl status nginx
systemctl status php8.2-fpm
systemctl status mysql

# View logs
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
tail -f /var/log/php8.2-fpm.log
```

#### 6.4 Setup System Monitoring (Optional)
```bash
# Install htop for real-time monitoring
sudo apt install -y htop

# Check resource usage
htop

# Setup email alerts (ssmtp)
sudo apt install -y ssmtp
```

---

## ✅ POST-DEPLOYMENT VERIFICATION

### Check All Services
```bash
# Nginx
sudo systemctl status nginx
sudo nginx -t

# PHP-FPM
sudo systemctl status php8.2-fpm
php8.2 -v

# MySQL
sudo systemctl status mysql
mysql -u portfolio_user -p -e "SHOW DATABASES;"

# UFW Firewall
sudo ufw status

# SSL Certificate
sudo certbot certificates
```

### Test Frontend
```bash
# Visit in browser
https://porto.domain.com

# Check browser console
# Press F12 > Console
# Should see: no errors
```

### Test Backend API
```bash
# Test API endpoint
curl https://api.domain.com/

# Test CORS (from frontend)
curl -H "Origin: https://porto.domain.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS https://api.domain.com/

# Should see CORS headers in response
```

### Test Database Connection
```bash
cd /var/www/api

# Test DB connection from CI4
php spark db:connect

# List tables
php spark db:table portfolio_db
```

### Performance Check
```bash
# Lighthouse audit
# Visit: https://pagespeed.web.dev/
# Paste: https://porto.domain.com

# SSL rating
# Visit: https://www.ssllabs.com/ssltest/
# Paste: https://porto.domain.com

# Expected scores: A+ SSL, 90+ Lighthouse
```

---

## 🔧 MAINTENANCE TASKS

### Daily
```bash
# Monitor error logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/php8.2-fpm.log

# Check disk space
df -h

# Check resource usage
free -m
```

### Weekly
```bash
# Update OS packages
sudo apt update && sudo apt upgrade -y

# Review access logs for suspicious activity
sudo tail -n 100 /var/log/nginx/access.log

# Test database backup
sudo /usr/local/bin/backup-mysql.sh
ls -lah /var/backups/mysql/
```

### Monthly
```bash
# Update PHP extensions
sudo apt upgrade php8.2*

# Update Nginx
sudo apt upgrade nginx

# Renew SSL certificates (automatic, but verify)
sudo certbot renew --dry-run

# Review security settings
sudo ufw status numbered
```

---

## 🐛 TROUBLESHOOTING

### Nginx won't start
```bash
# Check syntax
sudo nginx -t

# View error log
sudo tail -f /var/log/nginx/error.log

# Common issue: port already in use
sudo lsof -i :80
sudo lsof -i :443

# Kill process if needed
sudo kill -9 PID
```

### PHP-FPM connection refused
```bash
# Check if socket exists
ls -la /var/run/php/php8.2-fpm.sock

# Restart PHP-FPM
sudo systemctl restart php8.2-fpm

# Check status
sudo systemctl status php8.2-fpm

# View error log
sudo tail -f /var/log/php8.2-fpm.log
```

### Database connection error
```bash
# Test MySQL connection
sudo mysql -u portfolio_user -p -e "SELECT 1;"

# Check if MySQL is running
sudo systemctl status mysql

# Restart MySQL
sudo systemctl restart mysql

# Verify user permissions
sudo mysql -u root -p
SELECT user, host FROM mysql.user WHERE user='portfolio_user';
```

### SSL certificate renewal fails
```bash
# Check certificate expiry
sudo certbot certificates

# Renew manually
sudo certbot renew

# Check renewal log
sudo tail -f /var/log/letsencrypt/letsencrypt.log

# Manual renewal with debug
sudo certbot renew --force-renewal --dry-run
```

---

## 📊 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] Code tested locally
- [ ] Environment variables documented
- [ ] Database migrations prepared
- [ ] Backups created
- [ ] Domain DNS configured

### Deployment
- [ ] Server prepared and secured
- [ ] Web stack installed
- [ ] Frontend deployed
- [ ] Backend deployed
- [ ] Database setup
- [ ] SSL certificates installed
- [ ] Services verified working

### Post-Deployment
- [ ] Frontend accessible (HTTPS)
- [ ] Backend API accessible (HTTPS)
- [ ] Database connected
- [ ] Email/notifications working
- [ ] Backups running
- [ ] Monitoring setup
- [ ] Performance acceptable

---

## 📝 QUICK REFERENCE

### Essential Commands
```bash
# Nginx
sudo systemctl {start|stop|restart|reload} nginx
sudo nginx -t
sudo tail -f /var/log/nginx/error.log

# PHP-FPM
sudo systemctl {start|stop|restart} php8.2-fpm
sudo tail -f /var/log/php8.2-fpm.log

# MySQL
sudo mysql -u root -p
sudo /usr/local/bin/backup-mysql.sh

# Certificates
sudo certbot certificates
sudo certbot renew

# Monitoring
df -h
free -m
htop
```

---

**Status:** ✅ Production Ready  
**Last Updated:** 16 August 2026  
**Support:** Check logs or refer to official documentation

Next Step: Monitor your production deployment for 24-48 hours before marking as fully deployed.
