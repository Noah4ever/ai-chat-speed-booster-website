import Hero from "../components/Hero";
import HowItWorks from "../components/howitworks/HowItWorks";
import Features from "../components/Features";
import PopupShowcase from "../components/PopupShowcase";
import SupportedSites from "../components/SupportedSites";
import Install from "../components/Install";
import OpenSource from "../components/OpenSource";

export default function Home() {
  return (
    <main>
      <Hero />
      <HowItWorks />
      <Features />
      <PopupShowcase />
      <SupportedSites />
      <Install />
      <OpenSource />
    </main>
  );
}
