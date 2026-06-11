import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { RelatedInfoNav } from "@/components/info-page/RelatedInfoNav";
import { InfoIntro } from "@/components/info-page/InfoIntro";
import { PolicySection } from "@/components/info-page/PolicySection";
import { InfoCta } from "@/components/info-page/InfoCta";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { siteConfig } from "@/config/site";
import { siteImages } from "@/config/site-images";
import { pageImageMeta } from "@/lib/metadata";
import { Scale, Shield, FileText, Copyright, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
  ...pageImageMeta(siteImages.pages["privacy-policy"]),
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        tagline="Legal Information"
        subtitle="How we collect, use, and protect your personal information."
        image={siteImages.pages["privacy-policy"]}
      />
      <RelatedInfoNav />

      <InfoIntro
        tagline="Your Privacy Matters"
        title="Transparent Data Practices"
        description={`At ${siteConfig.name}, we are committed to protecting your privacy. This page explains how we handle your information when you enquire about or order our products.`}
      />

      <section className="pb-20 bg-cream">
        <div className="mx-auto max-w-3xl px-4">
          <Stagger className="space-y-6">
            <StaggerItem>
            <PolicySection icon={Scale} title="Legal Notice">
              <p>
                When you place an online order, we may require your name, email address, delivery
                address, phone number, and other necessary details. This information allows us to
                process and fulfill your order and keep you informed about its status.
              </p>
              <p>
                We may also request a landline telephone number in case we need to contact you
                directly. For international shipments, this number may be shared with our couriers
                to ensure successful delivery.{" "}
                <strong className="text-primary-dark">{siteConfig.name}</strong> promises not to
                use this information for any purpose other than processing your order or informing
                you about our products and services.
              </p>
            </PolicySection>
            </StaggerItem>

            <StaggerItem>
            <PolicySection icon={Shield} title="Privacy Policy">
              <p>
                To process your order, we require your name, billing address, phone number, and
                email address. This information will only be used to manage your order and contact
                you if needed. Our primary method of communication is email, but if we are unable to
                reach you, we may call you by phone.
              </p>
              <p>
                In certain cases, we may share your name and delivery address with third parties
                involved in fulfilling your order (such as financial institutions or courier
                services). However, your information will never be sold or provided to unrelated
                third parties except as required by law.
              </p>
            </PolicySection>
            </StaggerItem>

            <StaggerItem>
            <PolicySection icon={FileText} title="Accuracy of Information">
              <p>
                We put great effort into describing and photographing our products using official
                manufacturer resources and original product descriptions. While we strive for
                complete accuracy, occasional errors may occur. If you notice any mistakes, please
                let us know.
              </p>
            </PolicySection>
            </StaggerItem>

            <StaggerItem>
            <PolicySection icon={Copyright} title="Ownership & Copyright">
              <p>
                All product descriptions, images, code, and materials on this website are the
                intellectual property of <strong className="text-primary-dark">{siteConfig.name}</strong>.
                These materials are protected by copyright and may not be copied, used, or reproduced
                without our express permission.
              </p>
            </PolicySection>
            </StaggerItem>

            <StaggerItem>
            <PolicySection icon={AlertTriangle} title="Disclaimer">
              <p>
                <strong className="text-primary-dark">{siteConfig.name}</strong> disclaims any
                liability for damages of any kind, whether direct, indirect, incidental, or
                consequential, including loss of data, income, or profit, damage to property, or
                third-party claims related to the use of this website.
              </p>
            </PolicySection>
            </StaggerItem>
          </Stagger>
        </div>
      </section>

      <InfoCta
        title="Questions About Your Data?"
        description="If you have any questions about how we handle your personal information, our team is happy to help."
        buttonLabel="Contact Us"
      />
    </>
  );
}
