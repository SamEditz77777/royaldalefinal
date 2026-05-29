import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_TEL } from '../constants';
import Logo from './Logo';

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Door Sizes', href: '#door-sizes' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);

    const el = document.querySelector(href);

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-primary-50/95 backdrop-blur-sm shadow-soft border-b border-warm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
              }}
              className="flex items-center min-w-0 flex-shrink-0"
              aria-label="ROYALDALE Home"
            >
              <Logo size="md" />
            </a>

            <div className="hidden lg:flex items-center gap-8">

              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-secondary-700 hover:text-secondary-600 transition-colors"
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => handleNavClick('#quote')}
                className="px-5 py-2.5 rounded-full text-sm font-semibold gradient-secondary text-white shadow-secondary hover:opacity-90 transition-all duration-200"
              >
                Request Quote
              </button>

              <a
                href={`tel:${PHONE_TEL}`}
                className="flex items-center gap-2 text-sm font-medium text-secondary-700 hover:text-secondary-600 whitespace-nowrap"
              >
                <Phone size={16} />
                {PHONE_DISPLAY}
              </a>

            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl text-secondary-700 hover:bg-primary-200 transition-all"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-primary-50 border-b border-warm shadow-soft lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-4 py-6 flex flex-col gap-1">

            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-base font-medium text-secondary-700 py-3 border-b border-warm hover:text-secondary-600"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => handleNavClick('#quote')}
              className="mt-4 w-full py-3.5 rounded-full font-semibold gradient-secondary text-white"
            >
              Request Quote
            </button>

            <a
              href={`tel:${PHONE_TEL}`}
              className="flex items-center justify-center gap-2 text-sm text-secondary-600 mt-4 py-2"
            >
              <Phone size={16} />
              {PHONE_DISPLAY}
            </a>

          </div>
        </div>
      )}
    </>
  );
}