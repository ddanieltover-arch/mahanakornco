import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/site-images";
import { pageImageMeta } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name} for wholesale quotes and product inquiries.`,
  ...pageImageMeta(siteImages.pages.contact),
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Get a Quote"
        tagline="Here's how you can get in touch"
        subtitle="Contact us for wholesale pricing, product specifications, and export inquiries."
        image={siteImages.pages.contact}
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <div className="flex h-full flex-col rounded-xl bg-primary-dark p-8 shadow-lg text-white">
              <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="flex flex-1 flex-col justify-center space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Office Phone</p>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-accent hover:text-white transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-accent hover:text-white transition-colors break-all"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                {siteConfig.addresses.map((addr) => (
                  <div key={addr.label} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10">
                      <MapPin className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{addr.label}</p>
                      <p className="text-white/75 text-sm leading-relaxed">{addr.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex h-full flex-col rounded-xl border bg-white p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-primary-dark mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
