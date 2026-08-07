import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/products";
import { ArrowLeft, Upload, Calendar, MapPin, Users, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const QuoteRequest = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const product = products.find(p => p.id === id);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    eventDate: '',
    venue: '',
    guestCount: '',
    budget: '',
    occasion: '',
    customizations: '',
    additionalRequirements: '',
    urgentDelivery: false,
    includeBranding: false,
    includePackaging: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('quotes')
        .insert({
          user_id: user?.id || null,
          product_id: id || null,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || null,
          event_date: formData.eventDate || null,
          venue: formData.venue || null,
          guest_count: formData.guestCount ? parseInt(formData.guestCount) : null,
          budget: formData.budget || null,
          occasion: formData.occasion || null,
          customizations: formData.customizations || null,
          additional_requirements: formData.additionalRequirements || null,
          urgent_delivery: formData.urgentDelivery,
          include_branding: formData.includeBranding,
          include_packaging: formData.includePackaging,
          status: 'pending'
        });

      if (error) throw error;

      // Send email notification
      try {
        await supabase.functions.invoke("send-quote-email", {
          body: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || undefined,
            occasion: formData.occasion || undefined,
            event_date: formData.eventDate || undefined,
            guest_count: formData.guestCount ? parseInt(formData.guestCount) : undefined,
            venue: formData.venue || undefined,
            budget: formData.budget || undefined,
            customizations: formData.customizations || undefined,
            additional_requirements: formData.additionalRequirements || undefined
          }
        });
      } catch (emailError) {
        console.error("Email notification failed:", emailError);
      }

      toast({
        title: "Quote Request Submitted!",
        description: "We'll get back to you within 24 hours with a detailed quote.",
      });

      // Reset form and navigate
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        eventDate: '',
        venue: '',
        guestCount: '',
        budget: '',
        occasion: '',
        customizations: '',
        additionalRequirements: '',
        urgentDelivery: false,
        includeBranding: false,
        includePackaging: false
      });

      // Navigate to profile if logged in, otherwise to home
      setTimeout(() => {
        navigate(user ? '/profile' : '/');
      }, 1500);
    } catch (error: any) {
      toast({
        title: "Failed to submit quote request",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-16 flex items-center justify-center min-h-[80vh]">
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

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-16">
        {/* Header */}
        <section className="gradient-elegant py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Link to={`/product/${product.id}`} className="inline-flex items-center text-primary hover:text-accent mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Product
            </Link>
            
            <div className="text-center space-y-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">Request Custom Quote</h1>
              <p className="text-lg text-muted-foreground">
                Get a personalized quote for <span className="font-semibold text-primary">{product.title}</span>
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Quote Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Quote Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="company">Company/Organization</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => setFormData({...formData, company: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Event Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="eventDate">Event Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="eventDate"
                              type="date"
                              value={formData.eventDate}
                              onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="occasion">Occasion Type</Label>
                          <Select onValueChange={(value) => setFormData({...formData, occasion: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select occasion" />
                            </SelectTrigger>
                            <SelectContent>
                              {product.occasion.map((occ) => (
                                <SelectItem key={occ} value={occ} className="capitalize">
                                  {occ}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="venue">Venue/Location</Label>
                          <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="venue"
                              value={formData.venue}
                              onChange={(e) => setFormData({...formData, venue: e.target.value})}
                              className="pl-10"
                              placeholder="Enter venue or city"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="guestCount">Expected Guest Count</Label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                              id="guestCount"
                              type="number"
                              value={formData.guestCount}
                              onChange={(e) => setFormData({...formData, guestCount: e.target.value})}
                              className="pl-10"
                              placeholder="Number of guests"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Budget & Requirements */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Budget & Requirements</h3>
                      <div>
                        <Label htmlFor="budget">Approximate Budget Range</Label>
                        <Select onValueChange={(value) => setFormData({...formData, budget: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                            <SelectItem value="50k-1l">₹50,000 - ₹1,00,000</SelectItem>
                            <SelectItem value="1l-2l">₹1,00,000 - ₹2,00,000</SelectItem>
                            <SelectItem value="2l-5l">₹2,00,000 - ₹5,00,000</SelectItem>
                            <SelectItem value="5l-10l">₹5,00,000 - ₹10,00,000</SelectItem>
                            <SelectItem value="above-10l">Above ₹10,00,000</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="customizations">Specific Customizations</Label>
                        <Textarea
                          id="customizations"
                          value={formData.customizations}
                          onChange={(e) => setFormData({...formData, customizations: e.target.value})}
                          placeholder="Describe any specific customizations, themes, colors, or special requirements..."
                          rows={4}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                        <Textarea
                          id="additionalRequirements"
                          value={formData.additionalRequirements}
                          onChange={(e) => setFormData({...formData, additionalRequirements: e.target.value})}
                          placeholder="Photography, catering coordination, transportation, etc..."
                          rows={3}
                        />
                      </div>
                    </div>

                    {/* Additional Options */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Additional Options</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="urgentDelivery"
                            checked={formData.urgentDelivery}
                            onCheckedChange={(checked) => setFormData({...formData, urgentDelivery: checked as boolean})}
                          />
                          <Label htmlFor="urgentDelivery">Urgent Delivery Required (within 7 days)</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="includeBranding"
                            checked={formData.includeBranding}
                            onCheckedChange={(checked) => setFormData({...formData, includeBranding: checked as boolean})}
                          />
                          <Label htmlFor="includeBranding">Include Custom Branding/Logo</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="includePackaging"
                            checked={formData.includePackaging}
                            onCheckedChange={(checked) => setFormData({...formData, includePackaging: checked as boolean})}
                          />
                          <Label htmlFor="includePackaging">Premium Packaging Required</Label>
                        </div>
                      </div>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-primary">Reference Materials</h3>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload inspiration images, venue photos, or reference materials
                        </p>
                        <Button variant="outline" size="sm">
                          Choose Files
                        </Button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Submitting...' : 'Submit Quote Request'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Product Summary */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <div className="aspect-video rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h3 className="font-semibold text-primary mb-2">{product.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">(4.8/5)</span>
                  </div>
                  
                  <p className="text-lg font-bold text-accent mb-4">{product.price}</p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Occasions:</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.occasion.map((occ) => (
                        <Badge key={occ} variant="outline" className="text-xs capitalize">
                          {occ}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-primary mb-3">Why Choose Us?</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                      15+ Years Experience
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                      1000+ Happy Clients
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                      Custom Design Approach
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                      On-Time Delivery Guaranteed
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};