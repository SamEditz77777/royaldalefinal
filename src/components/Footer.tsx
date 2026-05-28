import { Phone, Mail, MapPin, Download, ArrowRight, MessageCircle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL, whatsappUrl } from '../constants';
import Logo from './Logo';

const productLinks = [
  'Laminate Doors',
  'Lamination Doors',
  'FRP Doors',
  'PVC Doors',
  'WPC Doors',
  'Gel Coated Doors',
  'Laminates',
  'Plywood',
  'Lipping Patti',
];
const quickLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Door Sizes', href: '#door-sizes' },
  { label: 'Request Quote', href: '#quote' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-ivory-100 border-t border-warm text-brown-800">
      <div className="bg-gradient-to-r from-bronze-500/90 to-gold-500/90 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-3">
            Ready to Start Your Project?
          </h2>
          <p className="text-ivory-50 text-lg mb-8 opacity-95">Get a free custom quote within 24 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleNavClick('#quote')}
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-bronze-800 bg-white hover:bg-ivory-50 transition-all shadow-soft"
            >
              Request Free Quote <ArrowRight size={16} />
            </button>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-white border-2 border-white/60 hover:bg-white/15 transition-all"
            >
              <MessageCircle size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-5">
              <Logo size="md" showTagline className="mb-1" />
            </div>
            <p className="text-brown-600 text-sm leading-relaxed mb-5">
              Premium door manufacturing for residential, commercial, and industrial projects across India.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-bronze-600 hover:text-bronze-700 transition-colors"
            >
              <Download size={16} /> Download Catalog (PDF)
            </a>
          </div>

          <div>
            <h3 className="text-brown-900 font-semibold text-sm uppercase tracking-wider mb-5">Products</h3>
            <ul className="space-y-2.5">
              {productLinks.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavClick('#products')}
                    className="text-brown-600 text-sm hover:text-bronze-600 transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-brown-900 font-semibold text-sm uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-brown-600 text-sm hover:text-bronze-600 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-brown-900 font-semibold text-sm uppercase tracking-wider mb-5">Contact</h3>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-bronze-600 flex-shrink-0 mt-0.5" />
                <span className="text-brown-600">Handewadi, Pune - 411028</span>
              </div>
              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-2.5 text-brown-600 hover:text-bronze-600 transition-colors"
              >
                <Phone size={16} className="text-bronze-600" /> {PHONE_DISPLAY}
              </a>
              <a
                href="mailto:royaldaleindia@gmail.com"
                className="flex items-center gap-2.5 text-brown-600 hover:text-bronze-600 transition-colors"
              >
                <Mail size={16} className="text-bronze-600" /> royaldaleindia@gmail.com
              </a>
            </div>
            <p className="mt-6 text-xs text-brown-600/70 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-bronze-500" />
              Proudly Made in India
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-warm px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-brown-600">
          <span>© {new Date().getFullYear()} ROYAL DALE. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="hover:text-bronze-600 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-bronze-600 cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
