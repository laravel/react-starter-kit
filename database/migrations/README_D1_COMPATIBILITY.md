# D1 Database Compatibility Guide

This project is now compatible with MySQL, SQLite, and Cloudflare D1 Database.

## Database Configuration

### Environment Setup
The environment variables for each database system are included in the `.env.example` file:

```
# SQLite configuration (default)
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

# MySQL configuration
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=

# D1 Database (Cloudflare) configuration
# DB_CONNECTION=d1
# D1_DATABASE_ID=your-database-id
# D1_API_TOKEN=your-api-token
# D1_ACCOUNT_ID=your-account-id
```

### Migration Compatibility 

All database migrations have been designed to be compatible with MySQL, SQLite, and D1 Database. The key considerations for compatibility are:

1. **Foreign keys**: D1 has limited support for foreign key constraints
2. **Data types**: Using common data types supported across all platforms
3. **Index types**: Using simple indexes that are supported across all platforms

## How It Works

### D1 Connection

A custom D1 connection driver has been implemented that:

1. Uses SQLite in-memory database for local development
2. Uses D1 API for production environments
3. Handles query preparation and execution via the Cloudflare D1 API

### Database Switching

To switch between database systems:

1. Update the `DB_CONNECTION` value in your `.env` file
2. Make sure the relevant database credentials are configured
3. Run migrations as usual

## Local Development

For local development with D1:
- The driver uses SQLite in-memory mode
- No special configuration is needed

## Production Deployment

For production deployment with D1:
1. Configure your Cloudflare D1 database
2. Add the D1 environment variables to your hosting environment
3. Deploy your application

## Testing

When testing with D1, the driver automatically falls back to SQLite in-memory mode, ensuring your tests run quickly without requiring external services.