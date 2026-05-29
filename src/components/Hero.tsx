import { ArrowRight, MessageCircle } from 'lucide-react';
import { whatsappUrl, WHATSAPP_GREETING } from '../constants';

export default function Hero() {
  const scrollToQuote = () => {
    document.querySelector('#quote')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden gradient-primary">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#3D2E1F 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div>
            <p className="text-secondary-600 font-medium text-sm uppercase tracking-[0.2em] mb-5">
              Premium Door Production Since 2018
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 leading-[1.12] mb-6">
              Premium Door Solutions for{' '}
              <span className="text-secondary-600">Every Space</span>
            </h1>
            <p className="text-lg text-secondary-600 leading-relaxed mb-10 max-w-xl">
              Custom doors crafted for residential, commercial and industrial projects. Luxury production from Pune, India.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToQuote}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-white gradient-secondary shadow-secondary hover:opacity-90 transition-all"
              >
                Request Free Quote
                <ArrowRight size={18} />
              </button>
              <a
                href={whatsappUrl(WHATSAPP_GREETING)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold text-secondary-800 bg-white border border-warm hover:border-secondary-400 shadow-soft transition-all"
              >
                <MessageCircle size={18} className="text-secondary-600" />
                WhatsApp Us
              </a>
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
              <div className="font-serif text-2xl font-bold text-secondary-600">Made in India</div>
              <div className="text-xs text-secondary-600 mt-0.5">Premium Quality Assured</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
