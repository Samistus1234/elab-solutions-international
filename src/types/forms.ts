/**
 * Form Type Definitions for ELAB Solutions International
 * 
 * This file contains all form-related type definitions including
 * form validation, field types, and form state management.
 */

// Form field types
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel' 
  | 'url' 
  | 'search'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'date'
  | 'datetime-local'
  | 'time'
  | 'file'
  | 'hidden';

// Validation rules
export interface ValidationRule {
  readonly type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  readonly value?: string | number | RegExp;
  readonly message: string;
}

// Form field definition
export interface FormField {
  readonly name: string;
  readonly type: FieldType;
  readonly label: string;
  readonly placeholder?: string;
  readonly defaultValue?: unknown;
  readonly options?: readonly { value: string; label: string }[];
  readonly validation?: readonly ValidationRule[];
  readonly disabled?: boolean;
  readonly required?: boolean;
  readonly description?: string;
}

// Form schema
export interface FormSchema {
  readonly fields: readonly FormField[];
  readonly submitLabel?: string;
  readonly resetLabel?: string;
  readonly layout?: 'vertical' | 'horizontal' | 'inline';
}

// Form submission data
export interface FormSubmission {
  readonly formId: string;
  readonly data: Record<string, unknown>;
  readonly timestamp: string;
  readonly userId?: string;
}

// Form validation error
export interface FormValidationError {
  readonly field: string;
  readonly message: string;
  readonly code: string;
}

// Form state
export interface FormState<T = Record<string, unknown>> {
  readonly values: T;
  readonly errors: readonly FormValidationError[];
  readonly touched: Record<keyof T, boolean>;
  readonly isValid: boolean;
  readonly isSubmitting: boolean;
  readonly isDirty: boolean;
}

// Form configuration
export interface FormConfig {
  readonly validateOnChange?: boolean;
  readonly validateOnBlur?: boolean;
  readonly resetOnSubmit?: boolean;
  readonly enableReinitialize?: boolean;
}
