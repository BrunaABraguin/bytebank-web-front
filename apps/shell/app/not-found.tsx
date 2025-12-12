"use client";

import Footer from "./presentation/components/Footer";
import HeaderHome from "./presentation/components/HeaderHome";
import NotFoundSection from "./presentation/components/NotFoundSection";

export default function NotFound() {
  return (
    <div>
      <HeaderHome />
      <NotFoundSection />
      <Footer />
    </div>
  );
}
