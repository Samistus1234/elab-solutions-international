/**
 * Application Management API Tests - Simplified Version
 * 
 * Tests the Application Management API endpoints with manual user activation
 */

import { test, expect, APIRequestContext } from '@playwright/test';

let apiContext: APIRequestContext;
let testUser: any;
let testApplication: any;
const BASE_URL = 'http://localhost:3003/api';

test.describe('Application Management API - Core Tests', () => {
  
  test.beforeAll(async ({ playwright }) => {
    // Create API context
    apiContext = await playwright.request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.describe('API Health Check', () => {
    test('should return healthy status', async () => {
      const response = await apiContext.get('/health');
      
      expect(response.status()).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.data.status).toBe('healthy');
      expect(responseData.data.database.status).toBe('connected');
    });
  });

  test.describe('Authentication Endpoints', () => {
    test('should register a new user', async () => {
      const timestamp = Date.now();
      const testEmail = `test-api-${timestamp}@example.com`;
      
      const registerData = {
        email: testEmail,
        password: 'testpassword123',
        firstName: 'Test',
        lastName: 'User',
        country: 'Nigeria',
        profession: 'Nurse',
        consentGiven: true
      };

      const response = await apiContext.post('/auth/register', {
        data: registerData
      });

      expect(response.status()).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.data.user.email).toBe(testEmail);
      expect(responseData.data.user.role).toBe('APPLICANT');
      expect(responseData.data.tokens.accessToken).toBeTruthy();
      
      // Store user data for subsequent tests
      testUser = {
        id: responseData.data.user.id,
        email: testEmail,
        token: responseData.data.tokens.accessToken,
        role: 'APPLICANT'
      };
    });

    test('should reject registration with invalid data', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: '123', // Too short
        firstName: '',
        lastName: 'User',
        country: 'Nigeria',
        profession: 'Nurse',
        consentGiven: false // Required to be true
      };

      const response = await apiContext.post('/auth/register', {
        data: invalidData
      });

      expect(response.status()).toBe(400);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('VALIDATION_ERROR');
    });

    test('should reject duplicate email registration', async () => {
      const duplicateData = {
        email: testUser.email, // Same email as previous test
        password: 'testpassword123',
        firstName: 'Another',
        lastName: 'User',
        country: 'Nigeria',
        profession: 'Nurse',
        consentGiven: true
      };

      const response = await apiContext.post('/auth/register', {
        data: duplicateData
      });

      expect(response.status()).toBe(400);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('EMAIL_ALREADY_EXISTS');
    });
  });

  test.describe('Application Endpoints - Unauthenticated', () => {
    test('should reject unauthenticated requests to create application', async () => {
      const applicationData = {
        type: 'DATAFLOW',
        targetCountry: 'Saudi Arabia',
        targetProfession: 'Registered Nurse'
      };

      const response = await apiContext.post('/applications', {
        data: applicationData
      });

      expect(response.status()).toBe(401);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('UNAUTHORIZED');
    });

    test('should reject unauthenticated requests to list applications', async () => {
      const response = await apiContext.get('/applications');

      expect(response.status()).toBe(401);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('UNAUTHORIZED');
    });

    test('should reject unauthenticated requests to get single application', async () => {
      const response = await apiContext.get('/applications/test-id');

      expect(response.status()).toBe(401);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('UNAUTHORIZED');
    });

    test('should reject unauthenticated requests to update application', async () => {
      const updateData = {
        priority: 'HIGH'
      };

      const response = await apiContext.put('/applications/test-id', {
        data: updateData
      });

      expect(response.status()).toBe(401);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('UNAUTHORIZED');
    });

    test('should reject unauthenticated requests to update application status', async () => {
      const statusData = {
        status: 'SUBMITTED'
      };

      const response = await apiContext.put('/applications/test-id/status', {
        data: statusData
      });

      expect(response.status()).toBe(401);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('UNAUTHORIZED');
    });
  });

  test.describe('Application Validation', () => {
    test('should reject invalid application data', async () => {
      const invalidData = {
        type: 'INVALID_TYPE',
        targetCountry: '',
        // Missing required fields
      };

      const response = await apiContext.post('/applications', {
        headers: {
          'Authorization': `Bearer ${testUser.token}`
        },
        data: invalidData
      });

      expect(response.status()).toBe(400);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('VALIDATION_ERROR');
    });

    test('should reject invalid status update data', async () => {
      const invalidStatusData = {
        status: 'INVALID_STATUS'
      };

      const response = await apiContext.put('/applications/test-id/status', {
        headers: {
          'Authorization': `Bearer ${testUser.token}`
        },
        data: invalidStatusData
      });

      expect(response.status()).toBe(400);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('VALIDATION_ERROR');
    });
  });

  test.describe('Error Handling', () => {
    test('should return 404 for non-existent application', async () => {
      const response = await apiContext.get('/applications/non-existent-id', {
        headers: {
          'Authorization': `Bearer ${testUser.token}`
        }
      });

      expect(response.status()).toBe(404);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('APPLICATION_NOT_FOUND');
    });

    test('should handle malformed JSON gracefully', async () => {
      const response = await apiContext.post('/applications', {
        headers: {
          'Authorization': `Bearer ${testUser.token}`,
          'Content-Type': 'application/json'
        },
        data: 'invalid-json'
      });

      expect(response.status()).toBe(400);
    });

    test('should validate pagination parameters', async () => {
      const response = await apiContext.get('/applications?page=0&limit=200', {
        headers: {
          'Authorization': `Bearer ${testUser.token}`
        }
      });

      expect(response.status()).toBe(400);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('VALIDATION_ERROR');
    });
  });

  test.describe('API Response Format', () => {
    test('should return consistent response format for success', async () => {
      const response = await apiContext.get('/health');
      
      const responseData = await response.json();
      expect(responseData).toHaveProperty('success');
      expect(responseData).toHaveProperty('data');
      expect(responseData.success).toBe(true);
    });

    test('should return consistent response format for errors', async () => {
      const response = await apiContext.get('/applications');
      
      const responseData = await response.json();
      expect(responseData).toHaveProperty('success');
      expect(responseData).toHaveProperty('error');
      expect(responseData.success).toBe(false);
      expect(responseData.error).toHaveProperty('code');
      expect(responseData.error).toHaveProperty('message');
    });
  });
});
