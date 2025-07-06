/**
 * Database setup utilities for production
 */

import { PrismaClient } from '@/generated/prisma';
import fs from 'fs';
import path from 'path';

let prisma: PrismaClient | null = null;

export function getPrismaClient(): PrismaClient {
  if (!prisma) {
    // Ensure database directory exists in production
    if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL?.startsWith('file:')) {
      const dbPath = process.env.DATABASE_URL.replace('file:', '');
      const dbDir = path.dirname(dbPath);
      
      try {
        if (!fs.existsSync(dbDir)) {
          fs.mkdirSync(dbDir, { recursive: true });
        }
      } catch (error) {
        console.warn('Could not create database directory:', error);
      }
    }

    prisma = new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });
  }
  
  return prisma;
}

export async function ensureDatabaseExists(): Promise<boolean> {
  try {
    const client = getPrismaClient();
    await client.$connect();
    
    // Test if we can query the database
    await client.$queryRaw`SELECT 1`;
    
    await client.$disconnect();
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

export async function initializeDatabase(): Promise<void> {
  try {
    const client = getPrismaClient();
    await client.$connect();
    
    // In a real production environment, you would run migrations here
    // For now, we'll just ensure the connection works
    console.log('Database initialized successfully');
    
    await client.$disconnect();
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}
