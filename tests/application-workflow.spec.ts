/**
 * Application Creation Workflow Tests
 * 
 * Test the complete application creation process through the form wizard
 */

import { test, expect } from '@playwright/test';
import { testUsers, testApplications, TestHelpers, commonExpectations } from './fixtures/test-data';

test.describe('Application Creation Workflow', () => {
  test.beforeEach(async ({ page }) => {
    // Login as applicant for most tests
    await TestHelpers.loginAs(page, 'applicant');
    TestHelpers.setupConsoleErrorTracking(page);
  });

  test.describe('Form Wizard Navigation', () => {
    test('should load application form wizard', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      await commonExpectations.applicationFormLoaded(page);
      
      // Check form wizard components
      await expect(page.locator('[data-testid="form-wizard-header"]')).toBeVisible();
      await expect(page.locator('[data-testid="step-indicator"]')).toBeVisible();
      await expect(page.locator('[data-testid="step-navigation"]')).toBeVisible();
      
      // Should start on first step
      await expect(page.locator('[data-testid="step-1"]')).toHaveClass(/active/);
      await expect(page.locator('text=Application Type')).toBeVisible();
    });

    test('should navigate between form steps', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      await commonExpectations.applicationFormLoaded(page);
      
      // Select application type first
      await page.click('[data-testid="application-type-dataflow"]');
      await page.click('[data-testid="target-country-usa"]');
      await page.click('[data-testid="processing-priority-standard"]');
      
      // Navigate to next step
      await page.click('[data-testid="next-button"]');
      
      // Should be on personal info step
      await expect(page.locator('[data-testid="step-2"]')).toHaveClass(/active/);
      await expect(page.locator('text=Personal Information')).toBeVisible();
      
      // Navigate back
      await page.click('[data-testid="back-button"]');
      
      // Should be back on step 1
      await expect(page.locator('[data-testid="step-1"]')).toHaveClass(/active/);
    });

    test('should show progress indicator correctly', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Check initial progress
      const progressBar = page.locator('[data-testid="progress-bar"]');
      await expect(progressBar).toHaveAttribute('style', /width:\s*20%/);
      
      // Complete first step and move to second
      await page.click('[data-testid="application-type-dataflow"]');
      await page.click('[data-testid="target-country-usa"]');
      await page.click('[data-testid="next-button"]');
      
      // Progress should update
      await expect(progressBar).toHaveAttribute('style', /width:\s*40%/);
    });

    test('should validate step completion before navigation', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Try to proceed without selecting application type
      await page.click('[data-testid="next-button"]');
      
      // Should show validation errors
      await expect(page.locator('text=Please select an application type')).toBeVisible();
      
      // Should not navigate to next step
      await expect(page.locator('[data-testid="step-1"]')).toHaveClass(/active/);
    });
  });

  test.describe('Application Type Selection', () => {
    test('should display all application types', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Check all application type options are visible
      await expect(page.locator('[data-testid="application-type-dataflow"]')).toBeVisible();
      await expect(page.locator('[data-testid="application-type-mumaris"]')).toBeVisible();
      await expect(page.locator('[data-testid="application-type-sheryan"]')).toBeVisible();
      await expect(page.locator('[data-testid="application-type-license_renewal"]')).toBeVisible();
      await expect(page.locator('[data-testid="application-type-exam_booking"]')).toBeVisible();
    });

    test('should show application type details on selection', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Select DataFlow application
      await page.click('[data-testid="application-type-dataflow"]');
      
      // Should show DataFlow-specific information
      await expect(page.locator('text=DataFlow International')).toBeVisible();
      await expect(page.locator('text=United States')).toBeVisible();
      await expect(page.locator('text=15-20 business days')).toBeVisible();
    });

    test('should update country options based on application type', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Select DataFlow (US/Canada)
      await page.click('[data-testid="application-type-dataflow"]');
      await expect(page.locator('[data-testid="target-country-usa"]')).toBeVisible();
      await expect(page.locator('[data-testid="target-country-canada"]')).toBeVisible();
      
      // Select MUMARIS+ (Saudi Arabia)
      await page.click('[data-testid="application-type-mumaris"]');
      await expect(page.locator('[data-testid="target-country-saudi"]')).toBeVisible();
    });

    test('should show processing priority options', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      await page.click('[data-testid="application-type-dataflow"]');
      
      // Check priority options
      await expect(page.locator('[data-testid="processing-priority-standard"]')).toBeVisible();
      await expect(page.locator('[data-testid="processing-priority-express"]')).toBeVisible();
      await expect(page.locator('[data-testid="processing-priority-urgent"]')).toBeVisible();
      
      // Check pricing information
      await expect(page.locator('text=$299')).toBeVisible(); // Standard price
      await expect(page.locator('text=$499')).toBeVisible(); // Express price
    });
  });

  test.describe('Personal Information Step', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Complete first step
      await page.click('[data-testid="application-type-dataflow"]');
      await page.click('[data-testid="target-country-usa"]');
      await page.click('[data-testid="processing-priority-standard"]');
      await page.click('[data-testid="next-button"]');
    });

    test('should display personal information form', async ({ page }) => {
      // Check all form sections are visible
      await expect(page.locator('text=Basic Information')).toBeVisible();
      await expect(page.locator('text=Contact Information')).toBeVisible();
      await expect(page.locator('text=Address Information')).toBeVisible();
      await expect(page.locator('text=Passport Information')).toBeVisible();
      await expect(page.locator('text=Emergency Contact')).toBeVisible();
      
      // Check required field indicators
      await expect(page.locator('[data-testid="firstName"] + span')).toHaveText('*');
      await expect(page.locator('[data-testid="lastName"] + span')).toHaveText('*');
      await expect(page.locator('[data-testid="email"] + span')).toHaveText('*');
    });

    test('should validate required fields', async ({ page }) => {
      // Try to proceed without filling required fields
      await page.click('[data-testid="next-button"]');
      
      // Should show validation errors
      await expect(page.locator('text=First name is required')).toBeVisible();
      await expect(page.locator('text=Last name is required')).toBeVisible();
      await expect(page.locator('text=Email is required')).toBeVisible();
      await expect(page.locator('text=Phone number is required')).toBeVisible();
    });

    test('should validate email format', async ({ page }) => {
      await page.fill('[data-testid="email"]', 'invalid-email');
      await page.click('[data-testid="next-button"]');
      
      await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
    });

    test('should validate phone number format', async ({ page }) => {
      await page.fill('[data-testid="phone"]', '123');
      await page.click('[data-testid="next-button"]');
      
      await expect(page.locator('text=Please enter a valid phone number')).toBeVisible();
    });

    test('should validate passport number format', async ({ page }) => {
      await page.fill('[data-testid="passportNumber"]', '123');
      await page.click('[data-testid="next-button"]');
      
      await expect(page.locator('text=Passport number must be in valid format')).toBeVisible();
    });

    test('should validate date fields', async ({ page }) => {
      // Test invalid date of birth
      await page.fill('[data-testid="dateOfBirth"]', '2020-01-01'); // Too young
      await page.click('[data-testid="next-button"]');
      
      await expect(page.locator('text=You must be at least 18 years old')).toBeVisible();
      
      // Test expired passport
      await page.fill('[data-testid="passportExpiryDate"]', '2020-01-01'); // Expired
      await page.click('[data-testid="next-button"]');
      
      await expect(page.locator('text=Passport must be valid for at least 6 months')).toBeVisible();
    });

    test('should complete personal information step successfully', async ({ page }) => {
      const personalInfo = testApplications.dataflow.personalInfo;
      
      // Fill out all required fields
      await TestHelpers.fillApplicationForm(page, testApplications.dataflow);
      
      // Add additional required fields
      await page.fill('[data-testid="passportNumber"]', TestHelpers.generateRandomPassport());
      await page.fill('[data-testid="passportExpiryDate"]', '2030-12-31');
      await page.fill('[data-testid="nationality"]', personalInfo.nationality);
      
      // Emergency contact
      await page.fill('[data-testid="emergencyContactName"]', personalInfo.emergencyContact.name);
      await page.fill('[data-testid="emergencyContactPhone"]', personalInfo.emergencyContact.phone);
      
      // Proceed to next step
      await page.click('[data-testid="next-button"]');
      
      // Should advance to next step
      await expect(page.locator('[data-testid="step-3"]')).toHaveClass(/active/);
      await expect(page.locator('text=Education Information')).toBeVisible();
    });
  });

  test.describe('Education Step', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Complete previous steps
      await page.click('[data-testid="application-type-dataflow"]');
      await page.click('[data-testid="target-country-usa"]');
      await page.click('[data-testid="next-button"]');
      
      // Fill personal info
      await TestHelpers.fillApplicationForm(page, testApplications.dataflow);
      await page.fill('[data-testid="passportNumber"]', TestHelpers.generateRandomPassport());
      await page.fill('[data-testid="passportExpiryDate"]', '2030-12-31');
      await page.click('[data-testid="next-button"]');
    });

    test('should display education form', async ({ page }) => {
      await expect(page.locator('text=Educational Background')).toBeVisible();
      await expect(page.locator('[data-testid="degree"]')).toBeVisible();
      await expect(page.locator('[data-testid="institution"]')).toBeVisible();
      await expect(page.locator('[data-testid="graduationYear"]')).toBeVisible();
      await expect(page.locator('[data-testid="educationCountry"]')).toBeVisible();
    });

    test('should validate education fields', async ({ page }) => {
      await page.click('[data-testid="next-button"]');
      
      await expect(page.locator('text=Degree is required')).toBeVisible();
      await expect(page.locator('text=Institution is required')).toBeVisible();
      await expect(page.locator('text=Graduation year is required')).toBeVisible();
    });

    test('should complete education step', async ({ page }) => {
      const education = testApplications.dataflow.education;
      
      await page.fill('[data-testid="degree"]', education.degree);
      await page.fill('[data-testid="institution"]', education.institution);
      await page.fill('[data-testid="graduationYear"]', education.graduationYear);
      await page.selectOption('[data-testid="educationCountry"]', education.country);
      
      await page.click('[data-testid="next-button"]');
      
      // Should advance to experience step
      await expect(page.locator('[data-testid="step-4"]')).toHaveClass(/active/);
    });
  });

  test.describe('Complete Application Flow', () => {
    test('should complete entire DataFlow application', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Step 1: Application Type
      await page.click('[data-testid="application-type-dataflow"]');
      await page.click('[data-testid="target-country-usa"]');
      await page.click('[data-testid="processing-priority-standard"]');
      await page.click('[data-testid="next-button"]');
      
      // Step 2: Personal Information
      await TestHelpers.fillApplicationForm(page, testApplications.dataflow);
      await page.fill('[data-testid="passportNumber"]', TestHelpers.generateRandomPassport());
      await page.fill('[data-testid="passportExpiryDate"]', '2030-12-31');
      await page.fill('[data-testid="nationality"]', 'Canadian');
      await page.fill('[data-testid="emergencyContactName"]', 'Jane Doe');
      await page.fill('[data-testid="emergencyContactPhone"]', '+1234567891');
      await page.click('[data-testid="next-button"]');
      
      // Step 3: Education
      await page.fill('[data-testid="degree"]', 'Bachelor of Science in Nursing');
      await page.fill('[data-testid="institution"]', 'University of Toronto');
      await page.fill('[data-testid="graduationYear"]', '2015');
      await page.selectOption('[data-testid="educationCountry"]', 'Canada');
      await page.click('[data-testid="next-button"]');
      
      // Step 4: Experience
      await page.fill('[data-testid="yearsOfExperience"]', '8');
      await page.fill('[data-testid="currentPosition"]', 'Registered Nurse');
      await page.click('[data-testid="next-button"]');
      
      // Step 5: Documents (should show upload interface)
      await expect(page.locator('text=Document Requirements')).toBeVisible();
      await expect(page.locator('text=International Passport')).toBeVisible();
      await expect(page.locator('text=Education Certificate')).toBeVisible();
      await page.click('[data-testid="next-button"]');
      
      // Step 6: Review and Submit
      await expect(page.locator('text=Review Your Application')).toBeVisible();
      await expect(page.locator('text=DataFlow International')).toBeVisible();
      await expect(page.locator('text=United States')).toBeVisible();
      
      // Submit application
      await page.click('[data-testid="submit-application"]');
      
      // Should show success message and redirect
      await expect(page.locator('text=Application Submitted Successfully')).toBeVisible();
      await expect(page).toHaveURL(/.*applications/);
    });

    test('should save draft and resume later', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Start filling application
      await page.click('[data-testid="application-type-dataflow"]');
      await page.click('[data-testid="target-country-usa"]');
      await page.click('[data-testid="next-button"]');
      
      await page.fill('[data-testid="firstName"]', 'John');
      await page.fill('[data-testid="lastName"]', 'Doe');
      
      // Save as draft
      await page.click('[data-testid="save-draft"]');
      
      // Should show draft saved message
      await expect(page.locator('text=Draft saved successfully')).toBeVisible();
      
      // Navigate away and come back
      await page.goto('/dashboard');
      await page.goto('/dashboard/applications/new');
      
      // Should show option to resume draft
      await expect(page.locator('text=Resume Draft')).toBeVisible();
      await page.click('[data-testid="resume-draft"]');
      
      // Should restore previous progress
      await expect(page.locator('[data-testid="firstName"]')).toHaveValue('John');
      await expect(page.locator('[data-testid="lastName"]')).toHaveValue('Doe');
    });
  });

  test.describe('Different Application Types', () => {
    test('should handle MUMARIS+ application correctly', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Select MUMARIS+ application
      await page.click('[data-testid="application-type-mumaris"]');
      await page.click('[data-testid="target-country-saudi"]');
      await page.click('[data-testid="next-button"]');
      
      // Should show MUMARIS+-specific requirements
      await expect(page.locator('text=MUMARIS+ specific requirements')).toBeVisible();
      
      // Complete personal info for MUMARIS+
      const mumarisData = testApplications.mumaris;
      await page.fill('[data-testid="firstName"]', mumarisData.personalInfo.firstName);
      await page.fill('[data-testid="lastName"]', mumarisData.personalInfo.lastName);
      await page.fill('[data-testid="email"]', mumarisData.personalInfo.email);
      await page.fill('[data-testid="phone"]', mumarisData.personalInfo.phone);
      
      await page.click('[data-testid="next-button"]');
      
      // Should proceed to MUMARIS+-specific steps
      await expect(page.locator('text=MUMARIS+ Education Requirements')).toBeVisible();
    });

    test('should show different document requirements per application type', async ({ page }) => {
      // Test DataFlow requirements
      await page.goto('/dashboard/applications/new');
      await page.click('[data-testid="application-type-dataflow"]');
      await page.click('[data-testid="target-country-usa"]');
      
      // Navigate to documents step
      await page.click('[data-testid="skip-to-documents"]');
      
      await expect(page.locator('text=International Passport')).toBeVisible();
      await expect(page.locator('text=Education Certificate')).toBeVisible();
      await expect(page.locator('text=Professional License')).toBeVisible();
      await expect(page.locator('text=Work Experience Letter')).toBeVisible();
      
      // Test License Renewal (fewer requirements)
      await page.goto('/dashboard/applications/new');
      await page.click('[data-testid="application-type-license_renewal"]');
      await page.click('[data-testid="skip-to-documents"]');
      
      await expect(page.locator('text=International Passport')).toBeVisible();
      await expect(page.locator('text=Professional License')).toBeVisible();
      await expect(page.locator('text=Work Experience Letter')).not.toBeVisible();
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    test('should handle form validation errors gracefully', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Try to submit with invalid data
      await page.click('[data-testid="application-type-dataflow"]');
      await page.click('[data-testid="next-button"]');
      
      await page.fill('[data-testid="email"]', 'invalid-email');
      await page.fill('[data-testid="phone"]', 'invalid-phone');
      await page.fill('[data-testid="dateOfBirth"]', 'invalid-date');
      
      await page.click('[data-testid="next-button"]');
      
      // Should show multiple validation errors
      const errorMessages = page.locator('[data-testid="validation-error"]');
      const errorCount = await errorMessages.count();
      
      expect(errorCount).toBeGreaterThan(0);
    });

    test('should handle network errors during submission', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Complete a minimal application
      await page.click('[data-testid="application-type-dataflow"]');
      await page.click('[data-testid="target-country-usa"]');
      await page.click('[data-testid="skip-to-review"]');
      
      // Simulate network failure
      await page.route('**/api/applications', route => {
        route.abort('failed');
      });
      
      await page.click('[data-testid="submit-application"]');
      
      // Should show error message
      await expect(page.locator('text=Network error')).toBeVisible();
      await expect(page.locator('text=Please try again')).toBeVisible();
    });

    test('should prevent duplicate submissions', async ({ page }) => {
      await page.goto('/dashboard/applications/new');
      
      // Complete minimal application
      await page.click('[data-testid="application-type-dataflow"]');
      await page.click('[data-testid="target-country-usa"]');
      await page.click('[data-testid="skip-to-review"]');
      
      // Submit button should be disabled after first click
      await page.click('[data-testid="submit-application"]');
      
      const submitButton = page.locator('[data-testid="submit-application"]');
      await expect(submitButton).toBeDisabled();
    });
  });
});