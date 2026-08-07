import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Order {
  id: string;
  order_number: string;
  items: any[];
  status: string;
  created_at: string;
  delivery_address: string;
  phone: string;
  notes: string | null;
}

interface Quote {
  id: string;
  product_id: string | null;
  name: string;
  email: string;
  phone: string;
  occasion: string | null;
  status: string;
  created_at: string;
  event_date: string | null;
  budget: string | null;
}

interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    id: user?.id || '',
    full_name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user) return;

    try {
      const [ordersResult, quotesResult, profileResult] = await Promise.all([
        supabase
          .from('orders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('quotes')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
      ]);

      if (ordersResult.error) throw ordersResult.error;
      if (quotesResult.error) throw quotesResult.error;

      setOrders((ordersResult.data || []) as Order[]);
      setQuotes((quotesResult.data || []) as Quote[]);
      
      if (profileResult.data) {
        setProfile(profileResult.data as Profile);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          phone: profile.phone,
          address: profile.address,
          city: profile.city,
          state: profile.state,
          pincode: profile.pincode
        });

      if (error) throw error;

      toast({
        title: "Profile updated successfully!",
        description: "Your information has been saved."
      });
    } catch (error: any) {
      toast({
        title: "Failed to update profile",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'confirmed': return 'default';
      case 'processing': return 'default';
      case 'delivered': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-10 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
            <h1 className="text-2xl sm:text-4xl font-bold">My Account</h1>
            <Button variant="outline" onClick={signOut} className="w-full sm:w-auto">Sign Out</Button>
          </div>

          <Tabs defaultValue="orders" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="orders" className="text-xs sm:text-sm px-2 py-2">Orders</TabsTrigger>
              <TabsTrigger value="quotes" className="text-xs sm:text-sm px-2 py-2">Quote Requests</TabsTrigger>
              <TabsTrigger value="profile" className="text-xs sm:text-sm px-2 py-2">Profile</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-4">
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : orders.length === 0 ? (
                <Card>
                  <CardContent className="py-16 text-center">
                    <p className="text-muted-foreground">No orders yet</p>
                  </CardContent>
                </Card>
              ) : (
                orders.map(order => (
                  <Card key={order.id}>
                    <CardHeader>
                      <div className="flex flex-col xs:flex-row justify-between items-start gap-2">
                        <div>
                          <CardTitle className="text-lg">{order.order_number}</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {format(new Date(order.created_at), 'PPP')}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(order.status)}>
                          {order.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Items:</h4>
                          <ul className="space-y-1">
                            {order.items.map((item: any, idx: number) => (
                              <li key={idx} className="text-sm">
                                {item.title} (x{item.quantity})
                                {item.customization_notes && (
                                  <span className="text-muted-foreground">
                                    {' '}
                                    - {item.customization_notes}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Delivery Address:</h4>
                          <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
                          <p className="text-sm text-muted-foreground">Phone: {order.phone}</p>
                        </div>
                        {order.notes && (
                          <div>
                            <h4 className="font-semibold mb-1">Notes:</h4>
                            <p className="text-sm text-muted-foreground">{order.notes}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="quotes" className="space-y-4">
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : quotes.length === 0 ? (
                <Card>
                  <CardContent className="py-16 text-center">
                    <p className="text-muted-foreground">No quote requests yet</p>
                  </CardContent>
                </Card>
              ) : (
                quotes.map(quote => (
                  <Card key={quote.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">Quote Request</CardTitle>
                          <p className="text-sm text-muted-foreground mt-1">
                            {format(new Date(quote.created_at), 'PPP')}
                          </p>
                        </div>
                        <Badge variant={getStatusColor(quote.status)}>
                          {quote.status.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {quote.occasion && (
                          <div>
                            <span className="font-semibold">Occasion: </span>
                            <span className="text-muted-foreground capitalize">{quote.occasion}</span>
                          </div>
                        )}
                        {quote.event_date && (
                          <div>
                            <span className="font-semibold">Event Date: </span>
                            <span className="text-muted-foreground">
                              {format(new Date(quote.event_date), 'PPP')}
                            </span>
                          </div>
                        )}
                        {quote.budget && (
                          <div>
                            <span className="font-semibold">Budget: </span>
                            <span className="text-muted-foreground">{quote.budget}</span>
                          </div>
                        )}
                        <div>
                          <span className="font-semibold">Contact: </span>
                          <span className="text-muted-foreground">{quote.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="font-semibold">Email</Label>
                        <p className="text-muted-foreground mt-1">{user?.email}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="full_name">Full Name</Label>
                          <Input
                            id="full_name"
                            value={profile.full_name || ''}
                            onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            value={profile.address || ''}
                            onChange={(e) => setProfile({...profile, address: e.target.value})}
                            placeholder="Street address"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={profile.city || ''}
                            onChange={(e) => setProfile({...profile, city: e.target.value})}
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={profile.state || ''}
                            onChange={(e) => setProfile({...profile, state: e.target.value})}
                            placeholder="State"
                          />
                        </div>
                        <div>
                          <Label htmlFor="pincode">Pincode</Label>
                          <Input
                            id="pincode"
                            value={profile.pincode || ''}
                            onChange={(e) => setProfile({...profile, pincode: e.target.value})}
                            placeholder="Pincode"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profile.phone || ''}
                          onChange={(e) => setProfile({...profile, phone: e.target.value})}
                          placeholder="+91 81492 74994"
                        />
                      </div>
                    </div>

                    <Button type="submit" disabled={saving}>
                      {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;