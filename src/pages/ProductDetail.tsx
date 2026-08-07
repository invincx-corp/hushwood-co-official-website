import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data/products";
import { ArrowLeft, Heart, Share2, Download, MessageCircle, Star, ShoppingCart } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { useAuth } from "@/contexts/AuthContext";
import { CustomizationDialog } from "@/components/CustomizationDialog";
import { toast } from "@/hooks/use-toast";

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [showCustomization, setShowCustomization] = useState(false);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { user } = useAuth();
  
  const isInWishlist = wishlist.some(item => item.product_id === id);
  
  const product = products.find(p => p.id === id);
  
  const handleAddToCart = async (customization: string, quantity: number) => {
    try {
      await addToCart(product.id, quantity, customization);
      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-24 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
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

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground overflow-x-auto whitespace-nowrap">
              <Link to="/" className="hover:text-primary">Home</Link>
              <span>/</span>
              <Link to={`/catalog/${product.category}`} className="hover:text-primary capitalize">
                {product.category}
              </Link>
              <span>/</span>
              <span className="text-primary">{product.title}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={product.images[selectedImage]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-md overflow-hidden border-2 transition-colors ${
                        selectedImage === index ? 'border-primary' : 'border-transparent'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {product.occasion.slice(0, 3).map((occasion) => (
                    <Badge key={occasion} variant="outline" className="capitalize">
                      {occasion}
                    </Badge>
                  ))}
                  {product.customizable && (
                    <Badge className="bg-accent text-primary">Customizable</Badge>
                  )}
                </div>
                
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4">
                  {product.title}
                </h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">(4.8/5 based on 150+ reviews)</span>
                </div>
                
                <p className="text-xl font-bold text-accent mb-4">{product.price}</p>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className="flex-1 min-w-[140px]"
                    onClick={() => setShowCustomization(true)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => {
                      if (isInWishlist) {
                        removeFromWishlist(product.id);
                      } else {
                        addToWishlist(product.id);
                      }
                    }}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist ? 'fill-current text-red-500' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
                <Link to={`/quote/${product.id}`} className="block">
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Get Custom Quote
                  </Button>
                </Link>
              </div>

              {/* Download Links */}
              {(product.brochure || product.catalog) && (
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-primary mb-3">Download Resources</h3>
                    <div className="space-y-2">
                      {product.brochure && (
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Download className="w-4 h-4 mr-2" />
                          Product Brochure (PDF)
                        </Button>
                      )}
                      {product.catalog && (
                        <Button variant="outline" size="sm" className="w-full justify-start">
                          <Download className="w-4 h-4 mr-2" />
                          Full Catalog (PDF)
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Features */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-primary mb-3">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm">
                        <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Venue & Requirements */}
              {(product.venue || product.requirements) && (
                <Card>
                  <CardContent className="p-4 space-y-4">
                    {product.venue && (
                      <div>
                        <h4 className="font-medium text-primary mb-2">Suitable Venues</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.venue.map((venue) => (
                            <Badge key={venue} variant="outline" className="text-xs capitalize">
                              {venue}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {product.requirements && (
                      <div>
                        <h4 className="font-medium text-primary mb-2">Additional Requirements</h4>
                        <div className="flex flex-wrap gap-1">
                          {product.requirements.map((req) => (
                            <Badge key={req} variant="outline" className="text-xs capitalize">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <Separator className="my-12" />

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">Related Products</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {relatedProducts.map((relatedProduct) => (
                    <CarouselItem key={relatedProduct.id} className="md:basis-1/2 lg:basis-1/3">
                      <Link to={`/product/${relatedProduct.id}`}>
                        <Card className="group overflow-hidden hover:shadow-gold transition-spring">
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={relatedProduct.images[0]}
                              alt={relatedProduct.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold text-primary line-clamp-2 mb-2">
                              {relatedProduct.title}
                            </h3>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {relatedProduct.description}
                            </p>
                            <p className="font-bold text-accent">{relatedProduct.price}</p>
                          </CardContent>
                        </Card>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
      
      <CustomizationDialog
        open={showCustomization}
        onOpenChange={setShowCustomization}
        productTitle={product.title}
        onConfirm={handleAddToCart}
      />
    </div>
  );
};