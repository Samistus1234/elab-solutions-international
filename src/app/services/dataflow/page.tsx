import { CheckCircle, FileText, Globe, Clock } from 'lucide-react';
import Link from 'next/link';

export default function DataFlowPage() {
  return (
    <div className="bg-gray-50">
      {/* Page Header */}
      <header className="bg-primary-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold">DataFlow PSV Services</h1>
          <p className="text-lg text-primary-200 mt-2">
            Streamline Your Primary Source Verification with Our Expert Assistance
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* What is DataFlow Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">What is DataFlow PSV?</h2>
          <p className="text-gray-600 leading-relaxed">
            Primary Source Verification (PSV) is the process of verifying the credentials of healthcare professionals directly from the original or primary source. The DataFlow Group is a leading provider of PSV solutions, and their report is a mandatory requirement for licensing in many countries, especially in the Gulf region (UAE, Saudi Arabia, Qatar, Oman, Bahrain).
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            Our team at eLab Solutions specializes in managing the DataFlow application process on your behalf, ensuring accuracy, completeness, and timely submission to avoid unnecessary delays.
          </p>
        </section>

        {/* Required Documents Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <FileText className="h-8 w-8 mr-3 text-primary-600" />
            Required Documents
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Passport Copy (front and back)</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Educational Certificates (Diploma, Bachelor's, Master's, etc.)</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Transcript of Records</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Professional License or Registration</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Experience Certificates</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" /><span>Good Standing Certificate from licensing authority</span></li>
            <li className="flex items-start"><CheckCircle className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" /><span>A recent passport-sized photograph with a white background</span></li>
          </ul>
        </section>

        {/* Country Specific Requirements Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Globe className="h-8 w-8 mr-3 text-primary-600" />
            Country-Specific Requirements
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Different countries and regulatory bodies have slightly different requirements. We are experts in the specific needs of:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">UAE (DHA, MOHAP, DOH)</div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">Saudi Arabia (SCFHS)</div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">Qatar (MOPH)</div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">Bahrain (NHRA)</div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">Oman (OMSB)</div>
          </div>
        </section>

        {/* Process & Timeline Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
            <Clock className="h-8 w-8 mr-3 text-primary-600" />
            Process & Timeline
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            The standard DataFlow PSV process takes approximately **25-45 working days**. Our streamlined process ensures efficiency:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Initial consultation and document review.</li>
            <li>Application submission to DataFlow.</li>
            <li>Regular follow-ups and status monitoring.</li>
            <li>Issuance of the final PSV report.</li>
          </ol>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16">
            <Link href="/dashboard/applicant" className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-10 rounded-full transition-transform transform hover:scale-105 text-lg">
              Get Started with Your Verification
            </Link>
        </section>
      </main>
    </div>
  );
}
