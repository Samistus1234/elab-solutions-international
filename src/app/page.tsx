'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FileCheck, Award, ClipboardList, Globe, Star, 
  ArrowRight, Users, TrendingUp, Shield, Zap,
  CheckCircle, Heart, Building, MapPin
} from 'lucide-react';

// Enhanced services data with more details
const servicesData = [
  {
    id: 'dataflow',
    title: 'DataFlow Verification',
    description: 'Fast-track your PSV application with our expert assistance for all major Gulf health authorities.',
    icon: FileCheck,
    color: 'from-blue-500 to-blue-600',
    features: ['Quick Processing', 'Expert Support', '99% Success Rate'],
    href: '/services/dataflow'
  },
  {
    id: 'licensing',
    title: 'Regulatory Licensing',
    description: 'Navigate the complex licensing process with ease. We guide you every step of the way.',
    icon: Award,
    color: 'from-green-500 to-green-600',
    features: ['Global Recognition', 'Step-by-Step Guide', 'Compliance Assured'],
    href: '/services/licensing'
  },
  {
    id: 'credentials',
    title: 'Credential Evaluation',
    description: 'Get your educational credentials evaluated and recognized for immigration and professional purposes.',
    icon: ClipboardList,
    color: 'from-purple-500 to-purple-600',
    features: ['Recognized Evaluations', 'Fast Turnaround', 'Immigration Ready'],
    href: '/services/credentials'
  },
  {
    id: 'nclex',
    title: 'NCLEX Preparation',
    description: 'Comprehensive preparation program to help you pass NCLEX-RN on your first attempt.',
    icon: Star,
    color: 'from-orange-500 to-orange-600',
    features: ['Expert Tutoring', 'Mock Exams', 'Study Materials'],
    href: '/services/nclex'
  },
  {
    id: 'placement',
    title: 'Global Placement',
    description: 'Connect with top healthcare institutions worldwide for your dream career.',
    icon: Globe,
    color: 'from-teal-500 to-teal-600',
    features: ['Top Institutions', 'Career Matching', 'Ongoing Support'],
    href: '/services/placement'
  },
  {
    id: 'consultation',
    title: 'Expert Consultation',
    description: 'One-on-one guidance from industry experts to plan your healthcare career path.',
    icon: Users,
    color: 'from-pink-500 to-pink-600',
    features: ['Personalized Advice', '24/7 Support', 'Career Planning'],
    href: '/consultation'
  }
];

const statsData = [
  { number: '2,500+', label: 'Professionals Placed', icon: Users },
  { number: '25+', label: 'Countries Served', icon: Globe },
  { number: '99%', label: 'Success Rate', icon: TrendingUp },
  { number: '5★', label: 'Client Rating', icon: Star }
];

const testimonials = [
  {
    quote: "eLab made the entire credentialing process seamless. Their team was professional, responsive, and incredibly supportive. I couldn't have done it without them.",
    author: "Fatima Al-Mansoori",
    role: "Registered Nurse",
    location: "UAE",
    avatar: "FA",
    rating: 5
  },
  {
    quote: "The exam preparation materials from ELAB Academy were top-notch. I passed my NCLEX on the first try. Highly recommended!",
    author: "Dr. Johnathan Chen",
    role: "General Practitioner",
    location: "USA",
    avatar: "JC",
    rating: 5
  },
  {
    quote: "From DataFlow to finding a job, eLab handled everything. I was able to relocate and start my new job in Qatar within months.",
    author: "Maria Garcia",
    role: "Physical Therapist",
    location: "Qatar",
    avatar: "MG",
    rating: 5
  }
];

const FloatingParticle = ({ delay = 0 }) => (
  <motion.div
    className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
    initial={{ y: 100, opacity: 0 }}
    animate={{ 
      y: -20, 
      opacity: [0, 0.6, 0],
      x: [0, 20, -10, 0]
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      repeatType: 'loop'
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`
    }}
  />
);

const CounterAnimation = ({ end, duration = 2, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const endValue = typeof end === 'string' ? parseInt(end.replace(/\D/g, '')) : end;
      let start = 0;
      const increment = endValue / (duration * 60);
      const timer = setInterval(() => {
        start += increment;
        if (start >= endValue) {
          setCount(endValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, hasAnimated, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const statsRef = useRef(null);
  
  const isHeroInView = useInView(heroRef);
  const isServicesInView = useInView(servicesRef);
  const isStatsInView = useInView(statsRef);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="overflow-hidden">
      {/* Enhanced Hero Section */}
      <section ref={heroRef} className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <FloatingParticle key={i} delay={i * 0.2} />
          ))}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30"></div>
          
          {/* Geometric shapes */}
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 border border-white/10 rotate-45"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-purple-100"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              Your Global Healthcare Career Starts Here
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              eLab Solutions International is your trusted partner for credentialing, licensing, and placement in the world's leading healthcare institutions.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/services" className="group relative inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span className="mr-2">Explore Our Services</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/contact" className="group inline-flex items-center px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold rounded-full transition-all duration-300">
                  <span className="mr-2">Contact Us</span>
                  <Heart className="h-5 w-5 transition-transform group-hover:scale-110" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              className="flex justify-center items-center space-x-8 opacity-70"
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 0.7 } : {}}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-sm">Trusted & Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-blue-400" />
                <span className="text-sm">Global Reach</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">Industry Leading</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Services Section */}
      <section ref={servicesRef} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
              whileInView={{ scale: [0.9, 1.02, 1] }}
              transition={{ duration: 0.6 }}
            >
              Our Core Services
            </motion.h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide a comprehensive suite of services to streamline your journey to a global healthcare career.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group"
              >
                <div className="relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                  
                  {/* Icon with animation */}
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl mb-6 shadow-lg`}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-gray-900 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features list */}
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <motion.div whileHover={{ x: 5 }} className="mt-auto">
                    <Link 
                      href={service.href} 
                      className={`inline-flex items-center text-transparent bg-clip-text bg-gradient-to-r ${service.color} font-semibold hover:underline`}
                    >
                      Learn More 
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Statistics Section */}
      <section ref={statsRef} className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-10"
            animate={{
              backgroundImage: [
                'radial-gradient(circle at 20% 20%, white 1px, transparent 1px)',
                'radial-gradient(circle at 80% 80%, white 1px, transparent 1px)',
                'radial-gradient(circle at 40% 60%, white 1px, transparent 1px)'
              ]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            style={{ backgroundSize: '50px 50px' }}
          />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Proven Results, Global Reach</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our numbers speak for themselves. We are committed to excellence and success in every case.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group"
              >
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl text-center hover:bg-white/20 transition-all duration-300 border border-white/20">
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  
                  <motion.h3 className="text-5xl md:text-6xl font-extrabold mb-2">
                    {stat.number === '2,500+' ? (
                      <>
                        <CounterAnimation end="2500" />+
                      </>
                    ) : stat.number === '25+' ? (
                      <>
                        <CounterAnimation end="25" />+
                      </>
                    ) : stat.number === '99%' ? (
                      <>
                        <CounterAnimation end="99" />%
                      </>
                    ) : (
                      stat.number
                    )}
                  </motion.h3>
                  <p className="text-lg font-semibold text-blue-100">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Success Stories Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from healthcare professionals who have achieved their global career goals with our help.
            </p>
          </motion.div>
          
          {/* Enhanced testimonial carousel */}
          <div className="relative max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100"
            >
              <div className="flex justify-center mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-8 text-center leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              
              <div className="flex items-center justify-center">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-16 h-16 flex items-center justify-center text-white font-bold text-lg mr-4">
                  {testimonials[currentTestimonial].avatar}
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg text-gray-900">{testimonials[currentTestimonial].author}</p>
                  <p className="text-gray-600">{testimonials[currentTestimonial].role}</p>
                  <div className="flex items-center justify-center mt-1">
                    <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                    <p className="text-sm text-gray-500">{testimonials[currentTestimonial].location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Testimonial navigation */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Start Your Journey?</h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Join thousands of healthcare professionals who have successfully launched their international careers with eLab Solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/get-started" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                  <span className="mr-2">Get Started Today</span>
                  <Zap className="h-5 w-5" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/consultation" className="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold rounded-full transition-all duration-300">
                  <span className="mr-2">Book Consultation</span>
                  <Users className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}