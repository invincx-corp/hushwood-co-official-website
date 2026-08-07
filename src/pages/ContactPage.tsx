import { Navigation } from "@/components/Navigation";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, Instagram, Facebook, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const socialLinks = [
  { icon: Instagram, label: "Instagram", url: "https://instagram.com/hushwoodco" },
  { icon: Facebook, label: "Facebook", url: "https://facebook.com/hushwoodco" },
  { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/company/hushwoodco" }
];

const locations = [
  {
    city: "Dhule",
    address: "Happy Teeth Dental Clinic, Gindodiya Hospital, Near Dutta Mandir Chowk, Deopur, Dhule - 424001",
    phone: "+91 81492 74994 / +91 86983 97012",
    hours: "Mon-Sat: 10:00 AM - 7:00 PM"
  }
];

const ContactPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <Contact />
        
        {/* Locations */}
        <section className="py-12 sm:py-20 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-4xl font-bold text-center text-primary mb-4">Visit Our Offices</h2>
            <p className="text-center text-muted-foreground mb-8 sm:mb-16 max-w-2xl mx-auto">
              Meet our team in person at any of our locations across India. We'd love to discuss 
              your upcoming celebration over a cup of chai!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {locations.map((location, index) => (
                <Card key={index} className="hover:shadow-elegant transition-spring">
                  <CardContent className="p-5 sm:p-8">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 gradient-gold rounded-full flex items-center justify-center mb-4 sm:mb-6">
                      <MapPin className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">{location.city}</h3>
                    <div className="space-y-3 text-muted-foreground">
                      <p className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span>{location.address}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="w-5 h-5 flex-shrink-0" />
                        <span>{location.hours}</span>
                      </p>
                    </div>
                    <Button className="w-full mt-6 shadow-gold" variant="outline">
                      Get Directions
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section className="py-12 sm:py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-4">Connect With Us</h2>
            <p className="text-muted-foreground mb-8 sm:mb-12 text-base sm:text-lg">
              Follow our journey and get inspired by beautiful celebrations we create every day
            </p>
            <div className="flex justify-center gap-4 sm:gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="w-12 h-12 sm:w-16 sm:h-16 gradient-gold rounded-full flex items-center justify-center hover:shadow-elegant transition-spring hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Teaser */}
        <section className="py-12 sm:py-20 bg-gradient-subtle">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-primary mb-4">Have Questions?</h2>
            <p className="text-muted-foreground mb-6 sm:mb-8 text-base sm:text-lg">
              Check out our frequently asked questions or reach out directly
            </p>
            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center">
              <Link to="/faq">
                <Button size="lg" className="shadow-gold">
                  View FAQ
                </Button>
              </Link>
              <a href="tel:+918149274994">
                <Button size="lg" variant="outline">
                  Schedule Call
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
