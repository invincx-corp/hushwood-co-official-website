import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ReelsCarousel } from "@/components/ReelsCarousel";
import { OccasionCarousel } from "@/components/OccasionCarousel";
import { Services } from "@/components/Services";
import { OccasionTabsSection } from "@/components/OccasionTabsSection";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <section id="home">
          <Hero />
        </section>
        <ReelsCarousel />
        <OccasionCarousel />
        <section id="services">
          <Services />
        </section>
        <OccasionTabsSection />
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
