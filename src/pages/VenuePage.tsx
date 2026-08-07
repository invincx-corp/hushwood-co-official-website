import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { Search, MapPin, Crown, Home, Building, TreePine } from "lucide-react";

const venueConfig = {
  'banquet-hall': {
    title: 'Banquet Hall Events',
    description: 'Perfect decorations and services for elegant banquet hall celebrations',
    icon: <Crown className="w-8 h-8" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    capacity: '100-500 guests',
    features: ['Indoor Climate Control', 'Professional Lighting', 'Stage Setup', 'VIP Arrangements'],
    tips: [
      'Book banquet halls 3-6 months in advance',
      'Consider ceiling height for decorations',
      'Plan for proper lighting arrangements',
      'Coordinate with venue management for setup'
    ]
  },
  'palace': {
    title: 'Heritage Palace Venues',
    description: 'Regal decorations for palace and heritage venue celebrations',
    icon: <Crown className="w-8 h-8" />,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    capacity: '200-1000+ guests',
    features: ['Royal Architecture', 'Grand Spaces', 'Historical Significance', 'Luxury Amenities'],
    tips: [
      'Respect heritage guidelines and restrictions',
      'Plan for weather contingencies in open areas',
      'Coordinate with palace management early',
      'Consider traditional themes that complement architecture'
    ]
  },
  'outdoor-garden': {
    title: 'Garden & Outdoor Venues',
    description: 'Natural and elegant decorations for outdoor garden celebrations',
    icon: <TreePine className="w-8 h-8" />,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    capacity: '50-300 guests',
    features: ['Natural Beauty', 'Open Air Setting', 'Flexible Layout', 'Scenic Backdrops'],
    tips: [
      'Always have weather backup plans',
      'Consider seasonal flowers and plants',
      'Plan for adequate lighting after sunset',
      'Ensure ground stability for heavy decorations'
    ]
  },
  'home': {
    title: 'Home Celebrations',
    description: 'Intimate and personalized decorations for home-based celebrations',
    icon: <Home className="w-8 h-8" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    capacity: '20-100 guests',
    features: ['Personal Touch', 'Flexible Timing', 'Cost Effective', 'Intimate Setting'],
    tips: [
      'Maximize use of existing space',
      'Focus on focal points for maximum impact',
      'Consider neighbor comfort during setup',
      'Plan for easy cleanup post-event'
    ]
  },
  'office-premises': {
    title: 'Corporate Office Venues',
    description: 'Professional decorations for office-based corporate events',
    icon: <Building className="w-8 h-8" />,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    capacity: '50-200 employees',
    features: ['Professional Setting', 'Brand Integration', 'Convenient Location', 'Cost Control'],
    tips: [
      'Maintain professional appearance',
      'Work within office safety guidelines',
      'Consider employee accessibility',
      'Plan setup during off-hours'
    ]
  },
  'resort': {
    title: 'Resort Destinations',
    description: 'Luxurious decorations for resort-based destination celebrations',
    icon: <TreePine className="w-8 h-8" />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    capacity: '100-400 guests',
    features: ['Luxury Amenities', 'Multiple Venues', 'Accommodation Available', 'Scenic Locations'],
    tips: [
      'Coordinate with resort event managers',
      'Consider guest accommodation logistics',
      'Plan for multiple event spaces',
      'Take advantage of natural resort beauty'
    ]
  }
};

export const VenuePage = () => {
  const { venue } = useParams<{ venue: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  
  const config = venueConfig[venue as keyof typeof venueConfig];
  
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => 
      product.venue?.includes(venue?.replace('-', ' ') || '')
    );
    
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [venue, searchQuery]);

  if (!config) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Venue Not Found</h1>
            <p className="text-muted-foreground mb-6">The venue you're looking for doesn't exist.</p>
            <Link to="/catalog/all">
              <Button>Back to Catalog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className={`gradient-elegant py-20 ${config.bgColor}`}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center space-y-6">
              <div className={`flex items-center justify-center mb-4 ${config.color}`}>
                <MapPin className="w-6 h-6 mr-2" />
                {config.icon}
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-primary">{config.title}</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {config.description}
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Badge variant="secondary" className="bg-accent/10 text-accent px-4 py-2">
                  Capacity: {config.capacity}
                </Badge>
                {config.features.map((feature, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {feature}
                  </Badge>
                ))}
              </div>
              
              <div className="text-sm text-muted-foreground mt-4">
                {filteredProducts.length} services available for {config.title.toLowerCase()}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={`Search ${config.title.toLowerCase()} services...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Planning Tips */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-primary/5 border-accent/20 sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    Venue Planning Tips
                  </h3>
                  <div className="space-y-4">
                    {config.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-muted-foreground">{tip}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <Link to="/#contact">
                      <Button className="w-full shadow-gold">
                        Get Venue Consultation
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-2">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🏛️</div>
                  <h3 className="text-xl font-semibold text-primary mb-2">No services found</h3>
                  <p className="text-muted-foreground mb-4">
                    We don't have specific services for this venue type yet
                  </p>
                  <Link to="/#contact">
                    <Button>Contact for Custom Services</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div className="mt-12 text-center">
                    <Card className="bg-gradient-primary/5 border-accent/20">
                      <CardContent className="p-8">
                        <h3 className="text-2xl font-bold text-primary mb-4">
                          Perfect for Your {config.title}
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Our team specializes in {config.title.toLowerCase()} and can create 
                          custom solutions that perfectly complement your venue's unique characteristics.
                        </p>
                        <div className="flex gap-4 justify-center">
                          <Link to="/#contact">
                            <Button size="lg" className="shadow-gold">
                              Schedule Site Visit
                            </Button>
                          </Link>
                          <Link to="/catalog/all">
                            <Button variant="outline" size="lg">
                              View Gallery
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};