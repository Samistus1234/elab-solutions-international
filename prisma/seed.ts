/**
 * Database Seeding Script
 * ELAB Solutions International
 * 
 * Seeds the database with initial data for development and testing
 */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // ============================================================================
  // SEED ADMIN USERS
  // ============================================================================

  console.log('👤 Creating admin users...');

  const adminPassword = await bcrypt.hash('admin123!', 12);
  const consultantPassword = await bcrypt.hash('consultant123!', 12);

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@elabsolutions.com' },
    update: {},
    create: {
      email: 'admin@elabsolutions.com',
      passwordHash: adminPassword,
      role: 'SUPER_ADMIN',
      status: 'ACTIVE',
      firstName: 'System',
      lastName: 'Administrator',
      phone: '+1234567890',
      country: 'United States',
      profession: 'System Administrator',
      emailVerified: new Date(),
      phoneVerified: new Date(),
      consentGiven: true,
      consentDate: new Date(),
      preferences: JSON.stringify({
        language: 'en',
        timezone: 'UTC',
        notifications: {
          email: true,
          sms: true,
          push: true,
          marketing: false,
        },
        privacy: {
          profileVisibility: 'private',
          showEmail: false,
          showPhone: false,
        },
      }),
    },
  });

  const consultantUser = await prisma.user.upsert({
    where: { email: 'consultant@elabsolutions.com' },
    update: {},
    create: {
      email: 'consultant@elabsolutions.com',
      passwordHash: consultantPassword,
      role: 'CONSULTANT',
      status: 'ACTIVE',
      firstName: 'John',
      lastName: 'Consultant',
      phone: '+1234567891',
      country: 'United States',
      profession: 'Healthcare Consultant',
      emailVerified: new Date(),
      phoneVerified: new Date(),
      consentGiven: true,
      consentDate: new Date(),
      preferences: JSON.stringify({
        language: 'en',
        timezone: 'UTC',
        notifications: {
          email: true,
          sms: true,
          push: true,
          marketing: true,
        },
        privacy: {
          profileVisibility: 'public',
          showEmail: true,
          showPhone: false,
        },
      }),
    },
  });

  // ============================================================================
  // SEED TEST APPLICANTS
  // ============================================================================

  console.log('👥 Creating test applicants...');

  const applicantPassword = await bcrypt.hash('applicant123!', 12);

  const testApplicants = [
    {
      email: 'nurse.jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      country: 'Nigeria',
      profession: 'Registered Nurse',
    },
    {
      email: 'doctor.ahmed@example.com',
      firstName: 'Ahmed',
      lastName: 'Hassan',
      country: 'Egypt',
      profession: 'Medical Doctor',
    },
    {
      email: 'therapist.maria@example.com',
      firstName: 'Maria',
      lastName: 'Rodriguez',
      country: 'Philippines',
      profession: 'Physical Therapist',
    },
  ];

  const createdApplicants: any[] = [];

  for (const applicant of testApplicants) {
    const user = await prisma.user.upsert({
      where: { email: applicant.email },
      update: {},
      create: {
        email: applicant.email,
        passwordHash: applicantPassword,
        role: 'APPLICANT',
        status: 'ACTIVE',
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        phone: `+${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        country: applicant.country,
        profession: applicant.profession,
        emailVerified: new Date(),
        consentGiven: true,
        consentDate: new Date(),
        preferences: JSON.stringify({
          language: 'en',
          timezone: 'UTC',
          notifications: {
            email: true,
            sms: false,
            push: true,
            marketing: true,
          },
          privacy: {
            profileVisibility: 'contacts_only',
            showEmail: false,
            showPhone: false,
          },
        }),
      },
    });

    createdApplicants.push(user);
  }

  // ============================================================================
  // SEED SAMPLE APPLICATIONS
  // ============================================================================

  console.log('📋 Creating sample applications...');

  for (const applicant of createdApplicants) {
    // Create a dataflow application
    const application = await prisma.application.create({
      data: {
        userId: applicant.id,
        type: 'DATAFLOW',
        status: 'IN_REVIEW',
        priority: 'MEDIUM',
        personalInfo: JSON.stringify({
          fullName: `${applicant.firstName} ${applicant.lastName}`,
          dateOfBirth: '1990-01-01',
          nationality: applicant.country,
          passportNumber: `P${Math.floor(Math.random() * 10000000)}`,
          passportExpiry: '2030-12-31',
          maritalStatus: 'single',
          languages: [
            { language: 'English', proficiency: 'advanced' },
            { language: 'Arabic', proficiency: 'native' },
          ],
        }),
        targetCountry: 'Saudi Arabia',
        targetProfession: applicant.profession,
        additionalData: JSON.stringify({
          preferredCity: 'Riyadh',
          experienceYears: Math.floor(Math.random() * 10) + 2,
        }),
        workflowState: JSON.stringify({
          currentStep: 'document_review',
          completedSteps: ['initial_review', 'data_entry'],
          nextSteps: ['verification', 'approval'],
        }),
        submittedAt: new Date(),
      },
    });

    // Create workflow steps
    const workflowSteps = [
      { stepName: 'Initial Review', stepOrder: 1, status: 'completed' },
      { stepName: 'Data Entry', stepOrder: 2, status: 'completed' },
      { stepName: 'Document Review', stepOrder: 3, status: 'in_progress' },
      { stepName: 'Verification', stepOrder: 4, status: 'pending' },
      { stepName: 'Final Approval', stepOrder: 5, status: 'pending' },
    ];

    for (const step of workflowSteps) {
      await prisma.workflowStep.create({
        data: {
          applicationId: application.id,
          stepName: step.stepName,
          stepOrder: step.stepOrder,
          status: step.status,
          data: JSON.stringify({}),
          assignedTo: step.status === 'in_progress' ? consultantUser.id : undefined,
          startedAt: step.status !== 'pending' ? new Date() : undefined,
          completedAt: step.status === 'completed' ? new Date() : undefined,
        },
      });
    }

    // Create sample documents
    const documentTypes = ['PASSPORT', 'DEGREE_CERTIFICATE', 'EXPERIENCE_LETTER'];
    
    for (const docType of documentTypes) {
      await prisma.document.create({
        data: {
          userId: applicant.id,
          applicationId: application.id,
          name: `${docType.toLowerCase().replace('_', '-')}.pdf`,
          type: docType as any,
          originalName: `${applicant.firstName}_${docType}.pdf`,
          mimeType: 'application/pdf',
          size: Math.floor(Math.random() * 5000000) + 100000, // 100KB - 5MB
          url: `https://storage.example.com/documents/${application.id}/${docType}.pdf`,
          storageKey: `documents/${application.id}/${docType}.pdf`,
          verificationStatus: Math.random() > 0.5 ? 'VERIFIED' : 'PENDING',
          verifiedBy: Math.random() > 0.5 ? consultantUser.id : undefined,
          verifiedAt: Math.random() > 0.5 ? new Date() : undefined,
          isEncrypted: true,
          accessLevel: 'private',
        },
      });
    }

    // Create sample payment
    await prisma.payment.create({
      data: {
        userId: applicant.id,
        applicationId: application.id,
        amount: 500.00,
        currency: 'USD',
        status: 'COMPLETED',
        gateway: 'stripe',
        gatewayId: `pi_${Math.random().toString(36).substr(2, 9)}`,
        gatewayData: JSON.stringify({
          paymentMethod: 'card',
          last4: '4242',
          brand: 'visa',
        }),
        description: 'DataFlow Application Processing Fee',
        reference: `REF_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        paidAt: new Date(),
      },
    });
  }

  // ============================================================================
  // SEED NOTIFICATIONS
  // ============================================================================

  console.log('🔔 Creating sample notifications...');

  for (const applicant of createdApplicants) {
    await prisma.notification.create({
      data: {
        userId: applicant.id,
        title: 'Welcome to ELAB Solutions',
        message: 'Your account has been created successfully. You can now start your application process.',
        type: 'EMAIL',
        status: 'DELIVERED',
        channel: 'email',
        recipient: applicant.email,
        data: JSON.stringify({
          template: 'welcome',
          variables: {
            firstName: applicant.firstName,
          },
        }),
        priority: 'normal',
        sentAt: new Date(),
        deliveredAt: new Date(),
      },
    });
  }

  console.log('✅ Database seeding completed successfully!');
  console.log(`
📊 Seeded Data Summary:
- Admin Users: 2
- Test Applicants: ${createdApplicants.length}
- Applications: ${createdApplicants.length}
- Documents: ${createdApplicants.length * 3}
- Payments: ${createdApplicants.length}
- Notifications: ${createdApplicants.length}

🔐 Test Credentials:
- Admin: admin@elabsolutions.com / admin123!
- Consultant: consultant@elabsolutions.com / consultant123!
- Applicant: nurse.jane@example.com / applicant123!
  `);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
