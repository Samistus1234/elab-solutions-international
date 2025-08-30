import { GraduationCap, FileCheck, Briefcase, Globe } from 'lucide-react';
import Link from 'next/link';

export default function CredentialsPage() {
  return (
    <div className="bg-gray-50">
      {/* Page Header */}
      <header className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold">Credential Evaluation Services</h1>
          <p className="text-lg text-primary-200 mt-2">
            Ensuring Your International Qualifications Are Recognized
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* What is Credential Evaluation Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What is Credential Evaluation?</h2>
          <p className="text-gray-600 leading-relaxed">
            Credential evaluation is the process of assessing and validating academic and professional qualifications obtained in one country against the educational standards of another country. This is often required for immigration, employment, or further education purposes.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            eLab Solutions provides expert credential evaluation services, ensuring that your hard-earned qualifications are accurately recognized and accepted by institutions and employers worldwide.
          </p>
        </section>

        {/* Evaluation Process Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <FileCheck className="h-8 w-8 mr-3 text-primary-600" />
            The Evaluation Process
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Initial consultation to understand your needs and target country.</li>
            <li>Collection and verification of all academic and professional documents.</li>
            <li>Detailed analysis of your qualifications against international standards.</li>
            <li>Preparation of a comprehensive evaluation report.</li>
            <li>Submission of the report to relevant authorities or institutions.</li>
          </ol>
        </section>

        {/* Common Purposes Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Briefcase className="h-8 w-8 mr-3 text-primary-600" />
            Common Purposes for Evaluation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center"><GraduationCap className="h-6 w-6 text-primary-600 mr-2" /> Further Education</div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center"><Briefcase className="h-6 w-6 text-primary-600 mr-2" /> Professional Licensing</div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center"><Globe className="h-6 w-6 text-primary-600 mr-2" /> Immigration</div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center"><FileCheck className="h-6 w-6 text-primary-600 mr-2" /> Employment</div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16">
            <Link href="/contact" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-10 rounded-full transition-transform transform hover:scale-105 text-lg">
              Get Your Credentials Evaluated
            </Link>
        </section>
      </main>
    </div>
  );
}
