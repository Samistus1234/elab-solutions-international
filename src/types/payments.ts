/**
 * Payment Type Definitions for ELAB Solutions International
 * 
 * This file contains all payment-related type definitions including
 * payment methods, transactions, and billing information.
 */

// Payment status
export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'refunded'
  | 'partially_refunded';

// Payment method types
export type PaymentMethodType = 
  | 'credit_card'
  | 'debit_card'
  | 'bank_transfer'
  | 'paypal'
  | 'stripe'
  | 'paystack'
  | 'mobile_money'
  | 'cryptocurrency';

// Currency codes
export type CurrencyCode = 
  | 'USD'
  | 'EUR'
  | 'GBP'
  | 'CAD'
  | 'AUD'
  | 'NGN'
  | 'GHS'
  | 'KES'
  | 'ZAR'
  | 'EGP'
  | 'MAD'
  | 'TND';

// Money amount
export interface Money {
  readonly amount: number;
  readonly currency: CurrencyCode;
}

// Payment method
export interface PaymentMethod {
  readonly id: string;
  readonly type: PaymentMethodType;
  readonly name: string;
  readonly last4?: string;
  readonly expiryMonth?: number;
  readonly expiryYear?: number;
  readonly brand?: string;
  readonly isDefault: boolean;
  readonly createdAt: string;
}

// Billing address
export interface BillingAddress {
  readonly firstName: string;
  readonly lastName: string;
  readonly company?: string;
  readonly addressLine1: string;
  readonly addressLine2?: string;
  readonly city: string;
  readonly state: string;
  readonly postalCode: string;
  readonly country: string;
}

// Payment transaction
export interface PaymentTransaction {
  readonly id: string;
  readonly amount: Money;
  readonly status: PaymentStatus;
  readonly paymentMethod: PaymentMethod;
  readonly description: string;
  readonly reference: string;
  readonly metadata?: Record<string, unknown>;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly completedAt?: string;
  readonly failureReason?: string;
}

// Payment intent
export interface PaymentIntent {
  readonly id: string;
  readonly amount: Money;
  readonly description: string;
  readonly clientSecret?: string;
  readonly status: PaymentStatus;
  readonly paymentMethodId?: string;
  readonly metadata?: Record<string, unknown>;
  readonly createdAt: string;
}

// Refund
export interface Refund {
  readonly id: string;
  readonly transactionId: string;
  readonly amount: Money;
  readonly reason: string;
  readonly status: PaymentStatus;
  readonly createdAt: string;
  readonly processedAt?: string;
}

// Invoice
export interface Invoice {
  readonly id: string;
  readonly number: string;
  readonly customerId: string;
  readonly amount: Money;
  readonly tax?: Money;
  readonly total: Money;
  readonly status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  readonly dueDate: string;
  readonly items: readonly InvoiceItem[];
  readonly createdAt: string;
  readonly paidAt?: string;
}

// Invoice item
export interface InvoiceItem {
  readonly id: string;
  readonly description: string;
  readonly quantity: number;
  readonly unitPrice: Money;
  readonly total: Money;
}

// Subscription
export interface Subscription {
  readonly id: string;
  readonly customerId: string;
  readonly planId: string;
  readonly status: 'active' | 'cancelled' | 'past_due' | 'unpaid';
  readonly currentPeriodStart: string;
  readonly currentPeriodEnd: string;
  readonly cancelAtPeriodEnd: boolean;
  readonly createdAt: string;
  readonly cancelledAt?: string;
}

// Payment plan
export interface PaymentPlan {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly amount: Money;
  readonly interval: 'month' | 'year';
  readonly intervalCount: number;
  readonly trialPeriodDays?: number;
  readonly features: readonly string[];
  readonly isActive: boolean;
}
