import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-dark-green text-warm-sand/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-sm border border-warm-sand/10">
                <Image src="/images/logo.png" alt="ArthaSakhi Logo" width={40} height={40} className="w-full h-full object-cover" />
              </div>
              <span className="font-heading text-xl font-semibold text-warm-sand tracking-tight">
                ArthaSakhi
              </span>
            </div>
            <p className="text-sm leading-relaxed text-warm-sand/50 max-w-xs">
              A grassroots financial awareness initiative empowering women with 
              financial knowledge and strengthening families through smart investing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-warm-sand uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {['About Us', 'Our Services', 'Workshops', 'Impact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-warm-sand/50 hover:text-terracotta transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-warm-sand uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {['Financial Literacy', 'Investment Education', 'Mutual Fund Awareness', 'Family Planning'].map((svc) => (
                <li key={svc}>
                  <a
                    href="#services"
                    className="text-sm text-warm-sand/50 hover:text-terracotta transition-colors duration-300"
                  >
                    {svc}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-warm-sand uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:contact@arthasakhi.com" className="text-sm text-warm-sand/50 hover:text-terracotta transition-colors duration-300">
                  contact@arthasakhi.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-warm-sand/50">Rajasthan, India</span>
              </li>
              <li className="flex items-start gap-2.5">
                <svg className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919999999999" className="text-sm text-warm-sand/50 hover:text-terracotta transition-colors duration-300">
                  +91 99999 99999
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-warm-sand/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-warm-sand/30">
            © {new Date().getFullYear()} ArthaSakhi. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs text-warm-sand/30 hover:text-warm-sand/60 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
