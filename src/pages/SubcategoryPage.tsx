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
import { Search, ArrowLeft, Star, Award, Palette, Gift } from "lucide-react";

const subcategoryConfig = {
  // Stationery subcategories
  'wedding-stationery': {
    title: 'Wedding Stationery',
    description: 'Luxurious wedding invitations, save-the-dates, and ceremony stationery',
    icon: <Star className="w-8 h-8" />,
    filter: (product: any) => product.category === 'stationery' && product.occasion.includes('wedding'),
    features: ['Custom Calligraphy', 'Gold Foiling', 'Laser Cutting', 'Premium Paper', 'Wax Seals']
  },
  'corporate-branding': {
    title: 'Corporate Branding',
    description: 'Professional business stationery and brand identity materials',
    icon: <Award className="w-8 h-8" />,
    filter: (product: any) => product.category === 'stationery' && (product.occasion.includes('corporate') || product.occasion.includes('business')),
    features: ['Brand Consistency', 'Premium Print', 'Multiple Formats', 'Digital Assets']
  },
  'planners-journals': {
    title: 'Planners & Journals',
    description: 'Custom planners, journals, and organizational stationery',
    icon: <Palette className="w-8 h-8" />,
    filter: (product: any) => product.title.toLowerCase().includes('planner') || product.title.toLowerCase().includes('journal'),
    features: ['Leather Binding', 'Custom Layouts', 'Premium Paper', 'Personalization']
  },
  
  // Gifts subcategories
  'festival-hampers': {
    title: 'Festival Gift Hampers',
    description: 'Traditional and modern gift hampers for Indian festivals',
    icon: <Gift className="w-8 h-8" />,
    filter: (product: any) => product.category === 'gifts' && (product.occasion.includes('diwali') || product.occasion.includes('holi') || product.occasion.includes('festivals')),
    features: ['Traditional Items', 'Premium Sweets', 'Custom Packaging', 'Bulk Options']
  },
  'corporate-gifts': {
    title: 'Corporate Gift Solutions',
    description: 'Professional corporate gifting for clients and employees',
    icon: <Award className="w-8 h-8" />,
    filter: (product: any) => product.category === 'gifts' && product.occasion.includes('corporate'),
    features: ['Custom Branding', 'Premium Quality', 'Bulk Discounts', 'Executive Packaging']
  },
  'wedding-gifts': {
    title: 'Wedding Gift Hampers',
    description: 'Elegant welcome gifts and wedding favor hampers',
    icon: <Star className="w-8 h-8" />,
    filter: (product: any) => product.category === 'gifts' && product.occasion.includes('wedding'),
    features: ['Elegant Packaging', 'Traditional Elements', 'Personalization', 'Thank You Notes']
  },
  
  // Decoration subcategories
  'wedding-decor': {
    title: 'Wedding Decoration',
    description: 'Grand wedding and reception decoration services',
    icon: <Star className="w-8 h-8" />,
    filter: (product: any) => product.category === 'decoration' && product.occasion.includes('wedding'),
    features: ['Mandap Design', 'Floral Arrangements', 'Lighting', 'Stage Decoration']
  },
  'corporate-events': {
    title: 'Corporate Event Decoration',
    description: 'Professional corporate event and ceremony decorations',
    icon: <Award className="w-8 h-8" />,
    filter: (product: any) => product.category === 'decoration' && product.occasion.includes('corporate'),
    features: ['Professional Setup', 'Brand Integration', 'Audio Visual', 'VIP Arrangements']
  },
  'festival-decor': {
    title: 'Festival Decorations',
    description: 'Traditional and contemporary festival celebration decorations',
    icon: <Palette className="w-8 h-8" />,
    filter: (product: any) => product.category === 'decoration' && (product.occasion.includes('diwali') || product.occasion.includes('holi') || product.occasion.includes('festivals')),
    features: ['Traditional Elements', 'Cultural Themes', 'Lighting Effects', 'Rangoli Designs']
  }
};

export const SubcategoryPage = () => {
  const { subcategory } = useParams<{ subcategory: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  
  const config = subcategoryConfig[subcategory as keyof typeof subcategoryConfig];
  
  if (!config) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-16 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Subcategory Not Found</h1>
            <p className="text-muted-foreground mb-6">The subcategory you're looking for doesn't exist.</p>
            <Link to="/catalog/all">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Catalog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(config.filter);
    
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [searchQuery, config.filter]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Header */}
        <section className="gradient-elegant py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center mb-4">
                <div className="text-accent">
                  {config.icon}
                </div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-primary">{config.title}</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {config.description}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {config.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="bg-accent/10 text-accent">
                    {feature}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredProducts.length} products available
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
                placeholder={`Search ${config.title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-primary mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Call to Action */}
              <div className="mt-16 text-center">
                <Card className="bg-gradient-primary/5 border-accent/20 max-w-2xl mx-auto">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      Need Something Custom?
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Can't find exactly what you're looking for? Our team specializes in creating 
                      completely custom solutions tailored to your specific requirements.
                    </p>
                    <Link to="/#contact">
                      <Button size="lg" className="shadow-gold">
                        Request Custom Quote
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};