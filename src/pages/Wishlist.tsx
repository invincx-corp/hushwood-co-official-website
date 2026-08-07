import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { products } from '@/data/products';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, ShoppingCart } from 'lucide-react';

const Wishlist = () => {
  const { wishlist, loading, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const wishlistWithProducts = wishlist.map(item => ({
    ...item,
    product: products.find(p => p.id === item.product_id)
  }));

  const handleMoveToCart = async (productId: string) => {
    await addToCart(productId);
    await removeFromWishlist(productId);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="text-center">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>
        
        {wishlist.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground mb-4">Your wishlist is empty</p>
              <Button onClick={() => navigate('/catalog/stationery')}>Explore Products</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistWithProducts.map(item => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={item.product?.images[0]}
                    alt={item.product?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{item.product?.title}</h3>
                  <p className="text-primary font-bold mb-4">{item.product?.price}</p>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      onClick={() => handleMoveToCart(item.product_id)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => removeFromWishlist(item.product_id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;