'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Dr. Sarah Ahmed',
    role: 'Registered Nurse',
    country: 'Now in Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=200&q=80',
    content: 'eLab Solutions made my dream of working in Dubai a reality. Their team guided me through every step of the DataFlow process and DHA licensing. The CentralOps platform kept me informed throughout.',
    rating: 5,
  },
  {
    name: 'John Okafor',
    role: 'Medical Laboratory Scientist',
    country: 'Now in Riyadh, KSA',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=200&q=80',
    content: 'The ELAB Academy helped me pass my SCFHS exam on the first attempt. The AI tutors and mock tests were incredibly helpful. I highly recommend their services to any healthcare professional.',
    rating: 5,
  },
  {
    name: 'Fatima Al-Hassan',
    role: 'Pharmacist',
    country: 'Now in Abu Dhabi, UAE',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    content: 'Professional, efficient, and reliable. eLab Solutions handled my credential evaluation and HAAD licensing seamlessly. Their multilingual support made communication easy throughout the process.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Success Stories from Our Clients
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of healthcare professionals who have advanced their careers with our support
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-primary-100" />
              
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-primary-600">{testimonial.country}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}