"use client";

import React from "react";
import { AppProviders } from "@/components/layout/app-providers";
import { ContactSection } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";
import { BreadcrumbSchema, LocalBusinessSchema } from "@/lib/seo/json-ld";

export default function ContactPage() {
  const breadcrumbs = [
    { name: "Home", item: "/" },
    { name: "Contact", item: "/contact" }
  ];

  return (
    <AppProviders>
      <BreadcrumbSchema items={breadcrumbs} />
      <LocalBusinessSchema />
      <main className="min-h-screen bg-black text-white pt-24">
        <ContactSection />
        <Footer />
      </main>
    </AppProviders>
  );
}
