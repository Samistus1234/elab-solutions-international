'use client';

import Link from 'next/link';
import { CheckCircle, Lightbulb, Rocket, GraduationCap, BookOpen, Users, Globe } from 'lucide-react';

export default function ExamJourneySolutionsPage() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-700 to-primary-900 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Your Complete Exam Journey Solution
          </h1>
          <p className="text-lg md:text-xl text-primary-200 mb-8 max-w-3xl mx-auto">
            Navigate the complexities of healthcare licensing exams with eLab Solutions. From preparation to placement, we guide you every step of the way.
          </p>
          <Link href="/contact" className="bg-white text-primary-800 hover:bg-gray-200 font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg">
            Start Your Journey Today
          </Link>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">How We Guide Your Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Lightbulb className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Personalized Study Plans</h3>
              <p className="text-gray-600">Tailored strategies based on your strengths and weaknesses, ensuring efficient preparation.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <BookOpen className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Comprehensive Resources</h3>
              <p className="text-gray-600">Access to extensive question banks, lecture materials, and mock exams for all major tests.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <Users className="h-16 w-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Tutor Support</h3>
              <p className="text-gray-600">Learn from experienced healthcare educators and AI-powered tutors for instant feedback.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Exams We Cover Section */}
      <section className="py-20 bg-primary-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Exams We Prepare You For</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            <div className="p-4 bg-white rounded-lg shadow-md font-semibold text-gray-700">NCLEX</div>
            <div className="p-4 bg-white rounded-lg shadow-md font-semibold text-gray-700">OET</div>
            <div className="p-4 bg-white rounded-lg shadow-md font-semibold text-gray-700">IELTS</div>
            <div className="p-4 bg-white rounded-lg shadow-md font-semibold text-gray-700">Prometric</div>
            <div className="p-4 bg-white rounded-lg shadow-md font-semibold text-gray-700">HAAD</div>
            <div className="p-4 bg-white rounded-lg shadow-md font-semibold text-gray-700">CBT</div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Our Flexible Exam Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Package 1: Complete Exam Preparation */}
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Complete Exam Preparation</h3>
              <p className="text-4xl font-extrabold text-primary-600 mb-4">$600</p>
              <ul className="text-gray-600 space-y-2 flex-grow mb-6">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Preparation Materials</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Mock Exams</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Exam Bookings</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Travel Assistance</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Accommodation</li>
              </ul>
              <Link href="/contact" className="block text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105">
                Contact Us for Pricing
              </Link>
            </div>

            {/* Package 2: Travel & Exam Booking */}
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Travel & Exam Booking</h3>
              <p className="text-4xl font-extrabold text-primary-600 mb-4">$500</p>
              <ul className="text-gray-600 space-y-2 flex-grow mb-6">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Exam Booking Assistance</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Travel Arrangement</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Flexible Scheduling</li>
              </ul>
              <Link href="/contact" className="block text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105">
                Contact Us for Pricing
              </Link>
            </div>

            {/* Package 3: Custom Package */}
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Custom Package</h3>
              <p className="text-4xl font-extrabold text-primary-600 mb-4">Custom</p>
              <ul className="text-gray-600 space-y-2 flex-grow mb-6">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Select Services You Need</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Personalized Support</li>
              </ul>
              <Link href="/contact" className="block text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105">
                Customise Your Package
              </Link>
            </div>

            {/* Package 4: Premium Support Package */}
            <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-2xl font-bold text-primary-800 mb-4">Premium Support Package</h3>
              <p className="text-4xl font-extrabold text-primary-600 mb-4">$700</p>
              <ul className="text-gray-600 space-y-2 flex-grow mb-6">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Priority Exam Booking</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> 24/7 Travel Assistance</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> One-on-One Consultation</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Accommodation Arrangements</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Dedicated Support Agent</li>
              </ul>
              <Link href="/contact" className="block text-center bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-full transition-transform transform hover:scale-105">
                Get Premium Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">Your Journey to Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Assess & Plan</h3>
              <p className="text-gray-600">Identify your exam needs and create a personalized study roadmap.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold mb-2">Prepare & Learn</h3>
              <p className="text-gray-600">Dive into comprehensive materials and engage with expert tutors.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Practice & Refine</h3>
              <p className="text-gray-600">Test your knowledge with mock exams and refine your skills.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-bold mb-2">Succeed & Advance</h3>
              <p className="text-gray-600">Pass your exams and move closer to your global career goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section - Exam Centers */}
      <section id="exam-centers" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Exam Centers We Assist With</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              We provide comprehensive assistance for exam preparation, booking, and travel to these key international centers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Changed to md:grid-cols-3 as there are 3 locations now */}
            {/* Location 1: Ghana */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Globe className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Ghana</h3>
              <p className="text-gray-600">Assisting Nigerian professionals traveling to ACCRA, Ghana.</p>
            </div>
            {/* Location 2: Kenya */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Globe className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Kenya</h3>
              <p className="text-gray-600">Assisting Nigerian professionals traveling to Nairobi, Kenya.</p>
            </div>
            {/* Location 3: India */}
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Globe className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">India</h3>
              <p className="text-gray-600">Assisting Nigerian professionals traveling to NEW DELHI, India.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Exam Journey?</h2>
          <p className="text-lg text-primary-200 mb-8">
            Join thousands of successful healthcare professionals who chose eLab Solutions.
          </p>
          <Link href="/contact" className="bg-white text-primary-800 hover:bg-gray-200 font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105 shadow-lg">
            Contact Our Advisors
          </Link>
        </div>
      </section>
    </div>
  );
}
