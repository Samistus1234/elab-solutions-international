'use client';

import Link from 'next/link';
import { CheckCircle, FileText, Award, Lightbulb, Rocket, UserCheck, Globe } from 'lucide-react';

export default function NclexUsaPage() {
  return (
    <div className="bg-gray-50">
      {/* Page Header/Hero */}
      <header className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold">NCLEX USA Application Assistance</h1>
          <p className="text-lg text-primary-200 mt-2">
            Your Expert Guide to US Nursing Licensure
          </p>
          <Link href="/contact" className="mt-8 inline-block bg-white text-primary-800 hover:bg-gray-200 font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg">
            Get Started Today
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Service Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About NCLEX USA Application</h2>
          <p className="text-gray-600 leading-relaxed">
            The National Council Licensure Examination (NCLEX) is a standardized exam administered by the National Council of State Boards of Nursing (NCSBN) in the United States. It is a mandatory requirement for all aspiring nurses to obtain licensure as a Registered Nurse (RN) or Licensed Practical/Vocational Nurse (LPN/VN) in the U.S. Navigating the application process can be complex, involving credential evaluation, eligibility assessment, and exam scheduling.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            eLab Solutions provides comprehensive assistance to healthcare professionals worldwide, ensuring a smooth and successful NCLEX USA application process. We guide you through every step, from eligibility assessment to exam registration and beyond.
          </p>
        </section>

        {/* How It Works / Application Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Rocket className="h-8 w-8 mr-3 text-primary-600" />
            Our Streamlined Application Process
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>**Eligibility Assessment:** We review your educational background and qualifications to determine your eligibility for NCLEX licensure in your target U.S. state.</li>
            <li>**Credential Evaluation:** Assistance with evaluating your foreign nursing credentials to meet U.S. standards.</li>
            <li>**Application Submission:** Expert guidance in preparing and submitting your application to the relevant State Board of Nursing.</li>
            <li>**Authorization to Test (ATT):** Support in obtaining your ATT, which is required to schedule your NCLEX exam.</li>
            <li>**Exam Scheduling:** Assistance with scheduling your NCLEX exam at a convenient Pearson VUE testing center.</li>
            <li>**Post-Exam Support:** Guidance on next steps after taking the NCLEX, including license endorsement and renewal.</li>
          </ol>
        </section>

        {/* Requirements & Documents */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <FileText className="h-8 w-8 mr-3 text-primary-600" />
            Key Requirements & Documents
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            While specific requirements vary by state, common documents and criteria include:
          </p>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Nursing Degree/Diploma and Transcripts</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Proof of Nursing License/Registration from your home country</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" /><span>English Language Proficiency (e.g., IELTS, OET scores)</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Criminal Background Check (state-specific)</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Passport copy and other identification documents</span></li>
          </ul>
        </section>

        {/* Benefits of Choosing Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Award className="h-8 w-8 mr-3 text-primary-600" />
            Why Choose eLab Solutions for NCLEX USA?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
            <div className="flex items-start">
              <UserCheck className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Expert Guidance</h3>
                <p>Our team of experienced consultants provides personalized support, ensuring you meet all requirements.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Lightbulb className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Streamlined Process</h3>
                <p>We simplify the complex application journey, saving you time and reducing stress.</p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">High Success Rate</h3>
                <p>Benefit from our proven track record of assisting thousands of nurses in achieving U.S. licensure.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Globe className="h-6 w-6 text-primary-600 mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg mb-1">Global Reach</h3>
                <p>Assisting professionals from various countries to practice nursing in the United States.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Your U.S. Nursing Career?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Contact us today for a free consultation and take the first step towards your American dream.
          </p>
          <Link href="/contact" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-10 rounded-full transition-transform transform hover:scale-105 text-lg">
            Contact Our Advisors
          </Link>
        </section>
      </main>
    </div>
  );
}
