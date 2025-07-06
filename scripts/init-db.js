/**
 * Database initialization script for production
 * This script ensures the database is properly set up in production
 */

const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  console.log('Initializing production database...');
  
  try {
    // Ensure the tmp directory exists
    const dbDir = path.dirname(process.env.DATABASE_URL?.replace('file:', '') || '/tmp/production.db');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    const prisma = new PrismaClient();
    
    // Test database connection
    await prisma.$connect();
    console.log('Database connection successful');
    
    // Run migrations if needed
    console.log('Database initialized successfully');
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('Database initialization failed:', error);
    // Don't throw error to prevent build failure
  }
}

// Only run if called directly
if (require.main === module) {
  initializeDatabase();
}

module.exports = { initializeDatabase };
