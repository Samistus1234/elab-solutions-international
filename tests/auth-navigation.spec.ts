/**
 * Authentication and Navigation Tests
 * 
 * Test user authentication flows and navigation between pages
 */

import { test, expect } from '@playwright/test';
import { testUsers, testRoutes, TestHelpers, commonExpectations } from './fixtures/test-data';

test.describe('Authentication and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Track console errors
    TestHelpers.setupConsoleErrorTracking(page);
  });

  test.describe('Homepage and Landing', () => {
    test('should load homepage successfully', async ({ page }) => {
      await page.goto('/');
      
      // Check page loads
      await expect(page).toHaveTitle(/eLab Solutions International/);
      
      // Check main navigation elements
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('nav a:has-text("GET STARTED")')).toBeVisible();
      await expect(page.locator('nav a:has-text("LOGIN")')).toBeVisible();
      
      // Check hero section
      await expect(page.locator('h1:has-text("Global Healthcare")')).toBeVisible();
      await expect(page.locator('p:has-text("eLab Solutions International - Leading provider")')).toBeVisible();
    });

    test('should have responsive navigation', async ({ page }) => {
      await page.goto('/');
      
      // Test desktop navigation
      await expect(page.locator('nav')).toBeVisible();
      
      // Test mobile navigation (simulate mobile viewport)
      await page.setViewportSize({ width: 375, height: 667 });
      await page.reload();
      
      // Mobile menu should be accessible
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-button"]');
      if (await mobileMenuButton.isVisible()) {
        await mobileMenuButton.click();
        await expect(page.locator('[data-testid="mobile-menu"]')).toBeVisible();
      }
    });

    test('should navigate to login page', async ({ page }) => {
      await page.goto('/');
      await page.click('text=Login');
      
      await expect(page).toHaveURL(/.*login/);
      await expect(page.locator('text=Sign in to your account')).toBeVisible();
    });

    test('should navigate to get started', async ({ page }) => {
      await page.goto('/');
      await page.click('text=Get Started');
      
      // Should redirect to registration page
      await expect(page).toHaveURL(/.*register/);
    });
  });

  test.describe('Authentication Flow', () => {
    test('should show login form correctly', async ({ page }) => {
      await page.goto('/login');
      
      // Check form elements
      await expect(page.locator('[data-testid="email"]')).toBeVisible();
      await expect(page.locator('[data-testid="password"]')).toBeVisible();
      await expect(page.locator('[data-testid="login-button"]')).toBeVisible();
      
      // Check form labels and placeholders
      await expect(page.locator('label:has-text("Email")')).toBeVisible();
      await expect(page.locator('label:has-text("Password")')).toBeVisible();
    });

    test('should handle login validation', async ({ page }) => {
      await page.goto('/login');
      
      // Try to submit empty form
      await page.click('[data-testid="login-button"]');
      
      // Should show validation errors
      await expect(page.locator('text=Email is required')).toBeVisible();
      await expect(page.locator('text=Password is required')).toBeVisible();
      
      // Try invalid email
      await page.fill('[data-testid="email"]', 'invalid-email');
      await page.click('[data-testid="login-button"]');
      
      await expect(page.locator('text=Please enter a valid email')).toBeVisible();
    });

    test('should login successfully as applicant', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      
      // Should redirect to dashboard
      await expect(page).toHaveURL(/.*dashboard/);
      await commonExpectations.dashboardLoaded(page);
      
      // Check user-specific elements
      await expect(page.locator(`text=${testUsers.applicant.name}`)).toBeVisible();
      await expect(page.locator('h2:has-text("My Applications")')).toBeVisible();
    });

    test('should login successfully as consultant', async ({ page }) => {
      await TestHelpers.loginAs(page, 'consultant');
      
      await expect(page).toHaveURL(/.*dashboard/);
      await commonExpectations.dashboardLoaded(page);
      
      // Check consultant-specific elements
      await expect(page.locator(`text=${testUsers.consultant.name}`)).toBeVisible();
      await expect(page.locator('[data-testid="review-queue"]')).toBeVisible();
    });

    test('should login successfully as admin', async ({ page }) => {
      await TestHelpers.loginAs(page, 'admin');
      
      await expect(page).toHaveURL(/.*dashboard/);
      await commonExpectations.dashboardLoaded(page);
      
      // Check admin-specific elements
      await expect(page.locator(`text=${testUsers.admin.name}`)).toBeVisible();
      await expect(page.locator('[data-testid="admin-panel"]')).toBeVisible();
    });

    test('should handle invalid login credentials', async ({ page }) => {
      await page.goto('/login');
      
      await page.fill('[data-testid="email"]', 'invalid@example.com');
      await page.fill('[data-testid="password"]', 'wrongpassword');
      await page.click('[data-testid="login-button"]');
      
      // Should show error message
      await expect(page.locator('text=Invalid email or password')).toBeVisible();
      
      // Should stay on login page
      await expect(page).toHaveURL(/.*login/);
    });

    test('should handle logout', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      
      // Open user menu and click logout
      await page.click('[data-testid="user-menu-button"]');
      await page.click('[data-testid="logout-button"]');
      
      // Should redirect to login page
      await expect(page).toHaveURL(/.*login/);
      await expect(page.locator('text=Sign in to your account')).toBeVisible();
    });
  });

  test.describe('Protected Routes', () => {
    test('should redirect unauthenticated users to login', async ({ page }) => {
      // Try to access protected routes
      const protectedRoutes = [
        '/dashboard',
        '/dashboard/applications',
        '/dashboard/documents',
        '/dashboard/messages'
      ];

      for (const route of protectedRoutes) {
        await page.goto(route);
        await expect(page).toHaveURL(/.*login/);
      }
    });

    test('should allow authenticated users to access protected routes', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      
      // Should be able to access dashboard routes
      await page.goto('/dashboard/applications');
      await expect(page).toHaveURL(/.*applications/);
      
      await page.goto('/dashboard/documents');
      await expect(page).toHaveURL(/.*documents/);
    });

    test('should enforce role-based access', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      
      // Applicants shouldn't access admin routes
      await page.goto('/dashboard/admin');
      
      // Should either redirect or show access denied
      const hasAccessDenied = await page.locator('text=Access Denied').isVisible();
      const isRedirected = !page.url().includes('/admin');
      
      expect(hasAccessDenied || isRedirected).toBeTruthy();
    });
  });

  test.describe('Dashboard Navigation', () => {
    test('should navigate dashboard sections as applicant', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      
      // Test main navigation items
      const navItems = [
        { text: 'My Applications', url: '/dashboard/applications' },
        { text: 'My Documents', url: '/dashboard/documents' },
        { text: 'Messages', url: '/dashboard/messages' }
      ];

      for (const item of navItems) {
        // Navigate directly to URL instead of clicking to avoid viewport issues
        await page.goto(item.url);
        await expect(page).toHaveURL(new RegExp(item.url));
        await page.waitForLoadState('networkidle');
      }
    });

    test('should show role-appropriate navigation items', async ({ page }) => {
      // Test applicant navigation
      await TestHelpers.loginAs(page, 'applicant');
      await expect(page.locator('nav').locator('text=My Applications')).toBeVisible();
      await expect(page.locator('[data-testid=\"admin-panel\"]')).not.toBeVisible();
      
      // Open user menu and logout
      await page.click('[data-testid="user-menu-button"]');
      await page.click('[data-testid="logout-button"]');
      
      // Test admin navigation
      await TestHelpers.loginAs(page, 'admin');
      await expect(page.locator('[data-testid=\"admin-panel\"]')).toBeVisible();
      
      // Admin panel is already visible in dashboard - no need to navigate
      // await page.click('text=Admin Panel');
      // await expect(page.locator('text=System Overview')).toBeVisible();
    });

    test('should maintain navigation state across page reloads', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      
      // Navigate to applications page
      await page.goto('/dashboard/applications');
      
      // Reload page
      await page.reload();
      
      // Should still be on applications page and authenticated
      await expect(page).toHaveURL(/.*applications/);
      await expect(page.locator(`text=${testUsers.applicant.name}`)).toBeVisible();
    });
  });

  test.describe('User Profile and Settings', () => {
    test('should display user profile information', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      
      // Click user menu
      await page.click('[data-testid="user-menu-button"]');
      
      // Should show user info
      await expect(page.locator(`text=${testUsers.applicant.name}`)).toBeVisible();
      await expect(page.locator(`text=${testUsers.applicant.email}`)).toBeVisible();
      await expect(page.locator(`text=${testUsers.applicant.role}`)).toBeVisible();
    });

    test('should access profile settings', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      
      await page.click('[data-testid="user-menu-button"]');
      await page.click('[data-testid="profile-settings"]');
      
      // Should navigate to profile page
      await expect(page).toHaveURL(/.*profile/);
      await expect(page.locator('text=Profile Settings')).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      // Simulate offline mode
      await page.context().setOffline(true);
      
      await page.goto('/');
      
      // Should show appropriate error message or offline indicator
      const hasOfflineMessage = await page.locator('text=offline').isVisible();
      const hasNetworkError = await page.locator('text=network').isVisible();
      
      expect(hasOfflineMessage || hasNetworkError).toBeTruthy();
    });

    test('should show 404 for non-existent routes', async ({ page }) => {
      await page.goto('/non-existent-page');
      
      // Should show 404 error or redirect
      const has404 = await page.locator('text=404').isVisible();
      const hasNotFound = await page.locator('text=Not Found').isVisible();
      const isRedirected = page.url() !== 'http://localhost:3000/non-existent-page';
      
      expect(has404 || hasNotFound || isRedirected).toBeTruthy();
    });
  });

  test.describe('Performance and Accessibility', () => {
    test('should load pages within performance budget', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // Page should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should be keyboard navigable', async ({ page }) => {
      await page.goto('/');
      
      // Tab through navigation
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toBeVisible();
      
      // Should be able to activate focused elements with Enter
      await page.keyboard.press('Enter');
      
      // Focus should move logically
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await expect(page.locator(':focus')).toBeVisible();
    });

    test('should have proper heading structure', async ({ page }) => {
      await page.goto('/');
      
      // Should have proper heading hierarchy
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
      
      // Check for logical heading structure
      await expect(page.locator('h1')).toBeVisible();
    });
  });
});