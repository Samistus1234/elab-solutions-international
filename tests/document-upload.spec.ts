/**
 * Document Upload and Review System Tests
 * 
 * Test document management functionality including upload, validation, and review
 */

import { test, expect } from '@playwright/test';
import { testUsers, testDocuments, TestHelpers, commonExpectations } from './fixtures/test-data';
import path from 'path';

test.describe('Document Upload and Review System', () => {
  test.beforeEach(async ({ page }) => {
    TestHelpers.setupConsoleErrorTracking(page);
  });

  test.describe('Document Upload Interface', () => {
    test.beforeEach(async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/documents');
    });

    test('should load document upload interface', async ({ page }) => {
      await commonExpectations.documentUploadReady(page);
      
      // Check main upload components
      await expect(page.locator('[data-testid="document-upload-area"]')).toBeVisible();
      await expect(page.locator('[data-testid="document-requirements"]')).toBeVisible();
      await expect(page.locator('[data-testid="upload-progress"]')).toBeVisible();
      
      // Check document type selection
      await expect(page.locator('text=Passport Copy')).toBeVisible();
      await expect(page.locator('text=Education Certificate')).toBeVisible();
      await expect(page.locator('text=Professional License')).toBeVisible();
      await expect(page.locator('text=Work Experience Letter')).toBeVisible();
    });

    test('should show document requirements and guidelines', async ({ page }) => {
      // Check requirements section
      await expect(page.locator('text=Document Requirements')).toBeVisible();
      await expect(page.locator('text=Accepted formats: PDF, JPG, PNG')).toBeVisible();
      await expect(page.locator('text=Maximum file size: 10MB')).toBeVisible();
      await expect(page.locator('text=Documents must be clear and legible')).toBeVisible();
      
      // Check specific requirements for each document type
      await page.click('[data-testid="document-type-passport"]');
      await expect(page.locator('text=Must be valid for at least 6 months')).toBeVisible();
      await expect(page.locator('text=All pages including photo page')).toBeVisible();
    });

    test('should handle drag and drop upload', async ({ page }) => {
      // Create a test file for upload
      const testFile = TestHelpers.createTestFile(
        testDocuments.passport.fileName,
        testDocuments.passport.mimeType,
        testDocuments.passport.fileSize
      );

      // Simulate drag and drop
      const dropArea = page.locator('[data-testid="document-upload-area"]');
      
      // Check initial state
      await expect(dropArea).toHaveClass(/border-dashed/);
      await expect(page.locator('text=Drag and drop files here')).toBeVisible();

      // Simulate file drop
      await dropArea.setInputFiles({
        name: testFile.name,
        mimeType: testFile.type,
        buffer: Buffer.from(testDocuments.passport.content)
      });

      // Should show upload progress
      await expect(page.locator('[data-testid="upload-progress-bar"]')).toBeVisible();
      await expect(page.locator('text=Uploading...')).toBeVisible();

      // Wait for upload completion
      await expect(page.locator('text=Upload complete')).toBeVisible();
      await expect(page.locator(`text=${testDocuments.passport.fileName}`)).toBeVisible();
    });

    test('should handle file selection via browse button', async ({ page }) => {
      // Click browse button
      await page.click('[data-testid="browse-files-button"]');
      
      // Simulate file selection
      const fileInput = page.locator('[data-testid="file-input"]');
      await fileInput.setInputFiles({
        name: testDocuments.diploma.fileName,
        mimeType: testDocuments.diploma.mimeType,
        buffer: Buffer.from(testDocuments.diploma.content)
      });

      // Should show file selected
      await expect(page.locator(`text=${testDocuments.diploma.fileName}`)).toBeVisible();
      await expect(page.locator('[data-testid="upload-button"]')).toBeVisible();
      
      // Start upload
      await page.click('[data-testid="upload-button"]');
      
      // Should show progress and completion
      await expect(page.locator('[data-testid="upload-progress"]')).toBeVisible();
      await expect(page.locator('text=Upload complete')).toBeVisible();
    });

    test('should validate file types', async ({ page }) => {
      // Try to upload invalid file type
      const invalidFile = TestHelpers.createTestFile('test.txt', 'text/plain', 1000);
      
      const dropArea = page.locator('[data-testid="document-upload-area"]');
      await dropArea.setInputFiles({
        name: invalidFile.name,
        mimeType: invalidFile.type,
        buffer: Buffer.from('test content')
      });

      // Should show error message
      await expect(page.locator('text=Invalid file type')).toBeVisible();
      await expect(page.locator('text=Only PDF, JPG, and PNG files are allowed')).toBeVisible();
    });

    test('should validate file size', async ({ page }) => {
      // Try to upload oversized file (>10MB)
      const oversizedFile = TestHelpers.createTestFile(
        'oversized-document.pdf', 
        'application/pdf', 
        11 * 1024 * 1024 // 11MB
      );
      
      const dropArea = page.locator('[data-testid="document-upload-area"]');
      await dropArea.setInputFiles({
        name: oversizedFile.name,
        mimeType: oversizedFile.type,
        buffer: Buffer.alloc(11 * 1024 * 1024) // Create 11MB buffer
      });

      // Should show error message
      await expect(page.locator('text=File too large')).toBeVisible();
      await expect(page.locator('text=Maximum file size is 10MB')).toBeVisible();
    });

    test('should categorize uploaded documents', async ({ page }) => {
      // Upload passport document
      await page.click('[data-testid="document-type-passport"]');
      const passportFile = page.locator('[data-testid="file-input"]');
      await passportFile.setInputFiles({
        name: testDocuments.passport.fileName,
        mimeType: testDocuments.passport.mimeType,
        buffer: Buffer.from(testDocuments.passport.content)
      });
      await page.click('[data-testid="upload-button"]');
      
      // Wait for upload completion
      await expect(page.locator('text=Upload complete')).toBeVisible();
      
      // Check document appears in correct category
      await expect(page.locator('[data-testid="passport-documents"]')).toContainText(testDocuments.passport.fileName);
      
      // Upload education document
      await page.click('[data-testid="document-type-education"]');
      const educationFile = page.locator('[data-testid="file-input"]');
      await educationFile.setInputFiles({
        name: testDocuments.diploma.fileName,
        mimeType: testDocuments.diploma.mimeType,
        buffer: Buffer.from(testDocuments.diploma.content)
      });
      await page.click('[data-testid="upload-button"]');
      
      await expect(page.locator('text=Upload complete')).toBeVisible();
      await expect(page.locator('[data-testid="education-documents"]')).toContainText(testDocuments.diploma.fileName);
    });

    test('should show upload progress with cancellation', async ({ page }) => {
      // Start uploading a large file
      const largeFile = TestHelpers.createTestFile(
        'large-document.pdf',
        'application/pdf',
        5 * 1024 * 1024 // 5MB
      );
      
      const dropArea = page.locator('[data-testid="document-upload-area"]');
      await dropArea.setInputFiles({
        name: largeFile.name,
        mimeType: largeFile.type,
        buffer: Buffer.alloc(5 * 1024 * 1024)
      });

      // Should show progress bar
      await expect(page.locator('[data-testid="upload-progress-bar"]')).toBeVisible();
      await expect(page.locator('[data-testid="cancel-upload-button"]')).toBeVisible();
      
      // Cancel upload
      await page.click('[data-testid="cancel-upload-button"]');
      
      // Should show cancellation
      await expect(page.locator('text=Upload cancelled')).toBeVisible();
      await expect(page.locator('[data-testid="upload-progress-bar"]')).not.toBeVisible();
    });
  });

  test.describe('Document Management', () => {
    test.beforeEach(async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/documents');
      
      // Upload a test document first
      await page.click('[data-testid="document-type-passport"]');
      const fileInput = page.locator('[data-testid="file-input"]');
      await fileInput.setInputFiles({
        name: testDocuments.passport.fileName,
        mimeType: testDocuments.passport.mimeType,
        buffer: Buffer.from(testDocuments.passport.content)
      });
      await page.click('[data-testid="upload-button"]');
      await expect(page.locator('text=Upload complete')).toBeVisible();
    });

    test('should display uploaded documents list', async ({ page }) => {
      // Check document appears in list
      await expect(page.locator('[data-testid="documents-list"]')).toBeVisible();
      await expect(page.locator(`text=${testDocuments.passport.fileName}`)).toBeVisible();
      
      // Check document metadata
      await expect(page.locator('text=Passport Copy')).toBeVisible();
      await expect(page.locator('text=2.0 MB')).toBeVisible();
      await expect(page.locator('text=PDF')).toBeVisible();
      
      // Check upload date
      const today = new Date().toLocaleDateString();
      await expect(page.locator(`text=${today}`)).toBeVisible();
    });

    test('should preview documents', async ({ page }) => {
      // Click preview button
      await page.click('[data-testid="preview-document-button"]');
      
      // Should open preview modal
      await expect(page.locator('[data-testid="document-preview-modal"]')).toBeVisible();
      await expect(page.locator('[data-testid="document-preview-content"]')).toBeVisible();
      
      // Check modal controls
      await expect(page.locator('[data-testid="close-preview-button"]')).toBeVisible();
      await expect(page.locator('[data-testid="download-document-button"]')).toBeVisible();
      await expect(page.locator('[data-testid="delete-document-button"]')).toBeVisible();
      
      // Close preview
      await page.click('[data-testid="close-preview-button"]');
      await expect(page.locator('[data-testid="document-preview-modal"]')).not.toBeVisible();
    });

    test('should download documents', async ({ page }) => {
      // Set up download tracking
      const downloadPromise = page.waitForEvent('download');
      
      // Click download button
      await page.click('[data-testid="download-document-button"]');
      
      // Wait for download to start
      const download = await downloadPromise;
      
      // Check download properties
      expect(download.suggestedFilename()).toBe(testDocuments.passport.fileName);
    });

    test('should replace existing documents', async ({ page }) => {
      // Check current document exists
      await expect(page.locator(`text=${testDocuments.passport.fileName}`)).toBeVisible();
      
      // Upload replacement document
      await page.click('[data-testid="replace-document-button"]');
      
      const newPassportFile = TestHelpers.createTestFile(
        'new-passport-copy.pdf',
        'application/pdf',
        testDocuments.passport.fileSize
      );
      
      const fileInput = page.locator('[data-testid="file-input"]');
      await fileInput.setInputFiles({
        name: newPassportFile.name,
        mimeType: newPassportFile.type,
        buffer: Buffer.from('new passport content')
      });
      
      await page.click('[data-testid="upload-button"]');
      await expect(page.locator('text=Document replaced successfully')).toBeVisible();
      
      // Should show new document
      await expect(page.locator('text=new-passport-copy.pdf')).toBeVisible();
      await expect(page.locator(`text=${testDocuments.passport.fileName}`)).not.toBeVisible();
    });

    test('should delete documents with confirmation', async ({ page }) => {
      // Click delete button
      await page.click('[data-testid="delete-document-button"]');
      
      // Should show confirmation dialog
      await expect(page.locator('[data-testid="delete-confirmation-modal"]')).toBeVisible();
      await expect(page.locator('text=Are you sure you want to delete this document?')).toBeVisible();
      await expect(page.locator('[data-testid="confirm-delete-button"]')).toBeVisible();
      await expect(page.locator('[data-testid="cancel-delete-button"]')).toBeVisible();
      
      // Cancel deletion
      await page.click('[data-testid="cancel-delete-button"]');
      await expect(page.locator('[data-testid="delete-confirmation-modal"]')).not.toBeVisible();
      
      // Document should still exist
      await expect(page.locator(`text=${testDocuments.passport.fileName}`)).toBeVisible();
      
      // Try deletion again and confirm
      await page.click('[data-testid="delete-document-button"]');
      await page.click('[data-testid="confirm-delete-button"]');
      
      // Should show success message
      await expect(page.locator('text=Document deleted successfully')).toBeVisible();
      
      // Document should be removed
      await expect(page.locator(`text=${testDocuments.passport.fileName}`)).not.toBeVisible();
    });
  });

  test.describe('Document Review System (Admin/Consultant)', () => {
    test.beforeEach(async ({ page }) => {
      // First, login as applicant and upload documents
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/documents');
      
      // Upload test documents
      await page.click('[data-testid="document-type-passport"]');
      let fileInput = page.locator('[data-testid="file-input"]');
      await fileInput.setInputFiles({
        name: testDocuments.passport.fileName,
        mimeType: testDocuments.passport.mimeType,
        buffer: Buffer.from(testDocuments.passport.content)
      });
      await page.click('[data-testid="upload-button"]');
      await expect(page.locator('text=Upload complete')).toBeVisible();
      
      // Logout and login as consultant
      await page.click('[data-testid="user-menu-button"]');
      await page.click('[data-testid="logout-button"]');
      await TestHelpers.loginAs(page, 'consultant');
    });

    test('should display document review queue', async ({ page }) => {
      await page.goto('/dashboard/review');
      
      // Check review interface
      await expect(page.locator('[data-testid="document-review-queue"]')).toBeVisible();
      await expect(page.locator('text=Pending Review')).toBeVisible();
      
      // Should show documents awaiting review
      await expect(page.locator(`text=${testDocuments.passport.fileName}`)).toBeVisible();
      await expect(page.locator('text=Passport Copy')).toBeVisible();
      await expect(page.locator('text=Pending')).toBeVisible();
    });

    test('should review and approve documents', async ({ page }) => {
      await page.goto('/dashboard/review');
      
      // Click review button for document
      await page.click('[data-testid="review-document-button"]');
      
      // Should open review modal
      await expect(page.locator('[data-testid="document-review-modal"]')).toBeVisible();
      await expect(page.locator('[data-testid="document-preview"]')).toBeVisible();
      
      // Check review options
      await expect(page.locator('[data-testid="approve-document-button"]')).toBeVisible();
      await expect(page.locator('[data-testid="reject-document-button"]')).toBeVisible();
      await expect(page.locator('[data-testid="request-revision-button"]')).toBeVisible();
      
      // Add review notes
      await page.fill('[data-testid="review-notes"]', 'Document is clear and valid. All requirements met.');
      
      // Approve document
      await page.click('[data-testid="approve-document-button"]');
      
      // Should show success message
      await expect(page.locator('text=Document approved successfully')).toBeVisible();
      
      // Document status should update
      await expect(page.locator('text=Approved')).toBeVisible();
    });

    test('should reject documents with feedback', async ({ page }) => {
      await page.goto('/dashboard/review');
      
      await page.click('[data-testid="review-document-button"]');
      
      // Add rejection reason
      await page.fill('[data-testid="review-notes"]', 'Image quality is poor. Please upload a clearer scan.');
      await page.selectOption('[data-testid="rejection-reason"]', 'quality_issues');
      
      // Reject document
      await page.click('[data-testid="reject-document-button"]');
      
      // Should show confirmation
      await expect(page.locator('text=Document rejected')).toBeVisible();
      
      // Status should update
      await expect(page.locator('text=Rejected')).toBeVisible();
    });

    test('should request document revisions', async ({ page }) => {
      await page.goto('/dashboard/review');
      
      await page.click('[data-testid="review-document-button"]');
      
      // Request revision
      await page.fill('[data-testid="review-notes"]', 'Please upload all passport pages including the bio-data page.');
      await page.click('[data-testid="request-revision-button"]');
      
      // Should show success message
      await expect(page.locator('text=Revision requested')).toBeVisible();
      
      // Status should update
      await expect(page.locator('text=Revision Required')).toBeVisible();
    });

    test('should filter documents by status', async ({ page }) => {
      await page.goto('/dashboard/review');
      
      // Check filter options
      await expect(page.locator('[data-testid="status-filter"]')).toBeVisible();
      await expect(page.locator('option[value="pending"]')).toBeVisible();
      await expect(page.locator('option[value="approved"]')).toBeVisible();
      await expect(page.locator('option[value="rejected"]')).toBeVisible();
      
      // Filter by pending
      await page.selectOption('[data-testid="status-filter"]', 'pending');
      await expect(page.locator('text=Pending')).toBeVisible();
      
      // Filter by approved (should show empty initially)
      await page.selectOption('[data-testid="status-filter"]', 'approved');
      await expect(page.locator('text=No approved documents found')).toBeVisible();
    });

    test('should track review history', async ({ page }) => {
      await page.goto('/dashboard/review');
      
      // Review a document first
      await page.click('[data-testid="review-document-button"]');
      await page.fill('[data-testid="review-notes"]', 'Initial review completed.');
      await page.click('[data-testid="approve-document-button"]');
      
      // Check review history
      await page.click('[data-testid="view-history-button"]');
      
      // Should show review timeline
      await expect(page.locator('[data-testid="review-history-modal"]')).toBeVisible();
      await expect(page.locator('text=Review History')).toBeVisible();
      await expect(page.locator('text=Approved by')).toBeVisible();
      await expect(page.locator(`text=${testUsers.consultant.name}`)).toBeVisible();
      await expect(page.locator('text=Initial review completed.')).toBeVisible();
    });
  });

  test.describe('Document Notifications', () => {
    test('should notify applicant of review status changes', async ({ page }) => {
      // This test would involve the messaging system
      // Testing notifications when documents are approved/rejected
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/messages');
      
      // Should show notification about document review
      await expect(page.locator('text=Document Review Update')).toBeVisible();
      await expect(page.locator('text=Your passport document has been reviewed')).toBeVisible();
    });

    test('should send reminder notifications for missing documents', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard');
      
      // Should show reminder for missing documents
      await expect(page.locator('[data-testid="missing-documents-alert"]')).toBeVisible();
      await expect(page.locator('text=Missing Required Documents')).toBeVisible();
      await expect(page.locator('text=Education Certificate')).toBeVisible();
      await expect(page.locator('text=Professional License')).toBeVisible();
    });
  });

  test.describe('Error Handling and Edge Cases', () => {
    test('should handle upload failures gracefully', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/documents');
      
      // Simulate network failure during upload
      await page.route('**/api/documents/upload', route => {
        route.abort('failed');
      });
      
      const dropArea = page.locator('[data-testid="document-upload-area"]');
      await dropArea.setInputFiles({
        name: testDocuments.passport.fileName,
        mimeType: testDocuments.passport.mimeType,
        buffer: Buffer.from(testDocuments.passport.content)
      });
      
      // Should show error message
      await expect(page.locator('text=Upload failed')).toBeVisible();
      await expect(page.locator('text=Please try again')).toBeVisible();
      await expect(page.locator('[data-testid="retry-upload-button"]')).toBeVisible();
    });

    test('should handle corrupted file uploads', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/documents');
      
      // Try to upload corrupted file
      const corruptedFile = TestHelpers.createTestFile('corrupted.pdf', 'application/pdf', 1000);
      
      const dropArea = page.locator('[data-testid="document-upload-area"]');
      await dropArea.setInputFiles({
        name: corruptedFile.name,
        mimeType: corruptedFile.type,
        buffer: Buffer.from('corrupted data that is not a valid PDF')
      });
      
      // Should detect and reject corrupted file
      await expect(page.locator('text=File appears to be corrupted')).toBeVisible();
      await expect(page.locator('text=Please upload a valid PDF file')).toBeVisible();
    });

    test('should prevent duplicate document uploads', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/documents');
      
      // Upload document first time
      await page.click('[data-testid="document-type-passport"]');
      let fileInput = page.locator('[data-testid="file-input"]');
      await fileInput.setInputFiles({
        name: testDocuments.passport.fileName,
        mimeType: testDocuments.passport.mimeType,
        buffer: Buffer.from(testDocuments.passport.content)
      });
      await page.click('[data-testid="upload-button"]');
      await expect(page.locator('text=Upload complete')).toBeVisible();
      
      // Try to upload same document again
      await page.click('[data-testid="document-type-passport"]');
      fileInput = page.locator('[data-testid="file-input"]');
      await fileInput.setInputFiles({
        name: testDocuments.passport.fileName,
        mimeType: testDocuments.passport.mimeType,
        buffer: Buffer.from(testDocuments.passport.content)
      });
      
      // Should show duplicate warning
      await expect(page.locator('text=Document already exists')).toBeVisible();
      await expect(page.locator('text=Would you like to replace the existing document?')).toBeVisible();
    });
  });
});