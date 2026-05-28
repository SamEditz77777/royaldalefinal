import { MessageCircle } from 'lucide-react';
import { PHONE_DISPLAY, whatsappUrl, WHATSAPP_GREETING } from '../constants';

export default function WhatsAppCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-xl mx-auto text-center">
        <div className="inline-flex w-14 h-14 rounded-full bg-bronze-400/15 items-center justify-center mb-6">
          <MessageCircle size={28} className="text-bronze-600" />
        </div>
        <h2 className="font-serif text-3xl font-bold text-brown-900 mb-4">Chat with Us Instantly</h2>
        <p className="text-brown-600 mb-8 leading-relaxed">
          Quick questions? Message us on WhatsApp for immediate assistance at {PHONE_DISPLAY}.
        </p>
        <a
          href={whatsappUrl(WHATSAPP_GREETING)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white gradient-gold shadow-bronze hover:opacity-90 transition-all"
        >
          <MessageCircle size={20} />
          Start WhatsApp Chat
        </a>
        <p className="text-xs text-brown-600/60 mt-5">Available Mon–Sat, 9 AM – 7 PM</p>
      </div>
    </section>
  );
}
