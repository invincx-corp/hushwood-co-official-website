import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-playfair font-bold">
              Hushwood <span className="text-accent">& Co</span>
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Creating memorable moments through personalized stationery, elegant gifting, 
              and breathtaking decorations across India.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-spring cursor-pointer">
                <Instagram className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-spring cursor-pointer">
                <Facebook className="w-5 h-5 text-primary" />
              </div>
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center hover:scale-110 transition-spring cursor-pointer">
                <Twitter className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-accent">Services</h4>
            <div className="space-y-2">
              <p className="text-primary-foreground/80 hover:text-accent cursor-pointer transition-smooth">Stationery Design</p>
              <p className="text-primary-foreground/80 hover:text-accent cursor-pointer transition-smooth">Gift Hampers</p>
              <p className="text-primary-foreground/80 hover:text-accent cursor-pointer transition-smooth">Venue Decoration</p>
              <p className="text-primary-foreground/80 hover:text-accent cursor-pointer transition-smooth">Corporate Solutions</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-accent">Quick Links</h4>
            <div className="space-y-2">
              <p className="text-primary-foreground/80 hover:text-accent cursor-pointer transition-smooth">About Us</p>
              <p className="text-primary-foreground/80 hover:text-accent cursor-pointer transition-smooth">Portfolio</p>
              <p className="text-primary-foreground/80 hover:text-accent cursor-pointer transition-smooth">Testimonials</p>
              <p className="text-primary-foreground/80 hover:text-accent cursor-pointer transition-smooth">FAQ</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-accent">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent" />
                <p className="text-primary-foreground/80">+91 81492 74994</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent" />
                <p className="text-primary-foreground/80">hushwoodco@gmail.com</p>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <p className="text-primary-foreground/80">
                  Happy Teeth Dental Clinic, Gindodiya Hospital,<br />Near Dutta Mandir Chowk, Deopur, Dhule - 424001
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 Hushwood & Co. All rights reserved. | Crafted with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
};