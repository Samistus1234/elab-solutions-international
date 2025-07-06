# ELAB Solutions International - Testing Guide

## Overview

This document provides comprehensive guidance for testing the ELAB Solutions International platform. Our testing strategy covers end-to-end (E2E) testing, integration testing, and performance validation using Playwright.

## Testing Framework

We use **Playwright** for our E2E testing framework, providing:
- Cross-browser testing (Chrome, Firefox, Safari)
- Mobile and desktop viewport testing
- Network condition simulation
- Visual regression testing
- Comprehensive reporting

## Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies including Playwright
npm install

# Install Playwright browsers
npm run test:install
```

### 2. Run Tests

```bash
# Run all tests
npm test

# Run tests with UI (interactive mode)
npm run test:ui

# Run tests in headed mode (visible browser)
npm run test:headed

# Run specific test suites
npm run test:auth      # Authentication tests
npm run test:app       # Application workflow tests
npm run test:docs      # Document upload tests
npm run test:messaging # Messaging & stage tests
npm run test:coverage  # Coverage analysis tests
```

### 3. View Reports

```bash
# Open test report
npm run test:report
```

## Test Structure

### Test Files Organization

```
tests/
├── auth-navigation.spec.ts      # Authentication & navigation
├── application-workflow.spec.ts # Application creation workflow
├── document-upload.spec.ts      # Document management
├── stage-messaging.spec.ts      # Stage progression & messaging
├── test-report.spec.ts          # Coverage & reporting
├── fixtures/
│   └── test-data.ts            # Mock data & utilities
└── setup/
    ├── global-setup.ts         # Pre-test environment setup
    └── global-teardown.ts      # Post-test cleanup
```

### Test Data & Fixtures

Located in `tests/fixtures/test-data.ts`:

```typescript
// Test users for different roles
export const testUsers = {
  applicant: { email: 'test.applicant@example.com', ... },
  consultant: { email: 'test.consultant@example.com', ... },
  admin: { email: 'test.admin@example.com', ... },
  superAdmin: { email: 'test.superadmin@example.com', ... }
};

// Test applications
export const testApplications = {
  dataflow: { applicationType: 'dataflow', ... },
  mumaris: { applicationType: 'mumaris_plus', ... }
};

// Test documents
export const testDocuments = {
  passport: { fileName: 'test-passport.pdf', ... },
  diploma: { fileName: 'test-nursing-diploma.pdf', ... }
};
```

## Testing Features

### 1. Authentication & Navigation Tests

**File:** `auth-navigation.spec.ts`

Tests:
- Login/logout functionality
- Role-based access control
- Protected route redirection
- Navigation between dashboard sections
- User profile management
- Error handling for invalid credentials

**Key Test Scenarios:**
```typescript
test('should login successfully as applicant', async ({ page }) => {
  await TestHelpers.loginAs(page, 'applicant');
  await expect(page).toHaveURL(/.*dashboard/);
});

test('should redirect unauthenticated users to login', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL(/.*login/);
});
```

### 2. Application Workflow Tests

**File:** `application-workflow.spec.ts`

Tests:
- Multi-step form wizard navigation
- Application type selection (DataFlow, MUMARIS+, etc.)
- Form validation and error handling
- Draft saving and resuming
- Complete application submission
- Different application types workflows

**Key Test Scenarios:**
```typescript
test('should complete entire DataFlow application', async ({ page }) => {
  // Step 1: Application Type Selection
  await page.click('[data-testid="application-type-dataflow"]');
  
  // Step 2: Personal Information
  await TestHelpers.fillApplicationForm(page, testApplications.dataflow);
  
  // Step 3-5: Education, Experience, Documents
  // Step 6: Review and Submit
  await page.click('[data-testid="submit-application"]');
  
  await expect(page.locator('text=Application Submitted Successfully')).toBeVisible();
});
```

### 3. Document Upload & Management Tests

**File:** `document-upload.spec.ts`

Tests:
- Drag & drop file upload
- File type and size validation
- Document categorization
- Document preview and download
- Document replacement and deletion
- Admin document review workflow
- Upload progress and cancellation

**Key Test Scenarios:**
```typescript
test('should handle drag and drop upload', async ({ page }) => {
  const dropArea = page.locator('[data-testid="document-upload-area"]');
  await dropArea.setInputFiles({
    name: testDocuments.passport.fileName,
    mimeType: testDocuments.passport.mimeType,
    buffer: Buffer.from(testDocuments.passport.content)
  });
  
  await expect(page.locator('text=Upload complete')).toBeVisible();
});
```

### 4. Stage Progression & Messaging Tests

**File:** `stage-messaging.spec.ts`

Tests:
- Application stage timeline display
- Automated stage progression
- Admin stage management
- Real-time messaging functionality
- Message attachments and notifications
- Typing indicators and read receipts
- Conversation management

**Key Test Scenarios:**
```typescript
test('should send and receive messages', async ({ page }) => {
  await page.fill('[data-testid="message-input"]', testMessages.applicationInquiry.content);
  await page.click('[data-testid="send-message-button"]');
  
  await expect(page.locator('[data-testid="message-status-sent"]')).toBeVisible();
});
```

### 5. Coverage & Performance Tests

**File:** `test-report.spec.ts`

Tests:
- Feature coverage verification
- Performance metrics collection
- Accessibility testing
- Security validation
- Error boundary testing
- Browser compatibility
- Responsive design verification

## Test Utilities

### TestHelpers Class

Common utilities for test operations:

```typescript
// Login as specific user role
await TestHelpers.loginAs(page, 'applicant');

// Fill application form with test data
await TestHelpers.fillApplicationForm(page, testApplications.dataflow);

// Upload test files
await TestHelpers.uploadFile(page, '[data-testid="file-input"]', testDocuments.passport);

// Generate random test data
const email = TestHelpers.generateRandomEmail();
const phone = TestHelpers.generateRandomPhone();
const passport = TestHelpers.generateRandomPassport();

// Take screenshot for debugging
await TestHelpers.takeScreenshot(page, 'test-failure');
```

### Common Expectations

Reusable expectation patterns:

```typescript
// Dashboard loaded
await commonExpectations.dashboardLoaded(page);

// Application form ready
await commonExpectations.applicationFormLoaded(page);

// Document upload interface ready
await commonExpectations.documentUploadReady(page);

// Message interface loaded
await commonExpectations.messageInterfaceLoaded(page);
```

## Configuration

### Playwright Configuration

**File:** `playwright.config.ts`

Key settings:
- **Browsers:** Chrome, Firefox, Safari, Mobile Chrome/Safari
- **Timeout:** 30 seconds per test
- **Retries:** 2 retries in CI, 0 locally
- **Screenshots:** On failure only
- **Video:** Retain on failure
- **Trace:** On first retry

### Test Environment Setup

**Global Setup:** `tests/setup/global-setup.ts`
- Clears browser storage
- Sets test mode flags
- Initializes test environment

**Global Teardown:** `tests/setup/global-teardown.ts`
- Cleans up test data
- Resets application state

## Running Tests in CI/CD

### GitHub Actions Example

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npm run test:install
      
      - name: Run tests
        run: npm test
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## Test Data Management

### Mock Users

Four test users with different roles:
- **Applicant:** Submit applications, upload documents, send messages
- **Consultant:** Review applications, communicate with applicants
- **Admin:** Manage applications, access admin panel
- **Super Admin:** Full system access

### Test Applications

Pre-configured application data for:
- **DataFlow International:** US/Canada healthcare credential verification
- **MUMARIS+ Saudi Arabia:** Saudi healthcare licensing

### Test Documents

Sample documents for upload testing:
- **Passport:** PDF, 2MB
- **Diploma:** PDF, 3MB  
- **License:** JPG, 1.5MB
- **Work Letter:** PDF, 1MB

## Debugging Tests

### Debug Mode

```bash
# Run tests in debug mode (step-through)
npm run test:debug

# Run specific test file in debug mode
npx playwright test tests/auth-navigation.spec.ts --debug
```

### Console Logging

Tests automatically track console errors and warnings:

```typescript
test.beforeEach(async ({ page }) => {
  TestHelpers.setupConsoleErrorTracking(page);
});
```

### Screenshots & Videos

Automatic capture on test failure:
- Screenshots: `test-results/screenshots/`
- Videos: `test-results/videos/`
- Traces: `test-results/traces/`

## Performance Testing

### Load Time Validation

```typescript
test('should load pages within performance budget', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(3000); // 3 second budget
});
```

### Network Conditions

```typescript
// Simulate slow 3G
await page.route('**/*', route => {
  return route.continue({
    // Add artificial delay
  });
});
```

## Accessibility Testing

### Keyboard Navigation

```typescript
test('should be keyboard navigable', async ({ page }) => {
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
});
```

### Screen Reader Compatibility

```typescript
test('should have proper heading structure', async ({ page }) => {
  const h1Count = await page.locator('h1').count();
  expect(h1Count).toBe(1);
});
```

## Security Testing

### XSS Protection

```typescript
test('should prevent XSS attacks', async ({ page }) => {
  const maliciousScript = '<script>alert("XSS")</script>';
  await page.fill('[data-testid="message-input"]', maliciousScript);
  
  // Script should be escaped
  const content = await page.locator('[data-testid="message-content"]').textContent();
  expect(content?.includes('<script>')).toBeFalsy();
});
```

### Authentication Validation

```typescript
test('should require authentication for protected routes', async ({ page }) => {
  await page.goto('/dashboard/admin');
  await expect(page).toHaveURL(/.*login/);
});
```

## Best Practices

### 1. Test Independence
- Each test should be independent and not rely on other tests
- Use `beforeEach` hooks to set up clean state
- Clean up after tests in `afterEach` hooks

### 2. Stable Selectors
- Use `data-testid` attributes for reliable element selection
- Avoid CSS class selectors that may change
- Use semantic selectors when appropriate

### 3. Wait Strategies
- Use `waitForSelector` for element visibility
- Use `waitForLoadState` for page load completion
- Use `waitForURL` for navigation verification

### 4. Error Handling
- Test both success and failure scenarios
- Verify error messages are user-friendly
- Test edge cases and boundary conditions

### 5. Maintenance
- Update test data when application changes
- Keep test documentation current
- Review and refactor tests regularly

## Troubleshooting

### Common Issues

**Tests timing out:**
- Increase timeout in `playwright.config.ts`
- Use more specific wait conditions
- Check for network issues

**Flaky tests:**
- Add explicit waits before assertions
- Use `waitForSelector` instead of `toBeVisible`
- Check for race conditions

**Element not found:**
- Verify `data-testid` attributes exist
- Check element visibility timing
- Use browser dev tools to inspect elements

**Authentication issues:**
- Verify test user credentials
- Check session persistence
- Clear browser state between tests

### Getting Help

1. **Check test reports:** `npm run test:report`
2. **Run in debug mode:** `npm run test:debug`
3. **Review browser console:** Enable console logging
4. **Check screenshots:** Look in `test-results/` directory
5. **Verify test data:** Ensure mock data is correct

## Contributing

When adding new tests:

1. **Follow naming conventions:** `feature-name.spec.ts`
2. **Add test data:** Update `test-data.ts` fixtures
3. **Use utilities:** Leverage `TestHelpers` class
4. **Document test purpose:** Add clear descriptions
5. **Test multiple scenarios:** Success, failure, edge cases

For questions or issues, refer to the main project documentation or contact the development team.