import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const faqCategories = [
  {
    category: "General Questions",
    questions: [
      {
        question: "What services does Hushwood & Co. provide?",
        answer: "We specialize in creating memorable celebrations through customized invitations, gift hampers, venue decorations, and event design for weddings, corporate events, festivals, and special occasions across India."
      },
      {
        question: "Which cities do you serve?",
        answer: "We primarily serve Delhi NCR, Mumbai, and Bangalore, but we can accommodate events across India. For outstation events, please contact us to discuss logistics and arrangements."
      },
      {
        question: "How far in advance should I book your services?",
        answer: "We recommend booking at least 4-6 weeks in advance for small events and 3-4 months for large weddings or corporate events. However, we do accept urgent orders based on availability."
      }
    ]
  },
  {
    category: "Ordering & Customization",
    questions: [
      {
        question: "Can I customize products according to my theme?",
        answer: "Absolutely! All our products are fully customizable. You can choose colors, designs, themes, content, and even materials. Use our customization dialog when adding items to cart or request a custom quote for detailed specifications."
      },
      {
        question: "How does the quote request process work?",
        answer: "Simply fill out our quote request form with your event details, budget, and requirements. Our team will review your request and get back to you within 24 hours with a detailed proposal and pricing."
      },
      {
        question: "What information do I need to provide for customization?",
        answer: "For best results, provide: event date, theme/color preferences, guest count, venue details, budget range, and any specific design inspirations. The more details you share, the better we can customize for you."
      },
      {
        question: "Can I see samples before finalizing my order?",
        answer: "Yes! For large orders, we provide digital mockups or physical samples (charges may apply for samples). This ensures you're completely satisfied before we proceed with bulk production."
      }
    ]
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        question: "How is pricing determined?",
        answer: "Pricing depends on the product type, quantity, level of customization, materials used, and delivery timeline. We provide transparent, itemized quotes with no hidden charges."
      },
      {
        question: "What payment methods do you accept?",
        answer: "Currently, we accept Cash on Delivery for all orders. We're working on adding online payment options soon. For large corporate orders, we offer flexible payment terms."
      },
      {
        question: "Is there a minimum order quantity?",
        answer: "For most customized products, we have minimum order quantities (typically 25-50 pieces for invitations, 10-20 for hampers). However, we can accommodate smaller quantities for certain items at slightly higher per-unit costs."
      },
      {
        question: "Do you charge for delivery?",
        answer: "Delivery charges depend on location and order value. Orders above ₹10,000 in metro cities receive free delivery. For outstation or urgent deliveries, nominal charges apply."
      }
    ]
  },
  {
    category: "Production & Delivery",
    questions: [
      {
        question: "What is the typical production time?",
        answer: "Standard production time is 2-3 weeks after design approval. Rush orders can be accommodated in 7-10 days with additional charges. Complex or large-scale projects may require more time."
      },
      {
        question: "How will my order be delivered?",
        answer: "We use professional courier services for small orders and our own logistics team for large deliveries. All items are carefully packed to ensure they reach you in perfect condition."
      },
      {
        question: "Can I track my order?",
        answer: "Yes! Once your order is dispatched, you'll receive tracking information via email and SMS. You can also check order status anytime from your profile dashboard."
      },
      {
        question: "What if I need my order urgently?",
        answer: "We offer express production services for urgent orders. Select 'Urgent Delivery' when placing your order or request a rush quote. Additional charges apply for expedited processing."
      }
    ]
  },
  {
    category: "Quality & Returns",
    questions: [
      {
        question: "What if I'm not satisfied with my order?",
        answer: "Your satisfaction is our priority. If there's an issue with product quality or if we've made an error, we'll remake or refund as appropriate. Contact us within 48 hours of delivery."
      },
      {
        question: "Do you provide quality guarantees?",
        answer: "Absolutely! We use premium materials and have strict quality checks at every stage. If any item doesn't meet our standards, we'll replace it at no additional cost."
      },
      {
        question: "Can I make changes after placing an order?",
        answer: "Minor changes can be accommodated if production hasn't started. Once production begins, significant changes may require cancellation and re-ordering. Contact us immediately if you need modifications."
      },
      {
        question: "What is your cancellation policy?",
        answer: "Orders can be cancelled before production starts for a full refund. After production begins, cancellation charges may apply based on work completed. Custom orders are non-refundable once approved."
      }
    ]
  },
  {
    category: "Special Services",
    questions: [
      {
        question: "Do you provide on-site setup for decorations?",
        answer: "Yes! For venue decoration services, our team handles complete setup and styling. We arrive early to ensure everything is perfect before your guests arrive."
      },
      {
        question: "Can you handle destination wedding requirements?",
        answer: "Absolutely! We've executed numerous destination weddings across India. Our team coordinates with local vendors and ensures all materials reach the venue on time."
      },
      {
        question: "Do you offer corporate bulk ordering?",
        answer: "Yes! We have extensive experience with corporate clients. We offer volume discounts, flexible payment terms, dedicated account management, and can accommodate urgent corporate requirements."
      },
      {
        question: "Can you provide eco-friendly or sustainable options?",
        answer: "Yes! We offer sustainable alternatives including recycled paper, biodegradable materials, plantable invitations, and eco-friendly packaging. Let us know your preference when requesting a quote."
      }
    ]
  }
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="gradient-elegant py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-primary mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our services, ordering process, and more
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 bg-background">
          <div className="max-w-4xl mx-auto px-6">
            <div className="space-y-12">
              {faqCategories.map((category, idx) => (
                <div key={idx}>
                  <h2 className="text-2xl font-bold text-primary mb-6">{category.category}</h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((item, qIdx) => (
                      <AccordionItem 
                        key={qIdx} 
                        value={`item-${idx}-${qIdx}`}
                        className="border rounded-lg px-6 bg-card"
                      >
                        <AccordionTrigger className="text-left hover:no-underline py-4">
                          <span className="font-semibold text-primary">{item.question}</span>
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-4">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-gradient-subtle">
          <div className="max-w-4xl mx-auto px-6">
            <Card className="overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="text-center space-y-6">
                  <h2 className="text-3xl font-bold text-primary">Still Have Questions?</h2>
                  <p className="text-muted-foreground text-lg">
                    Can't find the answer you're looking for? Our team is here to help!
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center">
                        <Phone className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold text-primary">Call Us</h3>
                      <p className="text-sm text-muted-foreground">+91 81492 74994</p>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center">
                        <Mail className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold text-primary">Email Us</h3>
                      <p className="text-sm text-muted-foreground">hushwoodco@gmail.com</p>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 gradient-gold rounded-full flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="font-semibold text-primary">Live Chat</h3>
                      <p className="text-sm text-muted-foreground">Available 9 AM - 7 PM</p>
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center mt-8">
                    <Link to="/contact">
                      <Button size="lg" className="shadow-gold">
                        Contact Us
                      </Button>
                    </Link>
                    <Link to="/quote">
                      <Button size="lg" variant="outline">
                        Request Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
