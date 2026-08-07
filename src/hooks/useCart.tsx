import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  customization_notes: string | null;
}

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCart = async () => {
    if (!user) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('cart')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setCart(data || []);
    } catch (error: any) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (productId: string, quantity: number = 1, notes?: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add items to cart",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('cart')
        .upsert({
          user_id: user.id,
          product_id: productId,
          quantity,
          customization_notes: notes
        }, {
          onConflict: 'user_id,product_id'
        });

      if (error) throw error;

      toast({
        title: "Added to cart",
        description: "Item has been added to your cart"
      });

      fetchCart();
    } catch (error: any) {
      toast({
        title: "Failed to add to cart",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    try {
      const { error } = await supabase
        .from('cart')
        .update({ quantity })
        .eq('id', id);

      if (error) throw error;
      fetchCart();
    } catch (error: any) {
      toast({
        title: "Failed to update quantity",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart"
      });

      fetchCart();
    } catch (error: any) {
      toast({
        title: "Failed to remove item",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;
      fetchCart();
    } catch (error: any) {
      toast({
        title: "Failed to clear cart",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return {
    cart,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCart: fetchCart
  };
};