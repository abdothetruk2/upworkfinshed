import WhyUsSection from "@/components/shared/WhyUsSection";
import Navbar from "@/components/shared/Navbar";
import { ReactNode } from "react";
import AboutUsSection from "@/components/shared/AboutUsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: true,
    googleBot: {
      index: true,
    }
  }
}

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <WhyUsSection />
      <AboutUsSection />
    </>
  );
}
