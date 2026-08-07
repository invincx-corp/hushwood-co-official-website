import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { CalendarHeart, Gift, PartyPopper, Leaf, BriefcaseBusiness, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import birthdayImage from "@/assets/bollywood-party.jpg";
import anniversaryImage from "@/assets/palace-wedding-decor.jpg";
import giftsImage from "@/assets/corporate-gifts.jpg";
import corporateImage from "@/assets/employee-recognition.jpg";
import natureImage from "@/assets/babyshower-garden.jpg";
import stationeryImage from "@/assets/stationery-design.jpg";

type OccasionBanner = {
  title: string;
  subtitle: string;
  cta: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
};

const banners: OccasionBanner[] = [
  {
    title: "Make birthdays unforgettable",
    subtitle: "From invites to decor to hampers — make it personal, premium, and memorable.",
    cta: "Shop Birthday",
    to: "/occasion/birthday",
    icon: PartyPopper,
    image: birthdayImage,
  },
  {
    title: "Anniversary specials",
    subtitle: "Elegant details for the moments that matter — gifting and decor curated with love.",
    cta: "Explore Anniversary",
    to: "/occasion/wedding",
    icon: CalendarHeart,
    image: anniversaryImage,
  },
  {
    title: "No more boring gifts",
    subtitle: "Thoughtful hampers, premium packaging, and custom touches that stand out.",
    cta: "Browse Gift Hampers",
    to: "/catalog/gifts",
    icon: Gift,
    image: giftsImage,
  },
  {
    title: "Your Company's people matter",
    subtitle: "Gift them something special — recognition hampers and corporate gifting programs.",
    cta: "Corporate Gifting",
    to: "/occasion/corporate",
    icon: BriefcaseBusiness,
    image: corporateImage,
  },
  {
    title: "Bring nature to your people",
    subtitle: "Fresh, calming, and curated — gifting that feels warm and alive.",
    cta: "Explore Nature",
    to: "/catalog/decoration",
    icon: Leaf,
    image: natureImage,
  },
  {
    title: "Gifts for daily dreams",
    subtitle: "Custom stationery for journaling, planning, and everyday inspiration.",
    cta: "Shop Stationery",
    to: "/catalog/stationery",
    icon: Sparkles,
    image: stationeryImage,
  },
];

export const OccasionCarousel = () => {
  return (
    <section className="py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">Celebrations, Curated Beautifully</h2>
        </div>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative"
        >
          <CarouselContent className="-ml-6">
            {banners.map((banner) => (
              <CarouselItem
                key={banner.title}
                className="pl-6 basis-[90%] sm:basis-[70%] lg:basis-[45%]"
              >
                <Card className="overflow-hidden shadow-elegant border border-border">
                  <CardContent className="p-0">
                    <div className="relative h-[280px] sm:h-[320px]">
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/55 to-transparent" />

                      <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                        <div className="space-y-4">
                          <div className="w-12 h-12 gradient-gold rounded-full flex items-center justify-center shadow-gold">
                            <banner.icon className="w-6 h-6 text-primary-foreground" />
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground leading-tight">
                              {banner.title}
                            </h3>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Link to={banner.to}>
                            <Button variant="hero" size="lg" className="shadow-gold transition-spring">
                              {banner.cta}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </section>
  );
};
