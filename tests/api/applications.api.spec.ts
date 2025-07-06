/**
 * Application Management API Tests
 * 
 * Comprehensive Playwright tests for all Application Management API endpoints
 * Tests actual API responses with real server running on localhost:3003
 */

import { test, expect, APIRequestContext } from '@playwright/test';

interface TestUser {
  id: string;
  email: string;
  token: string;
  role: string;
}

interface TestApplication {
  id: string;
  type: string;
  status: string;
  priority: string;
}

let apiContext: APIRequestContext;
let testUser: TestUser;
let testApplication: TestApplication;
const BASE_URL = 'http://localhost:3003/api';

test.describe('Application Management API', () => {
  
  test.beforeAll(async ({ playwright }) => {
    // Create API context
    apiContext = await playwright.request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });

    // Setup test user
    await setupTestUser();
  });

  test.afterAll(async () => {
    await apiContext.dispose();
  });

  test.describe('Authentication Setup', () => {
    test('should authenticate test user successfully', async () => {
      expect(testUser.token).toBeTruthy();
      expect(testUser.role).toBe('APPLICANT');
      expect(testUser.email).toContain('@');
    });
  });

  test.describe('POST /api/applications - Create Application', () => {
    test('should create new application successfully', async () => {
      const applicationData = {
        type: 'DATAFLOW',
        targetCountry: 'Saudi Arabia',
        targetProfession: 'Registered Nurse',
        priority: 'MEDIUM',
        personalInfo: {
          firstName: 'Test',
          lastName: 'User',
          email: testUser.email,
          phone: '+234123456789',
          dateOfBirth: '1990-01-01T00:00:00.000Z',
          nationality: 'Nigerian'
        },
        additionalData: {
          experience: '3 years',
          specialization: 'General Nursing'
        }
      };

      const response = await apiContext.post('/applications', {
        headers: {
          'Authorization': `Bearer ${testUser.token}`
        },
        data: applicationData
      });

      expect(response.status()).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.data.application).toBeDefined();
      
      const application = responseData.data.application;
      expect(application.type).toBe('DATAFLOW');
      expect(application.status).toBe('DRAFT');
      expect(application.priority).toBe('MEDIUM');
      expect(application.userId).toBe(testUser.id);
      
      // Store for subsequent tests
      testApplication = {
        id: application.id,
        type: application.type,
        status: application.status,
        priority: application.priority
      };
    });

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

    test('should reject unauthenticated requests', async () => {
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
  });

  test.describe('GET /api/applications - List Applications', () => {
    test('should list user applications with pagination', async () => {
      const response = await apiContext.get('/applications?page=1&limit=10', {
        headers: {
          'Authorization': `Bearer ${testUser.token}`
        }
      });

      expect(response.status()).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.data.applications).toBeDefined();
      expect(Array.isArray(responseData.data.applications)).toBe(true);
      expect(responseData.data.meta).toBeDefined();
      expect(responseData.data.meta.page).toBe(1);
      expect(responseData.data.meta.limit).toBe(10);
    });

    test('should filter applications by type', async () => {
      const response = await apiContext.get('/applications?type=DATAFLOW', {
        headers: {
          'Authorization': `Bearer ${testUser.token}`
        }
      });

      expect(response.status()).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      
      // All returned applications should be DATAFLOW type
      responseData.data.applications.forEach((app: any) => {
        expect(app.type).toBe('DATAFLOW');
      });
    });

    test('should filter applications by status', async () => {
      const response = await apiContext.get('/applications?status=DRAFT', {
        headers: {
          'Authorization': `Bearer ${testUser.token}`
        }
      });

      expect(response.status()).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      
      // All returned applications should be DRAFT status
      responseData.data.applications.forEach((app: any) => {
        expect(app.status).toBe('DRAFT');
      });
    });

    test('should search applications', async () => {
      const response = await apiContext.get('/applications?search=Test', {
        headers: {
          'Authorization': `Bearer ${testUser.token}`
        }
      });

      expect(response.status()).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.data.applications).toBeDefined();
    });

    test('should handle pagination correctly', async () => {
      const response = await apiContext.get('/applications?page=1&limit=5', {
        headers: {
          'Authorization': `Bearer ${testUser.token}`
        }
      });

      expect(response.status()).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.data.meta.page).toBe(1);
      expect(responseData.data.meta.limit).toBe(5);
      expect(responseData.data.applications.length).toBeLessThanOrEqual(5);
    });
  });

  test.describe('GET /api/applications/[id] - Get Single Application', () => {
    test('should get application details', async () => {
      const response = await apiContext.get(`/applications/${testApplication.id}`, {
        headers: {
          'Authorization': `Bearer ${testUser.token}`
        }
      });

      expect(response.status()).toBe(200);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(true);
      expect(responseData.data.application).toBeDefined();
      
      const application = responseData.data.application;
      expect(application.id).toBe(testApplication.id);
      expect(application.type).toBe(testApplication.type);
      expect(application.user).toBeDefined();
      expect(application.documents).toBeDefined();
      expect(application.payments).toBeDefined();
      expect(application.workflowSteps).toBeDefined();
    });

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

    test('should require authentication', async () => {
      const response = await apiContext.get(`/applications/${testApplication.id}`);

      expect(response.status()).toBe(401);
      
      const responseData = await response.json();
      expect(responseData.success).toBe(false);
      expect(responseData.error.code).toBe('UNAUTHORIZED');
    });
  });

  // Helper functions
  async function setupTestUser() {
    const timestamp = Date.now();
    const testEmail = `test-${timestamp}@example.com`;
    
    // Register a test user
    const registerResponse = await apiContext.post('/auth/register', {
      data: {
        email: testEmail,
        password: 'testpassword123',
        firstName: 'Test',
        lastName: 'User',
        country: 'Nigeria',
        profession: 'Nurse',
        consentGiven: true
      }
    });

    expect(registerResponse.status()).toBe(200);
    const registerData = await registerResponse.json();
    expect(registerData.success).toBe(true);
    
    const userId = registerData.data.user.id;

    // Login to get token
    const loginResponse = await apiContext.post('/auth/login', {
      data: {
        email: testEmail,
        password: 'testpassword123'
      }
    });

    expect(loginResponse.status()).toBe(200);
    const loginData = await loginResponse.json();
    expect(loginData.success).toBe(true);
    
    testUser = {
      id: userId,
      email: testEmail,
      token: loginData.data.tokens.accessToken,
      role: 'APPLICANT'
    };
  }
});
