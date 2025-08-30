import { Award, ListChecks, Building2, Clock } from 'lucide-react';
import Link from 'next/link';

export default function LicensingPage() {
  return (
    <div className="bg-gray-50">
      {/* Page Header */}
      <header className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold">Regulatory Licensing Services</h1>
          <p className="text-lg text-primary-200 mt-2">
            Expert Guidance for Obtaining Your Healthcare Professional License
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* What is Regulatory Licensing Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What is Regulatory Licensing?</h2>
          <p className="text-gray-600 leading-relaxed">
            Regulatory licensing is the mandatory process by which healthcare professionals obtain official permission from a governing body to practice their profession within a specific jurisdiction. This ensures that practitioners meet the required standards of education, competence, and ethics.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Navigating the licensing requirements can be complex, especially when moving between countries. eLab Solutions provides comprehensive support to simplify this process, helping you prepare and submit all necessary documentation for a successful application.
          </p>
        </section>

        {/* Application Process Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <ListChecks className="h-8 w-8 mr-3 text-primary-600" />
            Application Process
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Initial assessment of your qualifications and target country requirements.</li>
            <li>Guidance on required documents and certifications.</li>
            <li>Assistance with application form completion and submission.</li>
            <li>Preparation for licensing exams (if applicable).</li>
            <li>Follow-up with regulatory bodies until license issuance.</li>
          </ol>
        </section>

        {/* Key Licensing Bodies Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Building2 className="h-8 w-8 mr-3 text-primary-600" />
            Key Licensing Bodies
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We have extensive experience with major healthcare regulatory authorities, including:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">DHA (Dubai Health Authority)</div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">MOHAP (Ministry of Health and Prevention, UAE)</div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">DOH (Department of Health, Abu Dhabi)</div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">SCFHS (Saudi Commission for Health Specialties)</div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">MOPH (Ministry of Public Health, Qatar)</div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">NHRA (National Health Regulatory Authority, Bahrain)</div>
          </div>
        </section>

        {/* Timeline & Cost Estimates Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Clock className="h-8 w-8 mr-3 text-primary-600" />
            Timeline & Cost Estimates
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The timeline for obtaining a license varies significantly by country and profession, typically ranging from **3 to 6 months**. Costs also vary based on application fees, exam fees, and our service charges. We provide a detailed breakdown during your initial consultation.
          </p>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16">
            <Link href="/contact" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-10 rounded-full transition-transform transform hover:scale-105 text-lg">
              Get Started with Your Licensing
            </Link>
        </section>
      </main>
    </div>
  );
}
