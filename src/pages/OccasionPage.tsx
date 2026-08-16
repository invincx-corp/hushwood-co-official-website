import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HorizontalScroller } from "@/components/HorizontalScroller";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { products } from "@/data/products";
import { Search, Filter, Heart, Sparkles, Crown, Briefcase, Calendar, Gift, PartyPopper } from "lucide-react";

const occasionConfig = {
  wedding: {
    title: 'Wedding Celebrations',
    description: 'Complete wedding solutions from invitations to decorations and gift hampers',
    icon: <Crown className="w-8 h-8" />,
    color: 'text-rose-500',
    bgColor: 'bg-rose-50',
    categories: ['Invitations', 'Save the Date', 'Welcome Signage', 'Decorations', 'Stage & Mandap', 'Gift Hampers', 'Wedding Favours', 'Thank You Cards', 'Personalized'],
    tips: [
      'Book decorations 3-6 months in advance',
      'Order invitations 2 months before the wedding',
      'Customize hampers with couple\'s favorite items',
      'Consider seasonal flowers for better pricing'
    ]
  },
  corporate: {
    title: 'Corporate Events',
    description: 'Professional corporate solutions for events, gifting, and brand promotion',
    icon: <Briefcase className="w-8 h-8" />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    categories: ['Event Management', 'Corporate Gifts', 'Branding Materials', 'Employee Recognition', 'Stationery & Print', 'Launch Events', 'Award Ceremonies', 'Bulk Gifting', 'Custom Branding'],
    tips: [
      'Plan corporate events 2-3 months ahead',
      'Branded items reinforce company identity',
      'Quality gifts improve client relationships',
      'Annual contracts offer cost savings'
    ]
  },
  birthday: {
    title: 'Birthday Celebrations',
    description: 'Creative birthday party themes, decorations, and personalized gift solutions',
    icon: <PartyPopper className="w-8 h-8" />,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    categories: ['Theme Decorations', 'Party Supplies', 'Custom Gifts', 'Birthday Invitations', 'Welcome Boards', 'Backdrop & Balloons', 'Return Gifts', 'Games & Props', 'Personalized'],
    tips: [
      'Book party venues and decorators early',
      'Personalized gifts create lasting memories',
      'Theme consistency enhances the experience',
      'Photo booths are always a hit'
    ]
  },
  'baby-shower': {
    title: 'Baby Shower',
    description: 'Adorable baby shower decorations, invitations, and welcome gift hampers',
    icon: <Heart className="w-8 h-8" />,
    color: 'text-pink-500',
    bgColor: 'bg-pink-50',
    categories: ['Decorations', 'Invitations', 'Gift Hampers', 'Party Favors', 'Welcome Signage', 'Theme Setup', 'Return Gifts', 'Games & Props', 'Personalized'],
    tips: [
      'Pastel colors create perfect ambiance',
      'Include practical gifts for new parents',
      'Game prizes add fun to the celebration',
      'Photo opportunities are essential'
    ]
  },
  festivals: {
    title: 'Festivals',
    description: 'Traditional and modern festival celebration essentials and gifting',
    icon: <Sparkles className="w-8 h-8" />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    categories: ['Gift Hampers', 'Decorations', 'Greeting Cards', 'Rangoli & Diyas', 'Home Decor', 'Sweets & Treats', 'Bulk Orders', 'Custom Packaging', 'Eco-friendly'],
    tips: [
      'Order festival gifting early for better availability',
      'Traditional sweets are most popular',
      'Eco-friendly options are increasingly popular',
      'Bulk orders get better discounts'
    ]
  }
};

export const OccasionPage = () => {
  const { occasion } = useParams<{ occasion: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const canonicalOccasion = occasion === 'diwali' ? 'festivals' : occasion;
  
  const config = occasionConfig[canonicalOccasion as keyof typeof occasionConfig];
  
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => 
      product.occasion.includes(canonicalOccasion || '') || (canonicalOccasion === 'festivals' && product.occasion.includes('diwali'))
    );
    
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product =>
        selectedCategories.includes(product.category)
      );
    }
    
    return filtered;
  }, [canonicalOccasion, searchQuery, selectedCategories]);

  const tabbedProducts = useMemo(() => {
    const graphicDesigns = filteredProducts.filter((p) => p.category === "stationery");
    const decorations = filteredProducts.filter((p) => p.category === "decoration");
    const giftHampers = filteredProducts.filter((p) => p.category === "gifts");
    const otherAccessories = filteredProducts.filter(
      (p) => !["stationery", "decoration", "gifts"].includes(p.category),
    );

    return {
      graphicDesigns,
      decorations,
      giftHampers,
      otherAccessories,
    };
  }, [filteredProducts]);

  if (!config) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Occasion Not Found</h1>
            <p className="text-muted-foreground mb-6">The occasion you're looking for doesn't exist.</p>
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
        <section className={`gradient-elegant py-12 sm:py-20 ${config.bgColor}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-6">
              <div className={`flex items-center justify-center mb-4 ${config.color}`}>
                {config.icon}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-primary">{config.title}</h1>
              <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                {config.description}
              </p>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                {config.categories.map((category, index) => (
                  <Badge key={index} variant="secondary" className="bg-accent/10 text-accent px-4 py-2">
                    {category}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground mt-4">
                {filteredProducts.length} products available for {config.title.toLowerCase()}
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={`Search ${config.title.toLowerCase()} products...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="w-full lg:w-80 flex-shrink-0">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-primary mb-4">Categories</h3>
                    <div className="space-y-3">
                      {['stationery', 'gifts', 'decoration', 'corporate'].map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories([...selectedCategories, category]);
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== category));
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <span className="capitalize">{category}</span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Content */}
            <div className="flex-1">
              {/* Tips Section */}
              <Card className="mb-8 bg-gradient-primary/5 border-accent/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">Planning Tips</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {config.tips.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-muted-foreground">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-primary mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters
                  </p>
                </div>
              ) : (
                <Tabs defaultValue="graphic-designs" className="w-full">
                  <HorizontalScroller className="mb-6" ariaLabel="Product categories">
                    <TabsList className="w-max">
                      <TabsTrigger value="graphic-designs">Graphic Designs</TabsTrigger>
                      <TabsTrigger value="decorations">Decorations</TabsTrigger>
                      <TabsTrigger value="gift-hampers">Gift Hampers</TabsTrigger>
                      <TabsTrigger value="other-accessories">Other Accessories</TabsTrigger>
                    </TabsList>
                  </HorizontalScroller>


                  <TabsContent value="graphic-designs" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tabbedProducts.graphicDesigns.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="decorations" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tabbedProducts.decorations.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="gift-hampers" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tabbedProducts.giftHampers.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="other-accessories" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {tabbedProducts.otherAccessories.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              )}

              {/* Call to Action */}
              {filteredProducts.length > 0 && (
                <div className="mt-16 text-center">
                  <Card className="bg-gradient-primary/5 border-accent/20 max-w-2xl mx-auto">
                    <CardContent className="p-8">
                      <h3 className="text-2xl font-bold text-primary mb-4">
                        Need Help Planning Your {config.title}?
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Our expert team can help you create the perfect celebration with 
                        personalized recommendations and end-to-end planning support.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/#contact">
                          <Button size="lg" className="shadow-gold w-full sm:w-auto">
                            Get Consultation
                          </Button>
                        </Link>
                        <Link to="/catalog/all">
                          <Button variant="outline" size="lg" className="w-full sm:w-auto">
                            View Portfolio
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};