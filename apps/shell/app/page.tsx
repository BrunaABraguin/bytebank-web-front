import { BenefitsSection } from "../components/BenefitsSection";
import Footer from "../components/Footer";
import HeaderHome from "../components/HeaderHome";
import { HomeGreetings } from "../components/HomeGreetings";

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
