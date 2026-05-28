import { ArrowRight, MessageCircle } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL, whatsappUrl, WHATSAPP_GREETING } from '../constants';

export default function Hero() {
  const scrollToQuote = () => {
    document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden gradient-ivory">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#A68B5B 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <p className="text-bronze-600 font-medium text-sm uppercase tracking-[0.2em] mb-5">
              Premium Door Manufacturing Since 2018
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-brown-900 leading-[1.12] mb-6">
              Premium Door Solutions for{' '}
              <span className="text-bronze-600">Every Space</span>
            </h1>
            <p className="text-lg text-brown-600 leading-relaxed mb-10 max-w-xl">
              Custom doors crafted for residential, commercial and industrial projects. Luxury manufacturing from Pune, India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToQuote}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white gradient-gold shadow-bronze hover:opacity-90 transition-all"
              >
                Request Free Quote
                <ArrowRight size={18} />
              </button>
              <a
                href={whatsappUrl(WHATSAPP_GREETING)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-brown-800 bg-white border border-warm hover:border-bronze-400 shadow-soft transition-all"
              >
                <MessageCircle size={18} className="text-bronze-600" />
                WhatsApp Us
              </a>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-16 pt-10 border-t border-warm">
              {[
                { value: '6+', label: 'Years' },
                { value: '500+', label: 'Clients' },
                { value: '9', label: 'Products' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-serif text-3xl font-bold text-bronze-600">{stat.value}</div>
                  <div className="text-sm text-brown-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-warm aspect-[4/3]">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900&q=85"
                alt="Premium interior door"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-soft px-6 py-4 border border-warm">
              <div className="font-serif text-2xl font-bold text-bronze-600">Made in India</div>
              <div className="text-xs text-brown-600 mt-0.5">Premium Quality Assured</div>
            </div>
            <a
              href={`tel:${PHONE_TEL}`}
              className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-soft border border-warm text-sm font-medium text-brown-800 hover:border-bronze-400 transition-colors"
            >
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
