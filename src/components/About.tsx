import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Star, Award } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Personalized Touch",
    description: "Every creation is tailored to reflect your unique story and style"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Skilled designers and decorators with years of experience in Indian celebrations"
  },
  {
    icon: Star,
    title: "Premium Quality",
    description: "Only the finest materials and craftsmanship for lasting memories"
  },
  {
    icon: Award,
    title: "Trusted Excellence",
    description: "Proven track record of creating magical moments for our clients"
  }
];

export const About = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary">About Hushwood & Co</h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                Our journey began with a simple belief: every occasion deserves to be special. Whether it's 
                a intimate wedding invitation or a grand corporate event, we infuse each project with creativity, 
                cultural authenticity, and meticulous attention to detail.
              </p>
              
              <p className="text-muted-foreground">
                From traditional motifs to contemporary designs, we bridge the gap between heritage and modernity, 
                creating experiences that resonate with the Indian heart while appealing to global sensibilities.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="group transition-spring hover:shadow-elegant hover:-translate-y-1">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto gradient-gold rounded-full flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};