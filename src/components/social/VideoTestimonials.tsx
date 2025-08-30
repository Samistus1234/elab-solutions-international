'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Star, MapPin, Briefcase, Award, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  profession: string;
  fromCountry: string;
  toCountry: string;
  videoThumbnail: string;
  videoUrl: string;
  quote: string;
  rating: number;
  completionDate: string;
  salaryIncrease: string;
  serviceUsed: string;
  duration: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Ahmed',
    profession: 'Registered Nurse',
    fromCountry: 'Pakistan',
    toCountry: 'United States',
    videoThumbnail: '/testimonials/sarah-thumbnail.jpg',
    videoUrl: '/testimonials/sarah-full.mp4',
    quote: 'eLab Solutions made my dream of working in the US come true. Their NCLEX preparation was exceptional and the support team was always there when I needed them.',
    rating: 5,
    completionDate: '2024-01-15',
    salaryIncrease: '350%',
    serviceUsed: 'NCLEX Preparation + DataFlow',
    duration: '8 months',
    avatar: '/avatars/sarah.jpg'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    profession: 'Physician',
    fromCountry: 'Philippines',
    toCountry: 'United Arab Emirates',
    videoThumbnail: '/testimonials/michael-thumbnail.jpg',
    videoUrl: '/testimonials/michael-full.mp4',
    quote: 'The DataFlow process was seamless and the team guided me through every step. Now I am working in Dubai with an amazing salary and benefits package.',
    rating: 5,
    completionDate: '2024-02-28',
    salaryIncrease: '280%',
    serviceUsed: 'DataFlow + Global Placement',
    duration: '6 months',
    avatar: '/avatars/michael.jpg'
  },
  {
    id: '3',
    name: 'Priya Sharma',
    profession: 'ICU Nurse',
    fromCountry: 'India',
    toCountry: 'United Kingdom',
    videoThumbnail: '/testimonials/priya-thumbnail.jpg',
    videoUrl: '/testimonials/priya-full.mp4',
    quote: 'From IELTS preparation to NMC registration, eLab Solutions was with me every step of the way. The UK nursing opportunities they connected me with exceeded my expectations.',
    rating: 5,
    completionDate: '2024-03-10',
    salaryIncrease: '320%',
    serviceUsed: 'NMC Registration + English Support',
    duration: '10 months',
    avatar: '/avatars/priya.jpg'
  },
  {
    id: '4',
    name: 'Ahmad Al-Rashid',
    profession: 'Pharmacist',
    fromCountry: 'Jordan',
    toCountry: 'Canada',
    videoThumbnail: '/testimonials/ahmad-thumbnail.jpg',
    videoUrl: '/testimonials/ahmad-full.mp4',
    quote: 'The credential evaluation and licensing support was outstanding. eLab Solutions helped me navigate the complex Canadian system and I am now practicing in Toronto.',
    rating: 5,
    completionDate: '2024-01-20',
    salaryIncrease: '290%',
    serviceUsed: 'Credential Evaluation + Licensing',
    duration: '12 months',
    avatar: '/avatars/ahmad.jpg'
  },
  {
    id: '5',
    name: 'Maria Rodriguez',
    profession: 'Physical Therapist',
    fromCountry: 'Colombia',
    toCountry: 'Australia',
    videoThumbnail: '/testimonials/maria-thumbnail.jpg',
    videoUrl: '/testimonials/maria-full.mp4',
    quote: 'AHPRA registration seemed impossible until I found eLab Solutions. Their expertise and dedication made the entire process smooth and successful.',
    rating: 5,
    completionDate: '2024-02-15',
    salaryIncrease: '275%',
    serviceUsed: 'AHPRA Registration + Global Placement',
    duration: '9 months',
    avatar: '/avatars/maria.jpg'
  },
  {
    id: '6',
    name: 'Dr. James Okafor',
    profession: 'Surgeon',
    fromCountry: 'Nigeria',
    toCountry: 'Saudi Arabia',
    videoThumbnail: '/testimonials/james-thumbnail.jpg',
    videoUrl: '/testimonials/james-full.mp4',
    quote: 'The Middle East licensing process was handled professionally. I am now working in Riyadh with excellent compensation and benefits.',
    rating: 5,
    completionDate: '2024-03-05',
    salaryIncrease: '400%',
    serviceUsed: 'SCFHS Licensing + Career Coaching',
    duration: '7 months',
    avatar: '/avatars/james.jpg'
  }
];

export function VideoTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories from Around the World
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear directly from healthcare professionals who achieved their international career dreams with our help
          </p>
        </div>

        {/* Main Featured Testimonial */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              {/* Video Section */}
              <div className="md:w-1/2 relative">
                <div className="aspect-video bg-gray-900 relative">
                  {selectedVideo ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      autoPlay
                      src={selectedVideo}
                    />
                  ) : (
                    <>
                      <img
                        src={currentTestimonial.videoThumbnail}
                        alt={`${currentTestimonial.name} testimonial`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback gradient background
                          (e.target as HTMLImageElement).style.display = 'none';
                          (e.target as HTMLImageElement).parentElement!.style.background = 
                            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <button
                          onClick={() => setSelectedVideo(currentTestimonial.videoUrl)}
                          className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full w-20 h-20 flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                        >
                          <Play className="h-8 w-8 text-blue-600 ml-1" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                        {currentTestimonial.duration}
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="md:w-1/2 p-8">
                <div className="flex items-center mb-6">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                    onError={(e) => {
                      // Fallback avatar
                      (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&background=2563eb&color=fff&size=64`;
                    }}
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{currentTestimonial.name}</h3>
                    <p className="text-blue-600 font-semibold">{currentTestimonial.profession}</p>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>

                <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 relative">
                  <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
                  <p className="italic pl-6">{currentTestimonial.quote}</p>
                </blockquote>

                {/* Journey Details */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <MapPin className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Journey</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      {currentTestimonial.fromCountry} → {currentTestimonial.toCountry}
                    </div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Award className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm font-medium text-gray-600">Salary Increase</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-900">
                      +{currentTestimonial.salaryIncrease}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-2">
                    <Briefcase className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="text-sm font-medium text-gray-600">Services Used</span>
                  </div>
                  <div className="text-sm text-gray-900">{currentTestimonial.serviceUsed}</div>
                  <div className="text-xs text-gray-500 mt-1">Completed: {currentTestimonial.completionDate}</div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={prevTestimonial}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </button>
                  
                  <div className="text-sm text-gray-500">
                    {currentIndex + 1} of {testimonials.length}
                  </div>
                  
                  <button
                    onClick={nextTestimonial}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
            {testimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.05 }}
                className={`relative aspect-square rounded-lg overflow-hidden ${
                  currentIndex === index ? 'ring-4 ring-blue-500' : 'ring-2 ring-gray-200'
                }`}
              >
                <img
                  src={testimonial.videoThumbnail}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.style.background = 
                      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                  <Play className="h-6 w-6 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                  <div className="text-white text-xs font-semibold truncate">
                    {testimonial.name}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-blue-600 rounded-2xl p-8 text-white max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Success Story?</h3>
            <p className="text-blue-100 mb-6">
              Join thousands of healthcare professionals who have achieved their international career dreams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-6 rounded-full transition-colors">
                Start My Journey
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-medium py-3 px-6 rounded-full transition-colors">
                Schedule Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}