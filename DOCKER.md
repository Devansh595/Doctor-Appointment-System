# Docker Deployment Guide

This guide will help you deploy the CarePulse healthcare application using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed on your system
- Environment variables configured

## Quick Start

### 1. Environment Setup

Copy the example environment file and configure your variables:

```bash
cp env.example .env
```

Edit `.env` file with your actual values:
- Appwrite configuration (database, collections, etc.)
- Twilio credentials (for SMS notifications)
- Sentry configuration (optional)

### 2. Build and Run with Docker Compose

```bash
# Build and start the application
npm run docker:compose:build

# Or using docker-compose directly
docker-compose up -d --build
```

The application will be available at `http://localhost:3000`

### 3. Alternative: Build and Run with Docker

```bash
# Build the Docker image
npm run docker:build

# Run the container
npm run docker:run
```

## Available Scripts

- `npm run docker:build` - Build Docker image
- `npm run docker:run` - Run Docker container
- `npm run docker:compose` - Start with docker-compose
- `npm run docker:compose:build` - Build and start with docker-compose
- `npm run docker:compose:down` - Stop docker-compose services
- `npm run docker:compose:logs` - View logs

## Production Deployment

### With Nginx (Recommended)

For production deployment with nginx reverse proxy:

```bash
# Start with nginx profile
docker-compose --profile production up -d --build
```

This will start:
- Healthcare application on port 3000 (internal)
- Nginx reverse proxy on ports 80 and 443 (external)

### SSL Configuration

To enable HTTPS:

1. Place your SSL certificates in the `ssl/` directory:
   - `ssl/cert.pem` - SSL certificate
   - `ssl/key.pem` - Private key

2. Uncomment the HTTPS server block in `nginx.conf`

3. Update your environment variables to use HTTPS URLs

## Health Checks

The application includes health check endpoints:

- `GET /api/health` - Application health status
- Docker health check configured in docker-compose.yml

## Monitoring

### View Logs

```bash
# View application logs
npm run docker:compose:logs

# View specific service logs
docker-compose logs -f healthcare-app
docker-compose logs -f nginx
```

### Container Status

```bash
# Check running containers
docker-compose ps

# Check container health
docker inspect healthcare-app-healthcare-app-1
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Check what's using port 3000
   netstat -tulpn | grep :3000
   
   # Change port in docker-compose.yml
   ports:
     - "3001:3000"  # Use port 3001 instead
   ```

2. **Environment variables not loaded**
   - Ensure `.env` file exists and contains all required variables
   - Check file permissions: `chmod 644 .env`

3. **Build failures**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

4. **Database connection issues**
   - Verify Appwrite configuration in `.env`
   - Check network connectivity from container

### Performance Optimization

1. **Multi-stage build**: The Dockerfile uses multi-stage builds to minimize image size
2. **Standalone output**: Next.js configured for standalone output
3. **Nginx caching**: Static assets cached for better performance
4. **Rate limiting**: API endpoints protected with rate limiting

## Security Considerations

- Environment variables are loaded from `.env` file
- Nginx includes security headers
- Rate limiting configured for API endpoints
- Non-root user in container
- Health checks for monitoring

## Scaling

To scale the application:

```bash
# Scale the application service
docker-compose up -d --scale healthcare-app=3
```

Note: You may need to configure a load balancer for multiple instances.

## Backup and Recovery

### Backup Application Data

```bash
# Backup environment configuration
cp .env .env.backup

# Export Docker images
docker save healthcare-app:latest > healthcare-app.tar
```

### Recovery

```bash
# Restore environment
cp .env.backup .env

# Import Docker image
docker load < healthcare-app.tar
```

## Maintenance

### Update Application

```bash
# Pull latest changes
git pull

# Rebuild and restart
npm run docker:compose:build
```

### Clean Up

```bash
# Remove unused containers and images
docker system prune -a

# Remove specific images
docker rmi healthcare-app:latest
```
