"use client";

import React from "react";
import { Phone } from "lucide-react";

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.461c-1.926 0-3.71-.518-5.253-1.417l-.376-.222-3.903 1.023 1.041-3.805-.246-.391c-1.002-1.593-1.53-3.447-1.53-5.352 0-5.428 4.417-9.845 9.846-9.845 2.628 0 5.098 1.023 6.955 2.882 1.858 1.859 2.88 4.329 2.88 6.957 0 5.429-4.417 9.846-9.847 9.846m0-21.7c-6.539 0-11.858 5.32-11.858 11.857 0 2.09.544 4.133 1.579 5.926l-1.677 6.126 6.269-1.644c1.723.939 3.67 1.435 5.684 1.435 6.541 0 11.86-5.32 11.86-11.857 0-3.167-1.233-6.145-3.473-8.384-2.24-2.24-5.216-3.473-8.384-3.473" />
  </svg>
);

export const FloatingContact = () => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] flex flex-col gap-2.5 sm:gap-3 items-end select-none pointer-events-auto">
      {/* WhatsApp Floating Icon Button */}
      <a
        href="https://wa.me/918123713723"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
        className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all duration-300 transform hover:scale-110 active:scale-95 border border-emerald-400/30"
      >
        <WhatsAppIcon className="w-4.5 h-4.5 sm:w-6 sm:h-6 text-white" />
      </a>

      {/* Call Studio Floating Icon Button */}
      <a
        href="tel:+918123713723"
        aria-label="Call Studio"
        title="Call Studio"
        className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#00f0ff] hover:bg-cyan-300 flex items-center justify-center shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:scale-110 active:scale-95 border border-cyan-400/40"
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.7} />
      </a>
    </div>
  );
};
