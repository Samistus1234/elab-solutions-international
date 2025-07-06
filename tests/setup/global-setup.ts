/**
 * Global Test Setup
 * 
 * Initialize test environment and mock data
 */

import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global test setup...');
  
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Wait for the development server to be ready
    console.log('⏳ Waiting for development server...');
    await page.goto(baseURL || 'http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Initialize any global test data
    console.log('📊 Initializing test data...');
    
    // You could add localStorage/sessionStorage setup here
    await page.evaluate(() => {
      // Clear any existing data
      localStorage.clear();
      sessionStorage.clear();
      
      // Set up test environment flags
      localStorage.setItem('test-mode', 'true');
      localStorage.setItem('mock-data', 'true');
    });

    console.log('✅ Global setup completed successfully');
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;