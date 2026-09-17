import React from 'react'
import { Link } from 'react-router-dom'
import { 
  ShieldCheck, Home, Lock, MapPin, Phone, Mail, Clock,
  Users, ClipboardCheck, MapPinIcon, Star, ChevronRight
} from 'lucide-react'
import { ROUTES } from '@/constants/routes'
import Logo from '@/components/ui/Logo'

const companyLinks = [
  { label: 'About Us', href: ROUTES.ABOUT },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Careers', href: '/careers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Media & News', href: '/media' },
  { label: 'Contact Us', href: ROUTES.CONTACT },
]

const testLinks = [
  { label: 'All Tests', href: ROUTES.TESTS },
  { label: 'Blood Tests', href: `${ROUTES.TESTS}?category=Blood` },
  { label: 'Health Checkups', href: `${ROUTES.TESTS}?category=Health+Checkup` },
  { label: 'Home Collection', href: `${ROUTES.TESTS}?collection=home` },
  { label: 'Popular Tests', href: ROUTES.TESTS },
  { label: 'Test by Category', href: ROUTES.TESTS },
]

const supportLinks = [
  { label: 'Help Center', href: '/help' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Sample Collection Guide', href: '/guide' },
  { label: 'Reports Guide', href: '/reports-guide' },
  { label: 'Privacy Policy', href: ROUTES.PRIVACY_POLICY },
  { label: 'Terms & Conditions', href: ROUTES.TERMS_OF_SERVICE },
]

const features = [
  { icon: ShieldCheck, title: 'NABL Accredited Labs', desc: 'Quality you can trust', iconBg: 'bg-primary/10', iconColor: 'text-primary' },
  { icon: Home, title: 'Home Sample Collection', desc: 'Safe & convenient', iconBg: 'bg-success/10', iconColor: 'text-success' },
  { icon: Lock, title: '100% Secure & Private', desc: 'Your data is always safe', iconBg: 'bg-secondary/10', iconColor: 'text-secondary' },
]

const stats = [
  { icon: Users, value: '10,000+', label: 'Happy Customers', iconColor: 'text-primary' },
  { icon: ClipboardCheck, value: '2,500+', label: 'Tests & Profiles', iconColor: 'text-success' },
  { icon: MapPinIcon, value: '150+', label: 'Cities Covered', iconColor: 'text-primary' },
  { icon: Star, value: '98%', label: 'Customer Satisfaction', iconColor: 'text-warning' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-surface border-t border-border">
      <div className="enterprise-container pt-10 md:pt-12 pb-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] gap-8 lg:gap-8 mb-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo className="mb-4" />
            <p className="type-primary-body-b2 text-muted-foreground leading-relaxed max-w-[260px] mb-6">
              Your trusted partner for accurate diagnostics and better health. Book tests, get reports and take charge of your health today.
            </p>
            <div className="space-y-3">
              {features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${feat.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <feat.icon size={18} className={feat.iconColor} />
                  </div>
                  <div>
                    <p className="type-primary-body-b2-medium text-foreground">{feat.title}</p>
                    <p className="type-primary-body-b2 text-muted-foreground">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="type-primary-label-l1Medium text-foreground mb-4 pb-2 border-b-2 border-primary inline-block">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="type-primary-body-b2 text-muted-foreground hover:text-primary transition flex items-center gap-2"
                  >
                    <ChevronRight size={12} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tests Links */}
          <div>
            <h4 className="type-primary-label-l1Medium text-foreground mb-4 pb-2 border-b-2 border-primary inline-block">
              Tests
            </h4>
            <ul className="space-y-2.5">
              {testLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="type-primary-body-b2 text-muted-foreground hover:text-primary transition flex items-center gap-2"
                  >
                    <ChevronRight size={12} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="type-primary-label-l1Medium text-foreground mb-4 pb-2 border-b-2 border-primary inline-block">
              Support
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="type-primary-body-b2 text-muted-foreground hover:text-primary transition flex items-center gap-2"
                  >
                    <ChevronRight size={12} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="type-primary-label-l1Medium text-foreground mb-4 pb-2 border-b-2 border-primary inline-block">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="type-primary-body-b2 text-muted-foreground">Pune, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <span className="type-primary-body-b2 text-muted-foreground">+91 12345 67890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <span className="type-primary-body-b2 text-muted-foreground">support@checkedup.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-primary flex-shrink-0" />
                <span className="type-primary-body-b2 text-muted-foreground">Mon - Sun: 8:00 AM - 8:00 PM</span>
              </li>
            </ul>

            <div className="mt-5">
              <p className="type-primary-body-b2-medium text-foreground mb-2">We Accept</p>
              <div className="flex gap-2 flex-wrap">
                {['VISA', 'MC', 'UPI', 'Paytm', 'PhonePe'].map((method) => (
                  <span
                    key={method}
                    className="px-2 py-1 bg-card border border-border rounded type-primary-body-b2-medium text-muted-foreground"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-card rounded-2xl border border-border p-5 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail size={24} className="text-primary md:w-7 md:h-7" />
              </div>
              <div>
                <p className="type-primary-body-b2-medium text-foreground">Stay Updated with Health Tips</p>
                <p className="type-primary-body-b2-medium text-foreground">& Exclusive Offers</p>
              </div>
            </div>
            <p className="type-primary-body-b2 text-muted-foreground flex-1 hidden md:block">
              Subscribe to our newsletter and never miss important health updates.
            </p>
            <div className="flex-1 w-full md:w-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2.5 border border-border rounded-lg type-primary-body-b2 text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                />
                <button className="px-5 md:px-6 py-2.5 bg-primary text-primary-foreground rounded-lg type-primary-button-c2 md:type-primary-button-c1 hover:bg-primary/90 transition">
                  Subscribe
                </button>
              </div>
              <p className="type-primary-body-b2 text-muted-foreground mt-2">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3 bg-card rounded-xl border border-border p-3 md:p-4">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface flex items-center justify-center flex-shrink-0">
                <stat.icon size={18} className={stat.iconColor} />
              </div>
              <div>
                <p className="type-primary-body-b1-medium md:text-lg md:font-bold text-foreground">{stat.value}</p>
                <p className="type-primary-body-b2 text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-5 md:pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="type-primary-body-b2 text-muted-foreground">
            © {year} Checked Up Lab Tests. All rights reserved.
          </span>
          <div className="flex items-center gap-3 md:gap-4 flex-wrap justify-center">
            <Link to={ROUTES.PRIVACY_POLICY} className="type-primary-body-b2 text-muted-foreground hover:text-primary transition">
              Privacy Policy
            </Link>
            <span className="text-border">|</span>
            <Link to={ROUTES.TERMS_OF_SERVICE} className="type-primary-body-b2 text-muted-foreground hover:text-primary transition">
              Terms of Service
            </Link>
            <span className="text-border">|</span>
            <Link to={ROUTES.REFUND_POLICY} className="type-primary-body-b2 text-muted-foreground hover:text-primary transition">
              Refund Policy
            </Link>
            <span className="text-border">|</span>
            <Link to={ROUTES.COOKIE_POLICY} className="type-primary-body-b2 text-muted-foreground hover:text-primary transition">
              Cookie Policy
            </Link>
          </div>
          <div className="flex items-center gap-2.5 md:gap-3">
            {['FB', 'IG', 'IN', 'X'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-full bg-surface flex items-center justify-center type-primary-body-b2-medium text-muted-foreground hover:bg-primary hover:text-primary-foreground transition"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
