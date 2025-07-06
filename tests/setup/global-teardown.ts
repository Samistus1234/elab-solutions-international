/**
 * Global Test Teardown
 * 
 * Clean up test environment
 */

import { chromium, FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global test teardown...');
  
  const { baseURL } = config.projects[0].use;
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(baseURL || 'http://localhost:3000');
    
    // Clean up any test data
    await page.evaluate(() => {
      // Clear test data from storage
      localStorage.removeItem('test-mode');
      localStorage.removeItem('mock-data');
      
      // Reset any global state if needed
      console.log('Test data cleaned up');
    });

    console.log('✅ Global teardown completed successfully');
    
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    // Don't throw error in teardown as it might mask test failures
  } finally {
    await browser.close();
  }
}

export default globalTeardown;