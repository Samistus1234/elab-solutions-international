'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Clock, FileText, Globe, DollarSign } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'process' | 'requirements' | 'cost' | 'timeline';
  icon?: any;
}

const faqData: FAQItem[] = [
  {
    id: '1',
    category: 'general',
    icon: HelpCircle,
    question: 'What is the difference between DataFlow and other verification services?',
    answer: 'DataFlow is the most widely accepted Primary Source Verification (PSV) service specifically for Gulf countries. Unlike other services, DataFlow has direct agreements with regulatory authorities in UAE, Saudi Arabia, Qatar, Bahrain, and Oman, making it the preferred choice for healthcare licensing in these countries.'
  },
  {
    id: '2', 
    category: 'timeline',
    icon: Clock,
    question: 'How long does the entire licensing process take?',
    answer: 'The timeline varies by service: DataFlow PSV takes 25-45 working days, NCLEX preparation is 3-6 months, Middle East licensing is 6-16 weeks, and global placement can take 4-12 months depending on the destination country and specialty.'
  },
  {
    id: '3',
    category: 'requirements',
    icon: FileText,
    question: 'What documents do I need for international healthcare licensing?',
    answer: 'Essential documents include: Passport copy, Educational certificates and transcripts, Professional licenses, Experience certificates, Good standing certificates, English language test results (IELTS/OET/TOEFL), and passport-sized photographs with white background.'
  },
  {
    id: '4',
    category: 'cost',
    icon: DollarSign,
    question: 'What are the costs involved in the licensing process?',
    answer: 'Costs vary by service: DataFlow PSV ranges $800-1200, Exam preparation courses $500-1500, English language training $400-1200, Regulatory authority fees $200-800, and our service fees are transparently communicated upfront with no hidden charges.'
  },
  {
    id: '5',
    category: 'process',
    icon: Globe,
    question: 'Can I work in multiple countries with the same qualifications?',
    answer: 'Yes, but each country has specific requirements. Your nursing degree may be accepted globally, but you\'ll need country-specific licensing. For example, NCLEX for USA/Canada, NMC registration for UK, AHPRA for Australia, and DataFlow PSV for Gulf countries.'
  },
  {
    id: '6',
    category: 'timeline',
    icon: Clock,
    question: 'Can I start working while my license application is being processed?',
    answer: 'This depends on the country and your visa status. Some countries offer conditional/temporary licenses while your application is processed. Gulf countries typically require completed licensing before employment, while some Western countries may allow supervised practice.'
  },
  {
    id: '7',
    category: 'requirements',
    icon: FileText,
    question: 'Do I need to retake my nursing degree for international practice?',
    answer: 'No, you typically don\'t need to retake your degree. However, you may need to: Pass equivalency exams (like NCLEX), Complete bridging courses for skill gaps, Demonstrate English proficiency, and Complete orientation programs in your destination country.'
  },
  {
    id: '8',
    category: 'cost',
    icon: DollarSign,
    question: 'Are there payment plans available for your services?',
    answer: 'Yes! We offer flexible payment options including: Installment plans for exam preparation courses, Pay-as-you-go for document services, Package deals for multiple services, and Special discounts for early payments. Contact us for personalized payment options.'
  },
  {
    id: '9',
    category: 'general',
    icon: HelpCircle,
    question: 'What if my application gets rejected?',
    answer: 'We have a 98% success rate, but if issues arise, we provide: Free resubmission after addressing concerns, Appeals assistance with detailed guidance, Alternative pathway recommendations, and Refund policy for services not delivered as promised.'
  },
  {
    id: '10',
    category: 'process',
    icon: Globe,
    question: 'Do you provide job placement guarantees?',
    answer: 'While we can\'t guarantee job placement (as this depends on market conditions and individual qualifications), we offer: Access to our extensive employer network, Interview preparation and CV optimization, Ongoing support until placement, and A 96% historical placement success rate for qualified candidates.'
  }
];

const categories = [
  { value: 'all', label: 'All Questions', icon: HelpCircle },
  { value: 'general', label: 'General', icon: HelpCircle },
  { value: 'process', label: 'Process', icon: Globe },
  { value: 'requirements', label: 'Requirements', icon: FileText },
  { value: 'timeline', label: 'Timeline', icon: Clock },
  { value: 'cost', label: 'Cost', icon: DollarSign }
];

interface FAQAccordionProps {
  title?: string;
  subtitle?: string;
}

export function FAQAccordion({ title = 'Frequently Asked Questions', subtitle = 'Find answers to common questions about our healthcare licensing services' }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = selectedCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    {faq.icon && (
                      <div className="bg-blue-100 rounded-full p-2 flex-shrink-0 mt-1">
                        <faq.icon className="h-5 w-5 text-blue-600" />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-800 pr-8">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: openItems.includes(faq.id) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {openItems.includes(faq.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <div className="pl-16">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-6">
              Our expert consultants are here to help you with personalized guidance for your healthcare career journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Schedule Free Consultation
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors">
                Live Chat Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}