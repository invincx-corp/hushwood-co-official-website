import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { Heart, Download, Eye, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { CustomizationDialog } from "./CustomizationDialog";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  
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
  return (
    <>
    <Card className="group overflow-hidden shadow-elegant hover:shadow-gold transition-spring hover:-translate-y-2">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-smooth">
          <Button 
            size="icon" 
            variant={inWishlist ? "default" : "outline"} 
            className="bg-background/80"
            onClick={() => inWishlist ? removeFromWishlist(product.id) : addToWishlist(product.id)}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </Button>
          <Button 
            size="icon" 
            variant="outline" 
            className="bg-background/80"
            onClick={() => setShowCustomization(true)}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-smooth">
          <Badge variant="secondary" className="bg-accent text-primary">
            {product.customizable ? 'Customizable' : 'Standard'}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-3 sm:p-4 space-y-3">
        <div className="flex flex-wrap gap-1">
          {product.occasion.slice(0, 2).map((occasion) => (
            <Badge key={occasion} variant="outline" className="text-xs">
              {occasion}
            </Badge>
          ))}
          {product.occasion.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{product.occasion.length - 2} more
            </Badge>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-primary line-clamp-2">{product.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-accent">{product.price}</span>
          <div className="flex gap-2">
            {product.brochure && (
              <Button size="sm" variant="outline" className="h-8">
                <Download className="w-3 h-3 mr-1" />
                Brochure
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <Link to={`/product/${product.id}`}>
            <Button variant="outline" className="w-full h-8 text-xs">
              <Eye className="w-3 h-3 mr-1" />
              View Details
            </Button>
          </Link>
          <Link to={`/quote/${product.id}`}>
            <Button className="w-full h-8 text-xs">
              Get Quote
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
    <CustomizationDialog
      open={showCustomization}
      onOpenChange={setShowCustomization}
      productTitle={product.title}
      onConfirm={handleAddToCart}
    />
    </>
  );
};