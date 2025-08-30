/**
 * Referral Program Store
 * 
 * Zustand store for comprehensive referral program management
 */

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { generateId } from '@/lib/utils/id-generator';

// ============================================================================
// TYPES
// ============================================================================

export enum ReferralTier {
  STARTER = 'starter',
  CHAMPION = 'champion',
  AMBASSADOR = 'ambassador'
}

export enum ReferralStatus {
  PENDING = 'pending',
  CLICKED = 'clicked',
  SIGNED_UP = 'signed_up',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled'
}

export enum ServiceType {
  DATAFLOW = 'dataflow',
  NCLEX = 'nclex',
  UK_NMC = 'uk_nmc',
  AUSTRALIA = 'australia',
  CONSULTATION = 'consultation',
  LICENSING = 'licensing'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  PAID = 'paid',
  FAILED = 'failed'
}

export interface ReferralReward {
  serviceType: ServiceType;
  amount: number;
  currency: string;
  tier: ReferralTier;
}

export interface Referrer {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  profession: string;
  tier: ReferralTier;
  referralCode: string;
  referralLink: string;
  joinedAt: string;
  totalReferrals: number;
  successfulReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  conversionRate: number;
  isActive: boolean;
  lastActivityAt: string;
  paymentInfo?: {
    method: 'bank' | 'paypal' | 'stripe';
    details: Record<string, any>;
  };
}

export interface Referral {
  id: string;
  referrerId: string;
  refereeId?: string;
  referralCode: string;
  refereeName: string;
  refereeEmail: string;
  serviceType: ServiceType;
  status: ReferralStatus;
  clickedAt?: string;
  signedUpAt?: string;
  completedAt?: string;
  expiresAt: string;
  rewardAmount: number;
  currency: string;
  notes?: string;
  metadata: {
    sourceUrl?: string;
    userAgent?: string;
    ipAddress?: string;
    conversionSteps: string[];
  };
}

export interface ReferralPayment {
  id: string;
  referrerId: string;
  referralIds: string[];
  amount: number;
  currency: string;
  status: PaymentStatus;
  scheduledAt: string;
  paidAt?: string;
  paymentMethod: string;
  transactionId?: string;
  notes?: string;
}

export interface ReferralNotification {
  id: string;
  referrerId: string;
  type: 'new_referral' | 'referral_completed' | 'payment_sent' | 'tier_upgrade' | 'milestone_reached';
  title: string;
  message: string;
  data?: Record<string, any>;
  sentAt: string;
  readAt?: string;
  actionUrl?: string;
}

export interface ReferralAnalytics {
  totalClicks: number;
  uniqueClicks: number;
  signups: number;
  conversions: number;
  conversionRate: number;
  clickThroughRate: number;
  averageTimeToConversion: number;
  topSources: Array<{ source: string; clicks: number }>;
  serviceBreakdown: Array<{ service: ServiceType; count: number; earnings: number }>;
  monthlyStats: Array<{
    month: string;
    referrals: number;
    conversions: number;
    earnings: number;
  }>;
}

// ============================================================================
// REWARD CONFIGURATION
// ============================================================================

const REFERRAL_REWARDS: Record<ReferralTier, Record<ServiceType, ReferralReward>> = {
  [ReferralTier.STARTER]: {
    [ServiceType.DATAFLOW]: { serviceType: ServiceType.DATAFLOW, amount: 50, currency: 'USD', tier: ReferralTier.STARTER },
    [ServiceType.NCLEX]: { serviceType: ServiceType.NCLEX, amount: 75, currency: 'USD', tier: ReferralTier.STARTER },
    [ServiceType.UK_NMC]: { serviceType: ServiceType.UK_NMC, amount: 100, currency: 'USD', tier: ReferralTier.STARTER },
    [ServiceType.AUSTRALIA]: { serviceType: ServiceType.AUSTRALIA, amount: 100, currency: 'USD', tier: ReferralTier.STARTER },
    [ServiceType.CONSULTATION]: { serviceType: ServiceType.CONSULTATION, amount: 25, currency: 'USD', tier: ReferralTier.STARTER },
    [ServiceType.LICENSING]: { serviceType: ServiceType.LICENSING, amount: 100, currency: 'USD', tier: ReferralTier.STARTER }
  },
  [ReferralTier.CHAMPION]: {
    [ServiceType.DATAFLOW]: { serviceType: ServiceType.DATAFLOW, amount: 75, currency: 'USD', tier: ReferralTier.CHAMPION },
    [ServiceType.NCLEX]: { serviceType: ServiceType.NCLEX, amount: 100, currency: 'USD', tier: ReferralTier.CHAMPION },
    [ServiceType.UK_NMC]: { serviceType: ServiceType.UK_NMC, amount: 150, currency: 'USD', tier: ReferralTier.CHAMPION },
    [ServiceType.AUSTRALIA]: { serviceType: ServiceType.AUSTRALIA, amount: 150, currency: 'USD', tier: ReferralTier.CHAMPION },
    [ServiceType.CONSULTATION]: { serviceType: ServiceType.CONSULTATION, amount: 35, currency: 'USD', tier: ReferralTier.CHAMPION },
    [ServiceType.LICENSING]: { serviceType: ServiceType.LICENSING, amount: 150, currency: 'USD', tier: ReferralTier.CHAMPION }
  },
  [ReferralTier.AMBASSADOR]: {
    [ServiceType.DATAFLOW]: { serviceType: ServiceType.DATAFLOW, amount: 100, currency: 'USD', tier: ReferralTier.AMBASSADOR },
    [ServiceType.NCLEX]: { serviceType: ServiceType.NCLEX, amount: 125, currency: 'USD', tier: ReferralTier.AMBASSADOR },
    [ServiceType.UK_NMC]: { serviceType: ServiceType.UK_NMC, amount: 200, currency: 'USD', tier: ReferralTier.AMBASSADOR },
    [ServiceType.AUSTRALIA]: { serviceType: ServiceType.AUSTRALIA, amount: 200, currency: 'USD', tier: ReferralTier.AMBASSADOR },
    [ServiceType.CONSULTATION]: { serviceType: ServiceType.CONSULTATION, amount: 50, currency: 'USD', tier: ReferralTier.AMBASSADOR },
    [ServiceType.LICENSING]: { serviceType: ServiceType.LICENSING, amount: 200, currency: 'USD', tier: ReferralTier.AMBASSADOR }
  }
};

const TIER_REQUIREMENTS = {
  [ReferralTier.STARTER]: { minReferrals: 0, maxReferrals: 5 },
  [ReferralTier.CHAMPION]: { minReferrals: 6, maxReferrals: 20 },
  [ReferralTier.AMBASSADOR]: { minReferrals: 21, maxReferrals: null }
};

// ============================================================================
// INITIAL STATE
// ============================================================================

const initialState = {
  referrers: {} as Record<string, Referrer>,
  referrals: {} as Record<string, Referral>,
  payments: {} as Record<string, ReferralPayment>,
  notifications: [] as ReferralNotification[],
  analytics: {} as Record<string, ReferralAnalytics>,
  currentReferrer: null as Referrer | null,
  loading: false,
  error: null as string | null
};

// ============================================================================
// STORE INTERFACE
// ============================================================================

interface ReferralStore {
  // State
  referrers: Record<string, Referrer>;
  referrals: Record<string, Referral>;
  payments: Record<string, ReferralPayment>;
  notifications: ReferralNotification[];
  analytics: Record<string, ReferralAnalytics>;
  currentReferrer: Referrer | null;
  loading: boolean;
  error: string | null;

  // Computed Properties
  activeReferrals: Referral[];
  pendingPayments: ReferralPayment[];
  unreadNotifications: ReferralNotification[];

  // Referrer Management
  createReferrer: (referrerData: Omit<Referrer, 'id' | 'referralCode' | 'referralLink' | 'joinedAt' | 'totalReferrals' | 'successfulReferrals' | 'totalEarnings' | 'pendingEarnings' | 'conversionRate' | 'lastActivityAt'>) => Promise<string>;
  updateReferrer: (referrerId: string, updates: Partial<Referrer>) => Promise<void>;
  getReferrer: (referrerId: string) => Referrer | null;
  calculateTierUpgrade: (referrerId: string) => ReferralTier | null;
  
  // Referral Management
  createReferral: (referralData: Omit<Referral, 'id' | 'rewardAmount' | 'currency' | 'expiresAt' | 'metadata'>) => Promise<string>;
  updateReferralStatus: (referralId: string, status: ReferralStatus, metadata?: Record<string, any>) => Promise<void>;
  trackReferralClick: (referralCode: string, metadata: Record<string, any>) => Promise<void>;
  processReferralConversion: (referralId: string) => Promise<void>;
  
  // Payment Management
  schedulePayment: (referrerId: string, referralIds: string[]) => Promise<string>;
  processPayment: (paymentId: string) => Promise<void>;
  getPaymentHistory: (referrerId: string) => ReferralPayment[];
  
  // Notifications
  createNotification: (notification: Omit<ReferralNotification, 'id' | 'sentAt'>) => Promise<string>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  clearAllNotifications: (referrerId: string) => Promise<void>;
  
  // Analytics
  calculateAnalytics: (referrerId: string) => Promise<ReferralAnalytics>;
  getGlobalAnalytics: () => Promise<ReferralAnalytics>;
  
  // Utility Methods
  generateReferralCode: (firstName: string, lastName: string) => string;
  generateReferralLink: (referralCode: string) => string;
  getRewardAmount: (tier: ReferralTier, serviceType: ServiceType) => number;
  isReferralExpired: (referral: Referral) => boolean;
  
  // Mock Data Methods
  createMockReferrer: () => Promise<string>;
  generateMockReferrals: (referrerId: string, count: number) => Promise<void>;
  simulateReferralActivity: (referrerId: string) => Promise<void>;
}

// ============================================================================
// STORE IMPLEMENTATION
// ============================================================================

export const useReferralStore = create<ReferralStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // ========================================================================
        // COMPUTED PROPERTIES
        // ========================================================================

        get activeReferrals() {
          return Object.values(get().referrals).filter(r => 
            [ReferralStatus.PENDING, ReferralStatus.CLICKED, ReferralStatus.SIGNED_UP, ReferralStatus.IN_PROGRESS].includes(r.status)
          );
        },

        get pendingPayments() {
          return Object.values(get().payments).filter(p => p.status === PaymentStatus.PENDING);
        },

        get unreadNotifications() {
          return get().notifications.filter(n => !n.readAt);
        },

        // ========================================================================
        // REFERRER MANAGEMENT
        // ========================================================================

        createReferrer: async (referrerData) => {
          const id = generateId();
          const referralCode = get().generateReferralCode(referrerData.firstName, referrerData.lastName);
          const referralLink = get().generateReferralLink(referralCode);
          const now = new Date().toISOString();

          const referrer: Referrer = {
            id,
            ...referrerData,
            referralCode,
            referralLink,
            joinedAt: now,
            totalReferrals: 0,
            successfulReferrals: 0,
            totalEarnings: 0,
            pendingEarnings: 0,
            conversionRate: 0,
            isActive: true,
            lastActivityAt: now
          };

          set(state => ({
            referrers: {
              ...state.referrers,
              [id]: referrer
            },
            currentReferrer: referrer
          }));

          // Create welcome notification
          await get().createNotification({
            referrerId: id,
            type: 'milestone_reached',
            title: 'Welcome to eLab Referral Program!',
            message: 'Your referral account has been created successfully. Start sharing your link to earn rewards.',
            actionUrl: '/referral-program/dashboard'
          });

          return id;
        },

        updateReferrer: async (referrerId: string, updates: Partial<Referrer>) => {
          set(state => ({
            referrers: {
              ...state.referrers,
              [referrerId]: {
                ...state.referrers[referrerId],
                ...updates,
                lastActivityAt: new Date().toISOString()
              }
            },
            currentReferrer: state.currentReferrer?.id === referrerId 
              ? { ...state.currentReferrer, ...updates }
              : state.currentReferrer
          }));
        },

        getReferrer: (referrerId: string) => {
          return get().referrers[referrerId] || null;
        },

        calculateTierUpgrade: (referrerId: string) => {
          const referrer = get().referrers[referrerId];
          if (!referrer) return null;

          const currentTier = referrer.tier;
          const successfulCount = referrer.successfulReferrals;

          // Check for tier upgrade
          if (currentTier === ReferralTier.STARTER && successfulCount >= TIER_REQUIREMENTS[ReferralTier.CHAMPION].minReferrals) {
            return ReferralTier.CHAMPION;
          }
          
          if (currentTier === ReferralTier.CHAMPION && successfulCount >= TIER_REQUIREMENTS[ReferralTier.AMBASSADOR].minReferrals) {
            return ReferralTier.AMBASSADOR;
          }

          return null;
        },

        // ========================================================================
        // REFERRAL MANAGEMENT
        // ========================================================================

        createReferral: async (referralData) => {
          const id = generateId();
          const referrer = get().referrers[referralData.referrerId];
          if (!referrer) throw new Error('Referrer not found');

          const rewardAmount = get().getRewardAmount(referrer.tier, referralData.serviceType);
          const expiresAt = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(); // 90 days

          const referral: Referral = {
            id,
            ...referralData,
            status: ReferralStatus.PENDING,
            rewardAmount,
            currency: 'USD',
            expiresAt,
            metadata: {
              conversionSteps: ['created'],
              ...referralData.metadata || {}
            }
          };

          set(state => ({
            referrals: {
              ...state.referrals,
              [id]: referral
            }
          }));

          // Update referrer stats
          await get().updateReferrer(referralData.referrerId, {
            totalReferrals: referrer.totalReferrals + 1
          });

          // Create notification
          await get().createNotification({
            referrerId: referralData.referrerId,
            type: 'new_referral',
            title: 'New Referral Created',
            message: `${referralData.refereeName} has been added as a referral for ${referralData.serviceType}`,
            data: { referralId: id },
            actionUrl: '/referral-program/dashboard'
          });

          return id;
        },

        updateReferralStatus: async (referralId: string, status: ReferralStatus, metadata?: Record<string, any>) => {
          const referral = get().referrals[referralId];
          if (!referral) return;

          const now = new Date().toISOString();
          const updates: Partial<Referral> = {
            status,
            metadata: {
              ...referral.metadata,
              conversionSteps: [...referral.metadata.conversionSteps, status],
              ...metadata
            }
          };

          // Add timestamps based on status
          if (status === ReferralStatus.CLICKED && !referral.clickedAt) {
            updates.clickedAt = now;
          } else if (status === ReferralStatus.SIGNED_UP && !referral.signedUpAt) {
            updates.signedUpAt = now;
          } else if (status === ReferralStatus.COMPLETED && !referral.completedAt) {
            updates.completedAt = now;
            // Process conversion
            await get().processReferralConversion(referralId);
          }

          set(state => ({
            referrals: {
              ...state.referrals,
              [referralId]: {
                ...state.referrals[referralId],
                ...updates
              }
            }
          }));
        },

        trackReferralClick: async (referralCode: string, metadata: Record<string, any>) => {
          // Find referral by code
          const referral = Object.values(get().referrals).find(r => r.referralCode === referralCode);
          if (!referral || referral.status !== ReferralStatus.PENDING) return;

          await get().updateReferralStatus(referral.id, ReferralStatus.CLICKED, {
            sourceUrl: metadata.sourceUrl,
            userAgent: metadata.userAgent,
            ipAddress: metadata.ipAddress
          });
        },

        processReferralConversion: async (referralId: string) => {
          const referral = get().referrals[referralId];
          if (!referral) return;

          const referrer = get().referrers[referral.referrerId];
          if (!referrer) return;

          // Update referrer stats
          const newSuccessfulReferrals = referrer.successfulReferrals + 1;
          const newTotalEarnings = referrer.totalEarnings + referral.rewardAmount;
          const newPendingEarnings = referrer.pendingEarnings + referral.rewardAmount;
          const newConversionRate = (newSuccessfulReferrals / referrer.totalReferrals) * 100;

          await get().updateReferrer(referral.referrerId, {
            successfulReferrals: newSuccessfulReferrals,
            totalEarnings: newTotalEarnings,
            pendingEarnings: newPendingEarnings,
            conversionRate: newConversionRate
          });

          // Check for tier upgrade
          const newTier = get().calculateTierUpgrade(referral.referrerId);
          if (newTier && newTier !== referrer.tier) {
            await get().updateReferrer(referral.referrerId, { tier: newTier });
            
            await get().createNotification({
              referrerId: referral.referrerId,
              type: 'tier_upgrade',
              title: 'Tier Upgrade!',
              message: `Congratulations! You've been upgraded to ${newTier.replace('_', ' ')} tier`,
              actionUrl: '/referral-program/dashboard'
            });
          }

          // Create completion notification
          await get().createNotification({
            referrerId: referral.referrerId,
            type: 'referral_completed',
            title: 'Referral Completed!',
            message: `${referral.refereeName} completed their service. You earned $${referral.rewardAmount}!`,
            data: { referralId, earnings: referral.rewardAmount },
            actionUrl: '/referral-program/dashboard'
          });

          // Schedule payment if eligible
          if (newPendingEarnings >= 100) { // Minimum payout threshold
            await get().schedulePayment(referral.referrerId, [referralId]);
          }
        },

        // ========================================================================
        // PAYMENT MANAGEMENT
        // ========================================================================

        schedulePayment: async (referrerId: string, referralIds: string[]) => {
          const id = generateId();
          const referrer = get().referrers[referrerId];
          if (!referrer) throw new Error('Referrer not found');

          const totalAmount = referralIds.reduce((sum, refId) => {
            const referral = get().referrals[refId];
            return sum + (referral?.rewardAmount || 0);
          }, 0);

          const payment: ReferralPayment = {
            id,
            referrerId,
            referralIds,
            amount: totalAmount,
            currency: 'USD',
            status: PaymentStatus.PENDING,
            scheduledAt: new Date().toISOString(),
            paymentMethod: referrer.paymentInfo?.method || 'bank'
          };

          set(state => ({
            payments: {
              ...state.payments,
              [id]: payment
            }
          }));

          await get().createNotification({
            referrerId,
            type: 'payment_sent',
            title: 'Payment Scheduled',
            message: `Your payment of $${totalAmount} has been scheduled for processing`,
            data: { paymentId: id, amount: totalAmount },
            actionUrl: '/referral-program/dashboard'
          });

          return id;
        },

        processPayment: async (paymentId: string) => {
          const payment = get().payments[paymentId];
          if (!payment) return;

          const now = new Date().toISOString();
          
          set(state => ({
            payments: {
              ...state.payments,
              [paymentId]: {
                ...payment,
                status: PaymentStatus.PAID,
                paidAt: now,
                transactionId: generateId()
              }
            }
          }));

          // Update referrer pending earnings
          const referrer = get().referrers[payment.referrerId];
          if (referrer) {
            await get().updateReferrer(payment.referrerId, {
              pendingEarnings: Math.max(0, referrer.pendingEarnings - payment.amount)
            });
          }
        },

        getPaymentHistory: (referrerId: string) => {
          return Object.values(get().payments)
            .filter(p => p.referrerId === referrerId)
            .sort((a, b) => new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime());
        },

        // ========================================================================
        // NOTIFICATIONS
        // ========================================================================

        createNotification: async (notificationData) => {
          const id = generateId();
          const notification: ReferralNotification = {
            id,
            ...notificationData,
            sentAt: new Date().toISOString()
          };

          set(state => ({
            notifications: [...state.notifications, notification]
          }));

          return id;
        },

        markNotificationAsRead: async (notificationId: string) => {
          set(state => ({
            notifications: state.notifications.map(n =>
              n.id === notificationId
                ? { ...n, readAt: new Date().toISOString() }
                : n
            )
          }));
        },

        clearAllNotifications: async (referrerId: string) => {
          set(state => ({
            notifications: state.notifications.filter(n => n.referrerId !== referrerId)
          }));
        },

        // ========================================================================
        // ANALYTICS
        // ========================================================================

        calculateAnalytics: async (referrerId: string): Promise<ReferralAnalytics> => {
          const referrer = get().referrers[referrerId];
          const referrals = Object.values(get().referrals).filter(r => r.referrerId === referrerId);
          
          if (!referrer) {
            return {
              totalClicks: 0,
              uniqueClicks: 0,
              signups: 0,
              conversions: 0,
              conversionRate: 0,
              clickThroughRate: 0,
              averageTimeToConversion: 0,
              topSources: [],
              serviceBreakdown: [],
              monthlyStats: []
            };
          }

          const clicks = referrals.filter(r => r.clickedAt).length;
          const signups = referrals.filter(r => r.signedUpAt).length;
          const conversions = referrals.filter(r => r.status === ReferralStatus.COMPLETED).length;
          
          const analytics: ReferralAnalytics = {
            totalClicks: clicks,
            uniqueClicks: clicks, // Simplified for mock data
            signups,
            conversions,
            conversionRate: referrals.length > 0 ? (conversions / referrals.length) * 100 : 0,
            clickThroughRate: clicks > 0 ? (signups / clicks) * 100 : 0,
            averageTimeToConversion: 0, // Would calculate from completion times
            topSources: [],
            serviceBreakdown: Object.values(ServiceType).map(service => ({
              service,
              count: referrals.filter(r => r.serviceType === service).length,
              earnings: referrals.filter(r => r.serviceType === service && r.status === ReferralStatus.COMPLETED)
                .reduce((sum, r) => sum + r.rewardAmount, 0)
            })),
            monthlyStats: [] // Would calculate monthly breakdown
          };

          set(state => ({
            analytics: {
              ...state.analytics,
              [referrerId]: analytics
            }
          }));

          return analytics;
        },

        getGlobalAnalytics: async (): Promise<ReferralAnalytics> => {
          // Calculate global analytics across all referrers
          const allReferrals = Object.values(get().referrals);
          const allReferrers = Object.values(get().referrers);

          const clicks = allReferrals.filter(r => r.clickedAt).length;
          const signups = allReferrals.filter(r => r.signedUpAt).length;
          const conversions = allReferrals.filter(r => r.status === ReferralStatus.COMPLETED).length;

          return {
            totalClicks: clicks,
            uniqueClicks: clicks,
            signups,
            conversions,
            conversionRate: allReferrals.length > 0 ? (conversions / allReferrals.length) * 100 : 0,
            clickThroughRate: clicks > 0 ? (signups / clicks) * 100 : 0,
            averageTimeToConversion: 0,
            topSources: [],
            serviceBreakdown: Object.values(ServiceType).map(service => ({
              service,
              count: allReferrals.filter(r => r.serviceType === service).length,
              earnings: allReferrals.filter(r => r.serviceType === service && r.status === ReferralStatus.COMPLETED)
                .reduce((sum, r) => sum + r.rewardAmount, 0)
            })),
            monthlyStats: []
          };
        },

        // ========================================================================
        // UTILITY METHODS
        // ========================================================================

        generateReferralCode: (firstName: string, lastName: string) => {
          const base = `${firstName.substring(0, 4)}${lastName.substring(0, 4)}`.toUpperCase();
          const year = new Date().getFullYear();
          return `${base}${year}`;
        },

        generateReferralLink: (referralCode: string) => {
          return `https://elabsolutions.com/ref/${referralCode}`;
        },

        getRewardAmount: (tier: ReferralTier, serviceType: ServiceType) => {
          return REFERRAL_REWARDS[tier][serviceType]?.amount || 0;
        },

        isReferralExpired: (referral: Referral) => {
          return new Date(referral.expiresAt) < new Date();
        },

        // ========================================================================
        // MOCK DATA METHODS
        // ========================================================================

        createMockReferrer: async () => {
          const mockData = {
            userId: generateId(),
            firstName: 'Sarah',
            lastName: 'Johnson',
            email: 'sarah.johnson@example.com',
            phone: '+1 (555) 123-4567',
            country: 'United States',
            profession: 'Registered Nurse',
            tier: ReferralTier.CHAMPION,
            isActive: true
          };

          return await get().createReferrer(mockData);
        },

        generateMockReferrals: async (referrerId: string, count: number) => {
          const services = Object.values(ServiceType);
          const names = ['Maria Santos', 'Ahmed Hassan', 'Jennifer Liu', 'Carlos Rodriguez', 'Fatima Al-Zahra'];
          const statuses = [ReferralStatus.COMPLETED, ReferralStatus.IN_PROGRESS, ReferralStatus.PENDING];

          for (let i = 0; i < count; i++) {
            const referralId = await get().createReferral({
              referrerId,
              referralCode: get().referrers[referrerId]?.referralCode || 'TEST2024',
              refereeName: names[i % names.length],
              refereeEmail: `${names[i % names.length].toLowerCase().replace(' ', '.')}@example.com`,
              serviceType: services[i % services.length],
              status: ReferralStatus.PENDING
            });

            // Simulate some progression
            if (i < count * 0.7) {
              await get().updateReferralStatus(referralId, statuses[i % statuses.length]);
            }
          }
        },

        simulateReferralActivity: async (referrerId: string) => {
          // Simulate some recent activity
          await get().generateMockReferrals(referrerId, 5);
          
          // Simulate notifications
          await get().createNotification({
            referrerId,
            type: 'milestone_reached',
            title: 'Milestone Reached!',
            message: 'You\'ve reached 20 successful referrals. Keep up the great work!',
            actionUrl: '/referral-program/dashboard'
          });
        }
      }),
      {
        name: 'referral-storage',
        partialize: (state) => ({
          referrers: state.referrers,
          referrals: state.referrals,
          payments: state.payments,
          notifications: state.notifications,
          currentReferrer: state.currentReferrer
        })
      }
    ),
    { name: 'ReferralStore' }
  )
);