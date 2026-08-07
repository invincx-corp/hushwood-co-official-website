import { Navigation } from "@/components/Navigation";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Users, Heart, Target } from "lucide-react";

const milestones = [
  {
    year: "2018",
    title: "Foundation",
    description: "Started our journey with a passion for creating memorable celebrations"
  },
  {
    year: "2020",
    title: "Expansion",
    description: "Expanded into corporate events and venue decorations"
  },
  {
    year: "2022",
    title: "Recognition",
    description: "Awarded 'Best Event Designer' by Indian Wedding Association"
  },
  {
    year: "2024",
    title: "Innovation",
    description: "Launched sustainable and eco-friendly celebration solutions"
  }
];

const stats = [
  { icon: Trophy, value: "500+", label: "Successful Events" },
  { icon: Users, value: "1000+", label: "Happy Clients" },
  { icon: Heart, value: "50+", label: "Team Members" },
  { icon: Target, value: "15+", label: "Cities Served" }
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <About />
        
        {/* Mission & Vision */}
        <section className="py-20 bg-gradient-subtle">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="hover:shadow-elegant transition-spring">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-primary mb-4">Our Mission</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To transform every celebration into an unforgettable experience by blending 
                    India's rich cultural heritage with contemporary design. We strive to create 
                    moments that resonate with authenticity, elegance, and personal touch, making 
                    each event a reflection of our clients' unique stories and dreams.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-elegant transition-spring">
                <CardContent className="p-8">
                  <h3 className="text-3xl font-bold text-primary mb-4">Our Vision</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    To become India's most trusted name in celebration services, known for our 
                    commitment to excellence, innovation, and sustainable practices. We envision 
                    a future where every celebration we touch becomes a cherished memory, setting 
                    new standards in the industry for quality, creativity, and customer satisfaction.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Our Journey in Numbers</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center hover:shadow-elegant transition-spring">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto gradient-gold rounded-full flex items-center justify-center mb-4">
                      <stat.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-4xl font-bold text-primary mb-2">{stat.value}</h3>
                    <p className="text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-gradient-subtle">
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Our Timeline</h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <Card key={index} className="hover:shadow-elegant transition-spring">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 gradient-gold rounded-full flex items-center justify-center">
                          <span className="text-2xl font-bold text-primary-foreground">{milestone.year}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-primary mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
