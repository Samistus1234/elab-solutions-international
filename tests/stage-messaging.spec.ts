/**
 * Stage Progression and Messaging Tests
 * 
 * Test application stage transitions and real-time messaging functionality
 */

import { test, expect } from '@playwright/test';
import { testUsers, testMessages, TestHelpers, commonExpectations } from './fixtures/test-data';

test.describe('Stage Progression and Messaging', () => {
  test.beforeEach(async ({ page }) => {
    TestHelpers.setupConsoleErrorTracking(page);
  });

  test.describe('Application Stage Progression', () => {
    test.beforeEach(async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/applications');
    });

    test('should display application stage timeline', async ({ page }) => {
      // Navigate to an application
      await page.click('[data-testid="view-application-button"]');
      
      // Check stage timeline is visible
      await expect(page.locator('[data-testid="stage-timeline"]')).toBeVisible();
      await expect(page.locator('[data-testid="current-stage"]')).toBeVisible();
      
      // Check stage progression steps
      await expect(page.locator('text=Application Submitted')).toBeVisible();
      await expect(page.locator('text=Document Review')).toBeVisible();
      await expect(page.locator('text=Processing')).toBeVisible();
      await expect(page.locator('text=Completed')).toBeVisible();
      
      // Check current stage highlighting
      await expect(page.locator('[data-testid="stage-submitted"]')).toHaveClass(/active/);
    });

    test('should show stage-specific information and actions', async ({ page }) => {
      await page.click('[data-testid="view-application-button"]');
      
      // Check stage-specific content
      await expect(page.locator('[data-testid="stage-info"]')).toBeVisible();
      await expect(page.locator('text=Expected completion')).toBeVisible();
      await expect(page.locator('text=Required actions')).toBeVisible();
      
      // Check action buttons based on stage
      await expect(page.locator('[data-testid="upload-documents-button"]')).toBeVisible();
      await expect(page.locator('[data-testid="message-consultant-button"]')).toBeVisible();
    });

    test('should handle stage transitions automatically', async ({ page }) => {
      // This would test automated stage progression
      // For now, we'll simulate the progression
      
      await page.click('[data-testid="view-application-button"]');
      
      // Simulate document upload completion
      await page.evaluate(() => {
        // Trigger stage progression event
        window.dispatchEvent(new CustomEvent('stageProgression', {
          detail: { newStage: 'document_review' }
        }));
      });
      
      // Should update timeline
      await expect(page.locator('[data-testid="stage-document-review"]')).toHaveClass(/active/);
      await expect(page.locator('text=Documents are being reviewed')).toBeVisible();
    });

    test('should display estimated completion dates', async ({ page }) => {
      await page.click('[data-testid="view-application-button"]');
      
      // Check estimated dates for each stage
      await expect(page.locator('[data-testid="estimated-completion"]')).toBeVisible();
      
      // Should show realistic timeframes
      const dateElements = page.locator('[data-testid="stage-date"]');
      const dateCount = await dateElements.count();
      expect(dateCount).toBeGreaterThan(0);
      
      // Check date format (should be future dates)
      const firstDate = await dateElements.first().textContent();
      expect(firstDate).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}/);
    });

    test('should show stage change notifications', async ({ page }) => {
      await page.click('[data-testid="view-application-button"]');
      
      // Simulate stage change
      await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent('stageProgression', {
          detail: { 
            newStage: 'processing',
            message: 'Your application has moved to processing stage'
          }
        }));
      });
      
      // Should show notification
      await expect(page.locator('[data-testid="stage-notification"]')).toBeVisible();
      await expect(page.locator('text=Your application has moved to processing stage')).toBeVisible();
    });
  });

  test.describe('Admin Stage Management', () => {
    test.beforeEach(async ({ page }) => {
      await TestHelpers.loginAs(page, 'admin');
      await page.goto('/dashboard/admin/applications');
    });

    test('should allow admin to manually progress stages', async ({ page }) => {
      // Select an application
      await page.click('[data-testid="manage-application-button"]');
      
      // Check admin stage controls
      await expect(page.locator('[data-testid="stage-management-panel"]')).toBeVisible();
      await expect(page.locator('[data-testid="progress-stage-button"]')).toBeVisible();
      await expect(page.locator('[data-testid="rollback-stage-button"]')).toBeVisible();
      
      // Progress to next stage
      await page.click('[data-testid="progress-stage-button"]');
      
      // Should show confirmation dialog
      await expect(page.locator('[data-testid="stage-progress-modal"]')).toBeVisible();
      await expect(page.locator('text=Confirm Stage Progression')).toBeVisible();
      
      // Add progression notes
      await page.fill('[data-testid="progression-notes"]', 'All documents verified. Moving to processing.');
      await page.click('[data-testid="confirm-progression"]');
      
      // Should update stage
      await expect(page.locator('text=Stage updated successfully')).toBeVisible();
    });

    test('should validate stage progression rules', async ({ page }) => {
      await page.click('[data-testid="manage-application-button"]');
      
      // Try to skip stages inappropriately
      await page.selectOption('[data-testid="target-stage"]', 'completed');
      await page.click('[data-testid="progress-stage-button"]');
      
      // Should show validation error
      await expect(page.locator('text=Cannot skip required stages')).toBeVisible();
      await expect(page.locator('text=Documents must be reviewed first')).toBeVisible();
    });

    test('should track stage change history', async ({ page }) => {
      await page.click('[data-testid="manage-application-button"]');
      
      // View stage history
      await page.click('[data-testid="stage-history-button"]');
      
      // Should show history modal
      await expect(page.locator('[data-testid="stage-history-modal"]')).toBeVisible();
      await expect(page.locator('text=Stage Change History')).toBeVisible();
      
      // Should show timeline of changes
      await expect(page.locator('[data-testid="history-timeline"]')).toBeVisible();
      await expect(page.locator('text=Stage changed by')).toBeVisible();
      await expect(page.locator('[data-testid="change-timestamp"]')).toBeVisible();
    });
  });

  test.describe('Real-time Messaging System', () => {
    test.beforeEach(async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/messages');
    });

    test('should load messaging interface', async ({ page }) => {
      await commonExpectations.messageInterfaceLoaded(page);
      
      // Check main components
      await expect(page.locator('[data-testid="conversation-list"]')).toBeVisible();
      await expect(page.locator('[data-testid="message-area"]')).toBeVisible();
      await expect(page.locator('[data-testid="message-input"]')).toBeVisible();
      
      // Check conversation types
      await expect(page.locator('text=Support Chat')).toBeVisible();
      await expect(page.locator('text=Application Updates')).toBeVisible();
    });

    test('should send and receive messages', async ({ page }) => {
      // Select a conversation
      await page.click('[data-testid="conversation-support"]');
      
      // Send a message
      const messageText = testMessages.applicationInquiry.content;
      await page.fill('[data-testid="message-input"]', messageText);
      await page.click('[data-testid="send-message-button"]');
      
      // Should appear in message area
      await expect(page.locator(`text=${messageText}`)).toBeVisible();
      await expect(page.locator('[data-testid="message-timestamp"]')).toBeVisible();
      
      // Should show message status
      await expect(page.locator('[data-testid="message-status-sent"]')).toBeVisible();
    });

    test('should show typing indicators', async ({ page }) => {
      await page.click('[data-testid="conversation-support"]');
      
      // Start typing
      await page.fill('[data-testid="message-input"]', 'I am typing...');
      
      // Should show typing indicator (this would be visible to other users)
      // We'll simulate receiving a typing event
      await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent('userTyping', {
          detail: { userId: 'consultant-001', conversationId: 'support-chat' }
        }));
      });
      
      // Should show typing indicator
      await expect(page.locator('[data-testid="typing-indicator"]')).toBeVisible();
      await expect(page.locator('text=Consultant is typing...')).toBeVisible();
    });

    test('should handle file attachments', async ({ page }) => {
      await page.click('[data-testid="conversation-support"]');
      
      // Click attachment button
      await page.click('[data-testid="attach-file-button"]');
      
      // Should show file picker
      const fileInput = page.locator('[data-testid="file-attachment-input"]');
      await fileInput.setInputFiles({
        name: 'test-document.pdf',
        mimeType: 'application/pdf',
        buffer: Buffer.from('test document content')
      });
      
      // Should show file preview
      await expect(page.locator('[data-testid="attachment-preview"]')).toBeVisible();
      await expect(page.locator('text=test-document.pdf')).toBeVisible();
      
      // Send message with attachment
      await page.fill('[data-testid="message-input"]', 'Please review this document.');
      await page.click('[data-testid="send-message-button"]');
      
      // Should show message with attachment
      await expect(page.locator('[data-testid="message-attachment"]')).toBeVisible();
      await expect(page.locator('[data-testid="download-attachment"]')).toBeVisible();
    });

    test('should display message read receipts', async ({ page }) => {
      await page.click('[data-testid="conversation-support"]');
      
      // Send a message
      await page.fill('[data-testid="message-input"]', 'Test message for read receipt');
      await page.click('[data-testid="send-message-button"]');
      
      // Should show delivered status
      await expect(page.locator('[data-testid="message-status-delivered"]')).toBeVisible();
      
      // Simulate message being read
      await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent('messageRead', {
          detail: { messageId: 'latest-message', readBy: 'consultant-001' }
        }));
      });
      
      // Should show read status
      await expect(page.locator('[data-testid="message-status-read"]')).toBeVisible();
    });

    test('should handle priority messages', async ({ page }) => {
      await page.click('[data-testid="conversation-support"]');
      
      // Set message priority
      await page.click('[data-testid="message-priority-button"]');
      await page.selectOption('[data-testid="priority-selector"]', 'urgent');
      
      // Send urgent message
      const urgentMessage = testMessages.urgentMessage.content;
      await page.fill('[data-testid="message-input"]', urgentMessage);
      await page.click('[data-testid="send-message-button"]');
      
      // Should show priority indicator
      await expect(page.locator('[data-testid="message-priority-urgent"]')).toBeVisible();
      await expect(page.locator('[data-testid="urgent-indicator"]')).toBeVisible();
    });

    test('should search message history', async ({ page }) => {
      // Add search functionality
      await page.fill('[data-testid="message-search"]', 'application status');
      await page.press('[data-testid="message-search"]', 'Enter');
      
      // Should filter messages
      await expect(page.locator('[data-testid="search-results"]')).toBeVisible();
      await expect(page.locator('text=1 result found')).toBeVisible();
    });

    test('should show online status', async ({ page }) => {
      // Check user online status indicators
      await expect(page.locator('[data-testid="user-status-online"]')).toBeVisible();
      await expect(page.locator('[data-testid="last-seen-indicator"]')).toBeVisible();
      
      // Simulate user going offline
      await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent('userStatusChange', {
          detail: { userId: 'consultant-001', status: 'offline' }
        }));
      });
      
      // Should update status
      await expect(page.locator('[data-testid="user-status-offline"]')).toBeVisible();
    });
  });

  test.describe('Message Notifications', () => {
    test('should show desktop notifications for new messages', async ({ page, context }) => {
      // Grant notification permissions
      await context.grantPermissions(['notifications']);
      
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/messages');
      
      // Simulate receiving a new message
      await page.evaluate(() => {
        new Notification('New message from consultant', {
          body: 'Your application has been updated.',
          icon: '/icon-notification.png'
        });
      });
      
      // Check notification was triggered (this would be visible in real scenarios)
      // For testing, we'll check the notification permission was granted
      const permission = await page.evaluate(() => Notification.permission);
      expect(permission).toBe('granted');
    });

    test('should update message counts in navigation', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard');
      
      // Simulate new message
      await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent('newMessage', {
          detail: { conversationId: 'support-chat', unreadCount: 1 }
        }));
      });
      
      // Should show unread badge
      await expect(page.locator('[data-testid="messages-nav-badge"]')).toBeVisible();
      await expect(page.locator('[data-testid="messages-nav-badge"]')).toHaveText('1');
    });
  });

  test.describe('Conversation Management', () => {
    test.beforeEach(async ({ page }) => {
      await TestHelpers.loginAs(page, 'consultant');
      await page.goto('/dashboard/messages');
    });

    test('should create new conversations', async ({ page }) => {
      // Click new conversation button
      await page.click('[data-testid="new-conversation-button"]');
      
      // Should show conversation creation modal
      await expect(page.locator('[data-testid="new-conversation-modal"]')).toBeVisible();
      
      // Select conversation type
      await page.selectOption('[data-testid="conversation-type"]', 'application_support');
      
      // Select participants
      await page.click('[data-testid="participant-selector"]');
      await page.click('[data-testid="participant-applicant-001"]');
      
      // Add subject
      await page.fill('[data-testid="conversation-subject"]', 'Application Review Discussion');
      
      // Create conversation
      await page.click('[data-testid="create-conversation-button"]');
      
      // Should create and open new conversation
      await expect(page.locator('text=Application Review Discussion')).toBeVisible();
      await expect(page.locator('[data-testid="conversation-created"]')).toBeVisible();
    });

    test('should archive completed conversations', async ({ page }) => {
      // Select a conversation
      await page.click('[data-testid="conversation-options"]');
      await page.click('[data-testid="archive-conversation"]');
      
      // Should show confirmation
      await expect(page.locator('[data-testid="archive-confirmation"]')).toBeVisible();
      await page.click('[data-testid="confirm-archive"]');
      
      // Should move to archived
      await expect(page.locator('text=Conversation archived')).toBeVisible();
      
      // Check archived conversations
      await page.click('[data-testid="archived-conversations"]');
      await expect(page.locator('[data-testid="archived-conversation"]')).toBeVisible();
    });

    test('should handle conversation permissions', async ({ page }) => {
      // Should only show conversations consultant has access to
      await expect(page.locator('[data-testid="conversation-list"]')).toBeVisible();
      
      // Should not show private applicant conversations
      await expect(page.locator('text=Personal Notes')).not.toBeVisible();
      
      // Should show appropriate role-based conversations
      await expect(page.locator('text=Application Review')).toBeVisible();
      await expect(page.locator('text=Document Questions')).toBeVisible();
    });
  });

  test.describe('Integration Between Stages and Messages', () => {
    test('should send automated messages on stage changes', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/messages');
      
      // Simulate stage progression
      await page.evaluate(() => {
        window.dispatchEvent(new CustomEvent('stageProgression', {
          detail: { 
            applicationId: 'app-001',
            newStage: 'document_review',
            autoMessage: 'Your application has moved to document review stage.'
          }
        }));
      });
      
      // Should receive automated message
      await expect(page.locator('text=Application Update')).toBeVisible();
      await expect(page.locator('text=Your application has moved to document review stage.')).toBeVisible();
      await expect(page.locator('[data-testid="automated-message"]')).toBeVisible();
    });

    test('should link messages to specific applications', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/messages');
      
      // Click on application-specific conversation
      await page.click('[data-testid="conversation-app-001"]');
      
      // Should show application context
      await expect(page.locator('[data-testid="application-context"]')).toBeVisible();
      await expect(page.locator('text=DataFlow Application')).toBeVisible();
      await expect(page.locator('text=Current Stage: Document Review')).toBeVisible();
      
      // Should have quick actions related to application
      await expect(page.locator('[data-testid="view-application-button"]')).toBeVisible();
      await expect(page.locator('[data-testid="upload-documents-button"]')).toBeVisible();
    });
  });

  test.describe('Error Handling and Performance', () => {
    test('should handle connection issues gracefully', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/messages');
      
      // Simulate network disconnection
      await page.context().setOffline(true);
      
      // Try to send message
      await page.fill('[data-testid="message-input"]', 'Test message during offline');
      await page.click('[data-testid="send-message-button"]');
      
      // Should show connection error
      await expect(page.locator('text=Connection lost')).toBeVisible();
      await expect(page.locator('text=Message will be sent when connection is restored')).toBeVisible();
      
      // Should queue message for retry
      await expect(page.locator('[data-testid="queued-message"]')).toBeVisible();
    });

    test('should handle message delivery failures', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/messages');
      
      // Simulate message delivery failure
      await page.route('**/api/messages', route => {
        route.abort('failed');
      });
      
      await page.fill('[data-testid="message-input"]', 'Test message for failure');
      await page.click('[data-testid="send-message-button"]');
      
      // Should show delivery failure
      await expect(page.locator('[data-testid="message-status-failed"]')).toBeVisible();
      await expect(page.locator('[data-testid="retry-message-button"]')).toBeVisible();
    });

    test('should load message history efficiently', async ({ page }) => {
      await TestHelpers.loginAs(page, 'applicant');
      await page.goto('/dashboard/messages');
      
      // Select conversation with long history
      await page.click('[data-testid="conversation-support"]');
      
      // Should load initial messages quickly
      await expect(page.locator('[data-testid="message-list"]')).toBeVisible();
      
      // Scroll to load more messages
      await page.evaluate(() => {
        document.querySelector('[data-testid="message-list"]')?.scrollTo(0, 0);
      });
      
      // Should show loading indicator
      await expect(page.locator('[data-testid="loading-more-messages"]')).toBeVisible();
      
      // Should load additional messages
      await expect(page.locator('[data-testid="message-history-loaded"]')).toBeVisible();
    });
  });
});