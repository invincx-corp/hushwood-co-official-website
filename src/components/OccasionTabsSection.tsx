import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HorizontalScroller } from "@/components/HorizontalScroller";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Baby,
  BadgeCheck,
  Building2,
  CalendarHeart,
  CandlestickChart,
  Cake,
  Church,
  Gift,
  GraduationCap,
  HeartHandshake,
  Landmark,
  PartyPopper,
  Sparkles,
  Stars,
  Sun,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import birthdayImage from "@/assets/bollywood-party.jpg";
import weddingImage from "@/assets/palace-wedding-decor.jpg";
import festivalImage from "@/assets/festival-cards.jpg";
import inaugurationImage from "@/assets/government-event.jpg";
import awardsImage from "@/assets/executive-awards.jpg";
import launchImage from "@/assets/product-launch.jpg";

import weddingInvitationsImage from "@/assets/wedding-invitations.jpg";
import corporateStationeryImage from "@/assets/corporate-stationery.jpg";
import diwaliDecorationImage from "@/assets/diwali-decoration.jpg";
import employeeRecognitionImage from "@/assets/employee-recognition.jpg";
import tradeShowImage from "@/assets/trade-show.jpg";
import weddingHampersImage from "@/assets/wedding-hampers.jpg";
import babyCardsImage from "@/assets/baby-cards.jpg";
import corporateGiftingProgramImage from "@/assets/corporate-gifting-program.jpg";
import diwaliHampersImage from "@/assets/diwali-hampers.jpg";
import corporateCeremonyImage from "@/assets/corporate-ceremony.jpg";
import venueDecorationImage from "@/assets/venue-decoration.jpg";

type OccasionKey =
  | "birthday"
  | "anniversary"
  | "corporate"
  | "wedding"
  | "engagement"
  | "baby_shower"
  | "bridal_shower"
  | "bachelorette"
  | "festivals"
  | "inaugurations"
  | "housewarming"
  | "awards"
  | "public_events"
  | "govt_events"
  | "public_launch"
  | "special_days"
  | "retirement"
  | "private_party"
  | "other";

type OccasionTab = {
  key: OccasionKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  themeImage: string;
};

const occasionTabs: OccasionTab[] = [
  { key: "birthday", label: "Birthday", icon: Cake, themeImage: birthdayImage },
  { key: "anniversary", label: "Anniversary", icon: CalendarHeart, themeImage: weddingHampersImage },
  { key: "corporate", label: "Corporate Events", icon: Building2, themeImage: corporateStationeryImage },
  { key: "wedding", label: "Wedding", icon: HeartHandshake, themeImage: weddingInvitationsImage },
  { key: "engagement", label: "Engagement", icon: Sparkles, themeImage: weddingImage },
  { key: "baby_shower", label: "Baby Shower", icon: Baby, themeImage: babyCardsImage },
  { key: "bridal_shower", label: "Bridal Shower", icon: Stars, themeImage: weddingInvitationsImage },
  { key: "bachelorette", label: "Bachelorette", icon: PartyPopper, themeImage: birthdayImage },
  { key: "festivals", label: "Festivals", icon: Sun, themeImage: diwaliDecorationImage },
  { key: "inaugurations", label: "Inaugurations", icon: Landmark, themeImage: corporateCeremonyImage },
  { key: "housewarming", label: "Housewarming", icon: Church, themeImage: venueDecorationImage },
  { key: "awards", label: "Awards", icon: BadgeCheck, themeImage: awardsImage },
  { key: "public_events", label: "Public Events", icon: Users, themeImage: tradeShowImage },
  { key: "govt_events", label: "Govt Events", icon: Landmark, themeImage: inaugurationImage },
  { key: "public_launch", label: "Public Launch", icon: Sparkles, themeImage: launchImage },
  { key: "special_days", label: "Special Days", icon: Gift, themeImage: diwaliHampersImage },
  { key: "retirement", label: "Retirement/Farewell", icon: GraduationCap, themeImage: employeeRecognitionImage },
  { key: "private_party", label: "Office/Private Party", icon: CandlestickChart, themeImage: corporateGiftingProgramImage },
  { key: "other", label: "Other", icon: Stars, themeImage: festivalImage },
];

type OccasionGroupKey =
  | "family"
  | "friends"
  | "corporate"
  | "public"
  | "private"
  | "festivals"
  | "govt";

type OccasionGroup = {
  key: OccasionGroupKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  occasions: OccasionKey[];
};

const occasionGroups: OccasionGroup[] = [
  {
    key: "family",
    label: "Family Events",
    icon: Users,
    occasions: ["wedding", "engagement", "anniversary", "baby_shower", "bridal_shower"],
  },
  {
    key: "corporate",
    label: "Corporate Events",
    icon: Building2,
    occasions: ["corporate", "inaugurations"],
  },
  {
    key: "public",
    label: "Public Events",
    icon: PartyPopper,
    occasions: ["public_events", "awards", "public_launch"],
  },
  {
    key: "private",
    label: "Private Events",
    icon: CandlestickChart,
    occasions: ["private_party", "housewarming", "other"],
  },
  {
    key: "festivals",
    label: "Festivals",
    icon: Sun,
    occasions: ["festivals", "special_days"],
  },
  {
    key: "govt",
    label: "Govt Events",
    icon: Landmark,
    occasions: ["govt_events"],
  },
  {
    key: "friends",
    label: "Friends Events",
    icon: Stars,
    occasions: ["birthday", "bachelorette", "retirement"],
  },
];

const getOccasionPath = (key: OccasionKey) => {
  if (key === "anniversary") return "/occasion/wedding";
  if (key === "private_party") return "/occasion/birthday";
  if (key === "special_days") return "/occasion/festivals";

  if (key === "engagement") return "/occasion/wedding";
  if (key === "bridal_shower") return "/occasion/wedding";
  if (key === "bachelorette") return "/occasion/birthday";
  if (key === "housewarming") return "/occasion/other";
  if (key === "inaugurations") return "/occasion/other";
  if (key === "awards") return "/occasion/corporate";
  if (key === "public_events") return "/occasion/other";
  if (key === "govt_events") return "/occasion/corporate";
  if (key === "public_launch") return "/occasion/corporate";
  if (key === "retirement") return "/occasion/other";
  if (key === "other") return "/occasion/other";

  return `/occasion/${key}`;
};

export const OccasionTabsSection = () => {
  return (
    <section className="py-12 sm:py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-left mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">Pick an Occasion</h2>
        </div>

        <Tabs defaultValue={occasionGroups[0].key} className="w-full">
          <div className="relative z-10 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 border-y border-border">
            <div className="max-w-7xl mx-auto">
              <HorizontalScroller ariaLabel="Occasion categories">
                <TabsList className="w-max h-auto inline-flex gap-2 bg-transparent p-0">
                  {occasionGroups.map((group) => (
                    <TabsTrigger
                      key={group.key}
                      value={group.key}
                      className="bg-background border border-border shadow-sm rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-gold"
                    >
                      <group.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                      {group.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </HorizontalScroller>

            </div>
          </div>

          {occasionGroups.map((group) => (
            <TabsContent key={group.key} value={group.key} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {group.occasions.map((key) => {
                  const occasion = occasionTabs.find((t) => t.key === key);
                  if (!occasion) return null;

                  return (
                    <Link key={occasion.key} to={getOccasionPath(occasion.key)} className="block">
                      <Card className="group overflow-hidden shadow-elegant transition-spring hover:shadow-gold hover:-translate-y-1">
                        <div className="relative h-32 sm:h-40 overflow-hidden">
                          <img
                            src={occasion.themeImage}
                            alt={occasion.label}
                            loading="lazy"
                            className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/40 to-transparent" />
                        </div>

                        <CardContent className="p-4 sm:p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 gradient-gold rounded-full flex items-center justify-center shadow-gold shrink-0">
                              <occasion.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                            </div>
                            <div className="min-w-0">
                              <h3 className="text-lg font-semibold text-primary leading-snug">
                                {occasion.label}
                              </h3>
                              <p className="text-sm text-muted-foreground">Explore</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};
