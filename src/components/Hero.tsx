import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-44 lg:pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Elegant Indian celebration stationery and gifting setup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 text-center lg:text-left lg:flex lg:items-center lg:gap-12">
        <div className="lg:w-2/3 space-y-8 sm:space-y-10 lg:space-y-12">
          <div className="space-y-5 sm:space-y-6 lg:space-y-8">
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight max-w-none 2xl:max-w-6xl">
              <span className="block">Make Every Moment</span>
              <span className="block text-gradient-gold">Feel Premium</span>
            </h1>
            <p className="text-base sm:text-xl lg:text-2xl text-primary-foreground/90 max-w-none 2xl:max-w-5xl">
              Crafting memorable moments through personalized stationery, elegant gifting, and breathtaking decorations
            </p>
          </div>
          
          <div className="flex justify-center lg:justify-start w-full mt-4">
            <Link to="/catalog/all" className="w-full sm:w-auto">
              <Button variant="hero" size="lg" className="shadow-gold transition-spring w-full sm:w-64 lg:w-80 px-6 sm:px-10 py-6 sm:py-7 text-base sm:text-lg">
                Step Into Your Celebration
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-6 sm:gap-10 justify-center lg:justify-start text-primary-foreground/80 pt-2">
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold">500+</div>
              <div className="text-sm sm:text-base">Happy Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold">1000+</div>
              <div className="text-sm sm:text-base">Custom Designs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-4xl font-bold">5★</div>
              <div className="text-sm sm:text-base">Client Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};