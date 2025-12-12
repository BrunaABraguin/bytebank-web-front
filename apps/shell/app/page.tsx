import { BenefitsSection } from "./presentation/components/BenefitsSection";
import Footer from "./presentation/components/Footer";
import HeaderHome from "./presentation/components/HeaderHome";
import { HomeGreetings } from "./presentation/components/HomeGreetings";

export default function Shell() {
  return (
    <div>
      <HeaderHome />
      <div className="bg-gradient-to-b from-green-dark to-white">
        <HomeGreetings />
        <BenefitsSection />
      </div>
      <Footer />
    </div>
  );
}
