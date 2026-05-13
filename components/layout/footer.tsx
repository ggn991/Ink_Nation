import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-black pt-24 pb-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-widest uppercase text-white">Ink Nation</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Bangalore's premier custom tattoo destination. 
              We don't just tattoo. We transcend.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-white">Studio</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="hover:text-white cursor-pointer transition-colors">Artists</li>
                <li className="hover:text-white cursor-pointer transition-colors">Gallery</li>
                <li className="hover:text-white cursor-pointer transition-colors">Process</li>
                <li className="hover:text-white cursor-pointer transition-colors">Aftercare</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.2em] text-white">Support</h4>
              <ul className="space-y-2 text-sm text-gray-500">
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
              {/* Simple icon placeholders for aesthetic */}
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-violet-500/50 transition-colors cursor-pointer group">
                <div className="w-1.5 h-1.5 bg-gray-500 group-hover:bg-violet-500 rounded-full" />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-violet-500/50 transition-colors cursor-pointer group">
                <div className="w-1.5 h-1.5 bg-gray-500 group-hover:bg-violet-500 rounded-full" />
              </div>
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-violet-500/50 transition-colors cursor-pointer group">
                <div className="w-1.5 h-1.5 bg-gray-500 group-hover:bg-violet-500 rounded-full" />
              </div>
            </div>
            <p className="text-xs text-gray-600">
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
