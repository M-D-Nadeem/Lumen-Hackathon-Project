import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import Pricing from "../Components/Pricing";
import Testimonials from "../Components/Testimonials";
import Footer from "../Components/Footer";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      
      <section id="features">
        <Features />
      </section>
      
      <section id="pricing">
        <Pricing />
      </section>

      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;
