/**
 * Test Data Fixtures
 * 
 * Mock data and test utilities for E2E tests
 */

import { UserRole } from '../../src/types/business';
import { ApplicationType } from '../../src/types/applications';
import { ConversationType } from '../../src/types/messaging';

// ============================================================================
// USER TEST DATA
// ============================================================================

export const testUsers = {
  applicant: {
    id: 'test-applicant-001',
    email: 'test.applicant@example.com',
    password: 'TestPassword123!',
    name: 'John Test Applicant',
    role: UserRole.APPLICANT,
    profile: {
      firstName: 'John',
      lastName: 'Applicant',
      phone: '+1234567890',
      country: 'United States'
    }
  },
  consultant: {
    id: 'test-consultant-001',
    email: 'test.consultant@example.com',
    password: 'TestPassword123!',
    name: 'Sarah Test Consultant',
    role: UserRole.CONSULTANT,
    profile: {
      firstName: 'Sarah',
      lastName: 'Consultant',
      phone: '+1234567891',
      department: 'Healthcare Verification'
    }
  },
  admin: {
    id: 'test-admin-001',
    email: 'test.admin@example.com',
    password: 'TestPassword123!',
    name: 'Mike Test Admin',
    role: UserRole.ADMIN,
    profile: {
      firstName: 'Mike',
      lastName: 'Admin',
      phone: '+1234567892',
      permissions: ['all']
    }
  },
  superAdmin: {
    id: 'test-super-admin-001',
    email: 'test.superadmin@example.com',
    password: 'TestPassword123!',
    name: 'Lisa Test Super Admin',
    role: UserRole.SUPER_ADMIN,
    profile: {
      firstName: 'Lisa',
      lastName: 'Super Admin',
      phone: '+1234567893',
      permissions: ['all']
    }
  }
};

// ============================================================================
// APPLICATION TEST DATA
// ============================================================================

export const testApplications = {
  dataflow: {
    applicationType: 'dataflow',
    targetCountry: 'United States',
    processingPriority: 'standard',
    personalInfo: {
      firstName: 'John',
      lastName: 'TestUser',
      email: 'john.testuser@example.com',
      phone: '+1234567890',
      dateOfBirth: '1990-01-15',
      nationality: 'Canadian',
      passportNumber: 'AB123456789',
      passportExpiryDate: '2030-01-15',
      currentAddress: {
        street: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        postalCode: '12345',
        country: 'Canada'
      },
      emergencyContact: {
        name: 'Jane TestUser',
        relationship: 'Spouse',
        phone: '+1234567891',
        email: 'jane.testuser@example.com'
      },
      languages: ['English', 'French']
    },
    education: {
      degree: 'Bachelor of Science in Nursing',
      institution: 'Test University',
      graduationYear: '2015',
      country: 'Canada'
    },
    experience: {
      yearsOfExperience: 8,
      currentPosition: 'Registered Nurse',
      workHistory: [
        {
          position: 'Staff Nurse',
          employer: 'Test Hospital',
          startDate: '2015-06-01',
          endDate: '2020-05-31',
          duties: 'Patient care, medication administration'
        }
      ]
    }
  },
  mumaris: {
    applicationType: 'mumaris_plus',
    targetCountry: 'Saudi Arabia',
    processingPriority: 'express',
    personalInfo: {
      firstName: 'Ahmed',
      lastName: 'TestUser',
      email: 'ahmed.testuser@example.com',
      phone: '+966123456789',
      dateOfBirth: '1985-03-20',
      nationality: 'Egyptian'
    }
  }
};

// ============================================================================
// DOCUMENT TEST DATA
// ============================================================================

export const testDocuments = {
  passport: {
    fileName: 'test-passport.pdf',
    fileSize: 2048000, // 2MB
    mimeType: 'application/pdf',
    content: 'Mock passport document content for testing'
  },
  diploma: {
    fileName: 'test-nursing-diploma.pdf',
    fileSize: 3072000, // 3MB
    mimeType: 'application/pdf',
    content: 'Mock nursing diploma content for testing'
  },
  license: {
    fileName: 'test-nursing-license.jpg',
    fileSize: 1536000, // 1.5MB
    mimeType: 'image/jpeg',
    content: 'Mock nursing license image for testing'
  },
  workLetter: {
    fileName: 'test-work-experience.pdf',
    fileSize: 1024000, // 1MB
    mimeType: 'application/pdf',
    content: 'Mock work experience letter for testing'
  }
};

// ============================================================================
// MESSAGE TEST DATA
// ============================================================================

export const testMessages = {
  applicationInquiry: {
    content: 'Hello, I have a question about my application status. Could you please provide an update?',
    priority: 'normal' as const,
    type: 'text' as const
  },
  consultantResponse: {
    content: 'Hi! I\'d be happy to help you with your application. Let me check the current status for you.',
    priority: 'normal' as const,
    type: 'text' as const
  },
  urgentMessage: {
    content: 'URGENT: Please review the documents I just uploaded. There\'s a deadline approaching.',
    priority: 'urgent' as const,
    type: 'text' as const
  },
  fileShare: {
    content: 'I\'ve attached the additional document you requested.',
    priority: 'normal' as const,
    type: 'file_upload' as const,
    attachments: [testDocuments.passport]
  }
};

// ============================================================================
// PAGE NAVIGATION HELPERS
// ============================================================================

export const testRoutes = {
  homepage: '/',
  login: '/login',
  dashboard: '/dashboard',
  applications: '/dashboard/applications',
  newApplication: '/dashboard/applications/new',
  documents: '/dashboard/documents',
  messages: '/dashboard/messages',
  profile: '/dashboard/profile',
  admin: '/dashboard/admin'
};

// ============================================================================
// TEST UTILITIES
// ============================================================================

export class TestHelpers {
  /**
   * Create a test file for upload testing
   */
  static createTestFile(
    fileName: string, 
    mimeType: string, 
    sizeInBytes: number = 1024000
  ): File {
    const content = 'x'.repeat(sizeInBytes);
    return new File([content], fileName, { type: mimeType });
  }

  /**
   * Generate random test data
   */
  static generateRandomEmail(): string {
    const timestamp = Date.now();
    return `test.user.${timestamp}@example.com`;
  }

  static generateRandomPhone(): string {
    const number = Math.floor(Math.random() * 9000000000) + 1000000000;
    return `+1${number}`;
  }

  static generateRandomPassport(): string {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let passport = '';
    
    // Generate 2 letters
    for (let i = 0; i < 2; i++) {
      passport += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    
    // Generate 7 numbers
    for (let i = 0; i < 7; i++) {
      passport += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    
    return passport;
  }

  /**
   * Wait for element with retry logic
   */
  static async waitForElement(
    page: any, 
    selector: string, 
    timeout: number = 10000
  ): Promise<boolean> {
    try {
      await page.waitForSelector(selector, { timeout });
      return true;
    } catch (error) {
      console.warn(`Element ${selector} not found within ${timeout}ms`);
      return false;
    }
  }

  /**
   * Simulate file upload
   */
  static async uploadFile(
    page: any, 
    fileInputSelector: string, 
    file: typeof testDocuments.passport
  ): Promise<void> {
    const testFile = this.createTestFile(file.fileName, file.mimeType, file.fileSize);
    
    // Set the file input
    await page.setInputFiles(fileInputSelector, {
      name: testFile.name,
      mimeType: testFile.type,
      buffer: Buffer.from(file.content)
    });
  }

  /**
   * Fill form with test data
   */
  static async fillApplicationForm(page: any, applicationData: any): Promise<void> {
    const { personalInfo } = applicationData;
    
    // Fill personal information
    await page.fill('[data-testid="firstName"]', personalInfo.firstName);
    await page.fill('[data-testid="lastName"]', personalInfo.lastName);
    await page.fill('[data-testid="email"]', personalInfo.email);
    await page.fill('[data-testid="phone"]', personalInfo.phone);
    await page.fill('[data-testid="dateOfBirth"]', personalInfo.dateOfBirth);
    
    // Fill address information
    if (personalInfo.currentAddress) {
      await page.fill('[data-testid="street"]', personalInfo.currentAddress.street);
      await page.fill('[data-testid="city"]', personalInfo.currentAddress.city);
      await page.fill('[data-testid="postalCode"]', personalInfo.currentAddress.postalCode);
    }
  }

  /**
   * Login as specific user role
   */
  static async loginAs(page: any, userRole: keyof typeof testUsers): Promise<void> {
    const user = testUsers[userRole];
    
    await page.goto('/login');
    await page.fill('[data-testid="email"]', user.email);
    await page.fill('[data-testid="password"]', user.password);
    await page.click('[data-testid="login-button"]');
    
    // Wait for dashboard to load
    await page.waitForURL('/dashboard');
    await page.waitForLoadState('networkidle');
  }

  /**
   * Take screenshot with timestamp
   */
  static async takeScreenshot(page: any, name: string): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${name}-${timestamp}.png`;
    await page.screenshot({ 
      path: `test-results/screenshots/${fileName}`,
      fullPage: true 
    });
  }

  /**
   * Check for console errors
   */
  static setupConsoleErrorTracking(page: any): string[] {
    const errors: string[] = [];
    
    page.on('console', (msg: any) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', (error: Error) => {
      errors.push(error.message);
    });
    
    return errors;
  }
}

// ============================================================================
// COMMON TEST EXPECTATIONS
// ============================================================================

export const commonExpectations = {
  dashboardLoaded: async (page: any) => {
    await page.waitForSelector('[data-testid="dashboard-header"]');
    await page.waitForSelector('[data-testid="dashboard-content"]');
  },
  
  applicationFormLoaded: async (page: any) => {
    await page.waitForSelector('[data-testid="application-form"]');
    await page.waitForSelector('[data-testid="form-step-indicator"]');
  },
  
  documentUploadReady: async (page: any) => {
    await page.waitForSelector('[data-testid="document-upload-area"]');
    await page.waitForSelector('[data-testid="file-input"]');
  },
  
  messageInterfaceLoaded: async (page: any) => {
    await page.waitForSelector('[data-testid="conversation-list"]');
    await page.waitForSelector('[data-testid="message-area"]');
  }
};