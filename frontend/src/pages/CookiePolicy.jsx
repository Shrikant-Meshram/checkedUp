import React from 'react'
import {
  Calendar,
  Cookie,
  Settings,
  BarChart3,
  CheckCircle,
  Mail,
  Phone,
} from 'lucide-react'
import PublicLayout from '@/components/layout/PublicLayout'
import cookieImg from '@/assets/image/cookie-policy-hero.png'

const cookieTypes = [
  {
    type: 'Essential Cookies',
    purpose: 'Required for core website functionality',
    duration: 'Session / Persistent',
  },
  {
    type: 'Performance Cookies',
    purpose: 'Helps us improve website performance',
    duration: 'Up to 2 years',
  },
  {
    type: 'Functional Cookies',
    purpose: 'Remember your preferences and settings',
    duration: 'Up to 1 year',
  },
  {
    type: 'Targeting Cookies',
    purpose: 'Deliver relevant ads and measure campaign performance',
    duration: 'Up to 1 year',
  },
]

const sections = [
  {
    icon: Cookie,
    title: 'What Are Cookies?',
    content: 'Cookies are small text files that are placed on your device when you visit a website. They help the website remember your actions and preferences (such as login, language, and other display settings) for a period of time.',
  },
  {
    icon: Settings,
    title: 'How We Use Cookies',
    content: 'We use cookies for the following purposes:',
    list: [
      { label: 'Essential Cookies', desc: 'These cookies are necessary for the website to function properly and cannot be disabled.' },
      { label: 'Performance Cookies', desc: 'These cookies help us understand how visitors interact with our website by collecting information anonymously.' },
      { label: 'Functional Cookies', desc: 'These cookies enable enhanced functionality and personalization.' },
      { label: 'Targeting/Advertising Cookies', desc: 'These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads.' },
    ],
  },
  {
    icon: BarChart3,
    title: 'Types of Cookies We Use',
    content: '',
    table: true,
  },
  {
    icon: Settings,
    title: 'Your Choices',
    content: 'You can choose to accept or decline cookies. You can also set or change your browser settings to block or delete cookies. Please note that some parts of our website may not function properly if cookies are disabled.',
    button: true,
  },
  {
    icon: CheckCircle,
    title: 'Changes to This Policy',
    content: 'We may update this Cookie Policy from time to time. Any changes will be posted on this page with the updated date.',
  },
  {
    icon: Mail,
    title: 'Contact Us',
    content: 'If you have any questions about our use of cookies, please contact us.',
    contact: true,
  },
]

export default function CookiePolicy() {
  return (
    <PublicLayout>
      <div className="bg-card min-h-screen">
        {/* HERO */}
        <section className="enterprise-container py-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2">
              <span className="inline-block type-primary-body-b3-medium tracking-wider uppercase text-primary bg-primary/5 border border-primary/10 rounded-full px-4 py-1.5 mb-4">
                Cookie Policy
              </span>
              <h1 className="type-primary-heading-h0-mobile-medium md:type-primary-heading-h0-large text-foreground leading-tight mb-4">
                Cookie Policy
              </h1>
              <p className="text-muted-foreground type-primary-body-b2 leading-relaxed mb-6 max-w-lg">
                This Cookie Policy explains what cookies are, how we use them,
                and the choices you have regarding cookies when you visit our
                website.
              </p>
              <div className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2.5">
                <Calendar size={16} className="text-primary" />
                <span className="type-primary-body-b2 text-foreground">Last Updated: 12 May 2024</span>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden bg-primary/5 p-6">
                <img
                  src={cookieImg}
                  alt="Checked Up cookie policy"
                  className="w-full h-[180px] sm:h-[280px] md:h-[340px] object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTIONS */}
        <section className="enterprise-container pb-10">
          <div className="max-w-7xl mx-auto">
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {sections.map((section, index) => {
                const Icon = section.icon
                return (
                  <div
                    key={index}
                    className={`flex items-start gap-5 p-6 ${index < sections.length - 1 ? 'border-b border-border' : ''}`}
                  >
                    <div className="w-14 h-14 lg:w-18 lg:h-18 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-primary lg:hidden" />
                      <Icon size={28} className="text-primary hidden lg:block" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="type-primary-body-b1-medium text-foreground mb-2">
                        {index + 1}. {section.title}
                      </h3>
                      {section.content && (
                        <p className="type-primary-body-b2 text-muted-foreground leading-relaxed">
                          {section.content}
                        </p>
                      )}

                      {/* List for How We Use Cookies */}
                      {section.list && (
                        <div className="flex flex-col gap-3 mt-3">
                          {section.list.map((item, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle size={18} className="text-primary mt-0.5 flex-shrink-0" />
                              <p className="type-primary-body-b2 text-muted-foreground">
                                <span className="text-foreground type-primary-body-b2-medium">{item.label}:</span> {item.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Table for Types of Cookies */}
                      {section.table && (
                        <div className="mt-3 overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b border-border">
                                <th className="text-left py-3 pr-4 type-primary-body-b2-medium text-foreground">Cookie Type</th>
                                <th className="text-left py-3 pr-4 type-primary-body-b2-medium text-foreground">Purpose</th>
                                <th className="text-left py-3 type-primary-body-b2-medium text-foreground">Duration</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cookieTypes.map((cookie, i) => (
                                <tr key={i} className="border-b border-border last:border-0">
                                  <td className="py-3 pr-4 type-primary-body-b2 text-foreground">{cookie.type}</td>
                                  <td className="py-3 pr-4 type-primary-body-b2 text-muted-foreground">{cookie.purpose}</td>
                                  <td className="py-3 type-primary-body-b2 text-muted-foreground">{cookie.duration}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Button for Your Choices */}
                      {section.button && (
                        <button className="mt-3 inline-flex items-center gap-2 px-4 py-2 border border-primary/20 rounded-lg type-primary-body-b2-medium text-primary hover:bg-primary/5 transition">
                          <Settings size={16} />
                          Manage Cookie Preferences
                        </button>
                      )}

                      {/* Contact */}
                      {section.contact && (
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mt-3">
                          <a href="mailto:support@checkedup.com" className="flex items-center gap-2 text-primary hover:underline">
                            <Mail size={16} />
                            <span className="type-primary-body-b2-medium">support@checkedup.com</span>
                          </a>
                          <div className="hidden sm:block w-px h-4 bg-border" />
                          <a href="tel:18001234567" className="flex items-center gap-2 text-primary hover:underline">
                            <Phone size={16} />
                            <span className="type-primary-body-b2-medium">1800-123-4567</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      </div>
    </PublicLayout>
  )
}
