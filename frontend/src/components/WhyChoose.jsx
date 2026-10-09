import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Shield, Clock, Home, DollarSign, Lock, Headphones 
} from 'lucide-react'
import { ROUTES } from '@/constants/routes'

const WhyChoose = () => {
  const features = [
    {
      icon: <Shield size={24} />,
      title: 'Trusted Labs',
      desc: 'Partnered with 100+ NABL accredited labs across India.',
    },
    {
      icon: <Clock size={24} />,
      title: 'Quick Reports',
      desc: 'Get reports within 24 hours for most tests.',
    },
    {
      icon: <Home size={24} />,
      title: 'Home Collection',
      desc: 'Book a sample collection at your convenience.',
    },
    {
      icon: <DollarSign size={24} />,
      title: 'Affordable Prices',
      desc: 'High-quality tests at pocket-friendly prices.',
    },
    {
      icon: <Lock size={24} />,
      title: 'Data Security',
      desc: 'Your data is encrypted and always protected.',
    },
    {
      icon: <Headphones size={24} />,
      title: 'Expert Support',
      desc: 'Our support team is here for you 24/7.',
    },
  ]

  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="enterprise-container">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-12 items-start">
          {/* Left Side */}
          <div className="space-y-4">
            <p className="type-primary-body-b3-medium text-primary tracking-wider uppercase">
              Why Choose Checked Up
            </p>
            <h2 className="type-primary-heading-h0-mobile-medium md:type-primary-heading-h0 !font-medium text-foreground leading-snug">
              Trusted care. Accurate results. <span className="text-primary">Always.</span>
            </h2>
            <p className="type-primary-body-b2 text-muted-foreground leading-relaxed">
              We are committed to delivering precise diagnostics with a seamless experience.
            </p>
            <div className="pt-2">
              <Link
                to={ROUTES.ABOUT}
                className="inline-block px-5 py-2.5 border-2 border-primary text-primary type-primary-button-c2 md:type-primary-button-c1 rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Know More About Us
              </Link>
            </div>
          </div>

          {/* Right Side - Features Grid */}
          <div className="flex flex-col">
            {/* Row 1 */}
            <div className="grid grid-cols-3">
              {features.slice(0, 3).map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 px-5 py-4 ${
                    index < 2 ? 'border-r border-border' : ''
                  }`}
                >
                  <div className="text-foreground flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="type-primary-body-b2-medium md:type-primary-body-b1-medium text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="type-primary-body-b3 text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Horizontal divider with gap */}
            <div className="border-t border-border my-3"></div>
            {/* Row 2 */}
            <div className="grid grid-cols-3">
              {features.slice(3, 6).map((item, index) => (
                <div 
                  key={index + 3} 
                  className={`flex items-start gap-3 px-5 py-4 ${
                    index < 2 ? 'border-r border-border' : ''
                  }`}
                >
                  <div className="text-foreground flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="type-primary-body-b2-medium md:type-primary-body-b1-medium text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="type-primary-body-b3 text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChoose
