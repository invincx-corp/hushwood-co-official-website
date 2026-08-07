import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { products } from '@/data/products';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const cartWithProducts = cart.map(item => ({
    ...item,
    product: products.find(p => p.id === item.product_id)
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const orderNumber = `ORD-${Date.now()}`;
      const items = cartWithProducts.map(item => ({
        product_id: item.product_id,
        title: item.product?.title,
        quantity: item.quantity,
        customization_notes: item.customization_notes
      }));
      
      const total = cartWithProducts.reduce((sum, item) => {
        // Extract first price from range (e.g., "₹8,000 - ₹25,000" -> 8000)
        const priceStr = item.product?.price || '0';
        const firstPrice = priceStr.split('-')[0].replace(/[^0-9.]/g, '');
        const price = parseFloat(firstPrice || '0');
        return sum + (price * item.quantity);
      }, 0);
      
      // Round to 2 decimal places and ensure it's a valid number
      const totalAmount = Math.round(total * 100) / 100;

      console.log('Order totalAmount:', totalAmount, 'Type:', typeof totalAmount);
      console.log('Cart items with prices:', cartWithProducts.map(item => ({
        id: item.product_id,
        price: item.product?.price,
        quantity: item.quantity
      })));

      // Validate totalAmount
      if (!isFinite(totalAmount) || totalAmount < 0) {
        throw new Error('Invalid total amount calculated');
      }

      const orderData = {
        user_id: user.id,
        order_number: orderNumber,
        items,
        total_amount: totalAmount,
        delivery_address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        phone: formData.phone,
        notes: formData.notes,
        status: 'pending'
      };

      console.log('Inserting order:', JSON.stringify(orderData, null, 2));

      const { error } = await supabase
        .from('orders')
        .insert(orderData);

      if (error) {
        console.error('Database error:', error);
        throw error;
      }

      // Send order confirmation email
      try {
        await supabase.functions.invoke("send-order-email", {
          body: {
            orderNumber,
            customerName: formData.fullName,
            customerEmail: user.email,
            customerPhone: formData.phone,
            deliveryAddress: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
            items: cartWithProducts.map(item => ({
              product_id: item.product_id,
              quantity: item.quantity,
              customization_notes: item.customization_notes,
              product: {
                title: item.product?.title || 'Unknown Product',
                price: parseFloat(item.product?.price?.replace(/[^0-9.]/g, '') || '0')
              }
            })),
            totalAmount,
            notes: formData.notes
          }
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
        // Don't block order completion if email fails
      }

      await clearCart();

      toast({
        title: "Order placed successfully!",
        description: `Your order number is ${orderNumber}. We'll contact you shortly with pricing and details.`
      });

      navigate('/profile');
    } catch (error: any) {
      toast({
        title: "Failed to place order",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      required
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      required
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requirements or customization requests"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartWithProducts.map(item => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.product?.images[0]}
                        alt={item.product?.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm line-clamp-2">{item.product?.title}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      Final pricing will be shared after reviewing your order
                    </p>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? 'Placing Order...' : 'Place Order'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;