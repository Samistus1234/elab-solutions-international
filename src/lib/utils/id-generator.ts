/**
 * ID Generation Utilities
 * 
 * Simple utilities for generating unique IDs
 */

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function generateApplicationId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `app-${timestamp}-${random}`;
}

export function generateDocumentId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `doc-${timestamp}-${random}`;
}