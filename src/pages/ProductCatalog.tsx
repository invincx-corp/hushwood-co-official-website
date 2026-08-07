import { useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { FilterSidebar } from "@/components/FilterSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { products, Product } from "@/data/products";
import { Search, Filter, Grid, List } from "lucide-react";

const categoryTitles = {
  stationery: "Stationery & Graphic Design",
  gifts: "Personalized Gift Hampers",
  decoration: "Venue Decoration",
  corporate: "Corporate Solutions"
};

const categoryDescriptions = {
  stationery: "Custom planners, journals, invitations, brochures, and premium stationery gift hampers",
  gifts: "Fully customizable gift hampers with professional packaging for every occasion",
  decoration: "Complete decoration planning and execution for weddings, parties, and celebrations",
  corporate: "Professional corporate gifting and government event decorations at any scale"
};

export const ProductCatalog = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  
  // Filter states
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>([]);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
  const [customizableOnly, setCustomizableOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (category && category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by occasions
    if (selectedOccasions.length > 0) {
      filtered = filtered.filter(product =>
        product.occasion.some(occasion => selectedOccasions.includes(occasion))
      );
    }

    // Filter by venues
    if (selectedVenues.length > 0) {
      filtered = filtered.filter(product =>
        product.venue?.some(venue => selectedVenues.includes(venue))
      );
    }

    // Filter by requirements
    if (selectedRequirements.length > 0) {
      filtered = filtered.filter(product =>
        product.requirements?.some(req => selectedRequirements.includes(req))
      );
    }

    // Filter by customizable
    if (customizableOnly) {
      filtered = filtered.filter(product => product.customizable);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'price':
          return a.price.localeCompare(b.price);
        default:
          return 0;
      }
    });

    return filtered;
  }, [category, searchQuery, selectedOccasions, selectedVenues, selectedRequirements, customizableOnly, sortBy]);

  const clearFilters = () => {
    setSelectedOccasions([]);
    setSelectedVenues([]);
    setSelectedRequirements([]);
    setCustomizableOnly(false);
    setSearchQuery('');
    setSearchParams({});
  };

  const categoryTitle = category ? categoryTitles[category as keyof typeof categoryTitles] : "All Products";
  const categoryDescription = category ? categoryDescriptions[category as keyof typeof categoryDescriptions] : "Explore our complete range of customized services";

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Header */}
        <section className="gradient-elegant py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center space-y-4">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-primary">{categoryTitle}</h1>
              <p className="text-base sm:text-xl text-muted-foreground max-w-3xl mx-auto">
                {categoryDescription}
              </p>
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} products
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Search and Controls */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search products, features, occasions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Name A-Z</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
              </Button>
              
              <div className="hidden sm:flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            {showFilters && (
              <div className="w-full lg:w-80 flex-shrink-0">
                <FilterSidebar
                  selectedOccasions={selectedOccasions}
                  selectedVenues={selectedVenues}
                  selectedRequirements={selectedRequirements}
                  customizableOnly={customizableOnly}
                  onOccasionChange={setSelectedOccasions}
                  onVenueChange={setSelectedVenues}
                  onRequirementChange={setSelectedRequirements}
                  onCustomizableChange={setCustomizableOnly}
                  onClearFilters={clearFilters}
                />
              </div>
            )}

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-primary mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearFilters}>Clear All Filters</Button>
                </div>
              ) : (
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" 
                  : "space-y-4"
                }>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
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