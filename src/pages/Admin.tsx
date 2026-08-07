import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Package, MessageSquare, FileText, Mail, Phone, MapPin } from 'lucide-react';
import type { Json } from '@/integrations/supabase/types';

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  total_amount: number;
  status: string;
  delivery_address: string;
  phone: string;
  items: Json;
  notes: string | null;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}

interface Quote {
  id: string;
  name: string;
  email: string;
  phone: string;
  occasion?: string;
  event_date?: string;
  guest_count?: number;
  venue?: string;
  budget?: string;
  customizations?: string;
  status: string;
  created_at: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .rpc('has_role', { 
          _user_id: user.id, 
          _role: 'admin' 
        });

      if (roleError || !roleData) {
        toast({
          title: 'Access Denied',
          description: 'You do not have admin privileges.',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      setIsAdmin(true);
      await fetchAllData();
    } catch (error) {
      console.error('Admin access check error:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    // Fetch orders
    const { data: ordersData } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (ordersData) setOrders(ordersData);

    // Fetch contacts
    const { data: contactsData } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (contactsData) setContacts(contactsData);

    // Fetch quotes
    const { data: quotesData } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (quotesData) setQuotes(quotesData);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-primary">Admin Dashboard</h1>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="orders" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm px-1 py-2">
              <Package className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm px-1 py-2">
              <MessageSquare className="w-4 h-4" />
              <span>Contacts ({contacts.length})</span>
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-xs sm:text-sm px-1 py-2">
              <FileText className="w-4 h-4" />
              <span>Quotes ({quotes.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex flex-col xs:flex-row justify-between items-start gap-2">
                    <div>
                      <CardTitle className="text-xl">{order.order_number}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={order.status === 'pending' ? 'secondary' : 'default'}>
                      {order.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Phone</p>
                        <p className="text-sm text-muted-foreground">{order.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Delivery Address</p>
                        <p className="text-sm text-muted-foreground">{order.delivery_address}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Items ({Array.isArray(order.items) ? order.items.length : 0})</p>
                    <div className="space-y-2">
                      {Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                        <div key={idx} className="text-sm bg-muted p-3 rounded">
                          <p className="font-medium">{item.title || item.product_id}</p>
                          <p className="text-muted-foreground">Quantity: {item.quantity}</p>
                          {item.customization_notes && (
                            <p className="text-muted-foreground italic">
                              Customization: {item.customization_notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {order.notes && (
                    <div>
                      <p className="text-sm font-medium">Additional Notes</p>
                      <p className="text-sm text-muted-foreground">{order.notes}</p>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <p className="text-lg font-bold text-primary">
                      Total: ₹{order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {orders.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No orders yet
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="contacts" className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.id}>
                <CardHeader>
                  <div className="flex flex-col xs:flex-row justify-between items-start gap-2">
                    <div>
                      <CardTitle className="text-xl">{contact.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(contact.created_at).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={contact.status === 'new' ? 'secondary' : 'default'}>
                      {contact.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${contact.email}`} className="text-sm hover:underline">
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <a href={`tel:${contact.phone}`} className="text-sm hover:underline">
                      {contact.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Message</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {contact.message}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
            {contacts.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No contact submissions yet
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="quotes" className="space-y-4">
            {quotes.map((quote) => (
              <Card key={quote.id}>
                <CardHeader>
                  <div className="flex flex-col xs:flex-row justify-between items-start gap-2">
                    <div>
                      <CardTitle className="text-xl">{quote.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(quote.created_at).toLocaleString()}
                      </p>
                    </div>
                    <Badge variant={quote.status === 'pending' ? 'secondary' : 'default'}>
                      {quote.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <a href={`mailto:${quote.email}`} className="text-sm hover:underline">
                        {quote.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${quote.phone}`} className="text-sm hover:underline">
                        {quote.phone}
                      </a>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 pt-2">
                    {quote.occasion && (
                      <div>
                        <p className="text-sm font-medium">Occasion</p>
                        <p className="text-sm text-muted-foreground">{quote.occasion}</p>
                      </div>
                    )}
                    {quote.event_date && (
                      <div>
                        <p className="text-sm font-medium">Event Date</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(quote.event_date).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    {quote.guest_count && (
                      <div>
                        <p className="text-sm font-medium">Guest Count</p>
                        <p className="text-sm text-muted-foreground">{quote.guest_count}</p>
                      </div>
                    )}
                    {quote.budget && (
                      <div>
                        <p className="text-sm font-medium">Budget</p>
                        <p className="text-sm text-muted-foreground">{quote.budget}</p>
                      </div>
                    )}
                  </div>

                  {quote.venue && (
                    <div>
                      <p className="text-sm font-medium">Venue</p>
                      <p className="text-sm text-muted-foreground">{quote.venue}</p>
                    </div>
                  )}

                  {quote.customizations && (
                    <div>
                      <p className="text-sm font-medium">Customizations</p>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {quote.customizations}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
            {quotes.length === 0 && (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No quote requests yet
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
