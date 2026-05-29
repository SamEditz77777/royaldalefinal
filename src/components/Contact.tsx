import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL } from '../constants';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Address',
    lines: ['S.NO.1/1, Sayaji Hande Industrial Estate,', 'Handewadi, Pune - 411028'],
  },
  {
    icon: Phone,
    title: 'Phone',
    lines: [PHONE_DISPLAY],
    href: `tel:${PHONE_TEL}`,
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['royaldaleindia@gmail.com'],
    href: 'mailto:royaldaleindia@gmail.com',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    lines: ['Monday - Saturday', '9:00 AM - 7:00 PM'],
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-primary-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-secondary-600 font-medium text-sm uppercase tracking-[0.2em] mb-4">Get in Touch</p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-secondary-900 mb-5">Contact Us</h2>
          <p className="text-secondary-600 text-lg max-w-xl mx-auto leading-relaxed">
            Visit our facility or reach out through any of the channels below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="grid sm:grid-cols-2 gap-5">
            {contactInfo.map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-warm shadow-soft">
                <item.icon size={24} className="text-secondary-600 mb-4" />
                <h3 className="text-sm font-semibold text-secondary-800 uppercase tracking-wider mb-2">{item.title}</h3>
                {item.href ? (
                  <a href={item.href} className="text-secondary-600 text-sm hover:text-secondary-600 transition-colors block">
                    {item.lines.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </a>
                ) : (
                  item.lines.map((line, i) => (
                    <p key={i} className="text-secondary-600 text-sm">
                      {line}
                    </p>
                  ))
                )}
              </div>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden border border-warm shadow-soft min-h-[320px]">
            <iframe
              title="ROYAL DALE Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121058.92867970682!2d73.79292787910156!3d18.5248704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828dad55fd8e1e5!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '320px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
