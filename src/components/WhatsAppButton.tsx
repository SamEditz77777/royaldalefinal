import { MessageCircle } from 'lucide-react';
import { whatsappUrl, WHATSAPP_GREETING } from '../constants';

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl(WHATSAPP_GREETING)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full gradient-secondary flex items-center justify-center shadow-secondary hover:opacity-90 hover:scale-105 transition-all border-2 border-white"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={26} className="text-white" />
    </a>
  );
}
