import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenTool, Gift, Sparkles, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import stationeryImage from "@/assets/stationery-design.jpg";
import venueImage from "@/assets/venue-decoration.jpg";
import corporateImage from "@/assets/corporate-gifts.jpg";

const services = [
  {
    icon: PenTool,
    title: "Stationery & Graphic Design",
    description: "Custom planners, journals, invitations, brochures, and premium stationery gift hampers",
    image: stationeryImage,
    features: ["Wedding Invitations", "Corporate Brochures", "Custom Planners", "Gift Hampers"],
    category: "stationery"
  },
  {
    icon: Gift,
    title: "Personalized Gift Hampers",
    description: "Fully customizable gift hampers with professional packaging for every occasion",
    image: corporateImage,
    features: ["Bulk Gift Sourcing", "Custom Packaging", "Event Gifting", "Professional Wrapping"],
    category: "gifts"
  },
  {
    icon: Sparkles,
    title: "Venue Decoration",
    description: "Complete decoration planning and execution for weddings, parties, and celebrations",
    image: venueImage,
    features: ["Wedding Decorations", "Party Themes", "Corporate Events", "Festival Celebrations"],
    category: "decoration"
  },
  {
    icon: Building2,
    title: "Corporate Solutions",
    description: "Professional corporate gifting and government event decorations at any scale",
    image: corporateImage,
    features: ["Corporate Gifting", "Office Events", "Government Programs", "Launch Events"],
    category: "corporate"
  }
];

export const Services = () => {
  return (
    <section className="py-20 gradient-elegant">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-left mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">Our Services</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group overflow-hidden shadow-elegant transition-spring hover:shadow-gold hover:-translate-y-2">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <service.icon className="w-8 h-8 text-accent" />
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-primary">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
                
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Link to={`/catalog/${service.category || 'all'}`}>
                  <Button variant="outline" className="w-full transition-smooth">
                    Explore Products
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};