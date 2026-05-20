import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-black pt-24 pb-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-light tracking-widest uppercase text-white">Ink Nation</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs font-light">
              Bangalore's premier custom tattoo destination. 
              We don't just tattoo. We transcend.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-white">Studio</h4>
              <ul className="space-y-2 text-sm text-gray-500 font-light">
                <li className="hover:text-white cursor-pointer transition-colors">Artists</li>
                <li className="hover:text-white cursor-pointer transition-colors">Gallery</li>
                <li className="hover:text-white cursor-pointer transition-colors">Process</li>
                <li className="hover:text-white cursor-pointer transition-colors">Aftercare</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-white">Support</h4>
              <ul className="space-y-2 text-sm text-gray-500 font-light">
                <li className="hover:text-white cursor-pointer transition-colors">Consultation</li>
                <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
                <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs uppercase tracking-[0.2em] text-white">Connect</h4>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-300 cursor-pointer group">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-300 cursor-pointer group">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="mailto:hello@inknation.in" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-300 cursor-pointer group">
                <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
            <p className="text-xs text-gray-600 font-light">
              Indiranagar, Bangalore, KA 560038
            </p>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-gray-600 tracking-widest uppercase">
            © Ink Nation 2025. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-600 tracking-widest uppercase">
            Bangalore, India.
          </p>
        </div>
      </div>
    </footer>
  );
};
