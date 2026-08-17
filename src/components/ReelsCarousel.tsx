import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { useRef, useState } from "react";
import birthdayReel from "../../public/reels/birthday.mp4.asset.json";
import weddingReel from "../../public/reels/wedding.mp4.asset.json";
import corporateReel from "../../public/reels/corporate.mp4.asset.json";
import stationeryReel from "../../public/reels/stationery.mp4.asset.json";
import decorationReel from "../../public/reels/decoration.mp4.asset.json";
import festivalsReel from "../../public/reels/festivals.mp4.asset.json";

type Reel = {
  id: string;
  title: string;
  tag: string;
  source: "Hushwood" | "Customer";
  src: string;
};

const reels: Reel[] = [
  {
    id: "1",
    title: "Birthday vibes",
    tag: "Birthday",
    source: "Hushwood",
    src: birthdayReel.url,
  },
  {
    id: "2",
    title: "Wedding details",
    tag: "Wedding",
    source: "Customer",
    src: weddingReel.url,
  },
  {
    id: "3",
    title: "Corporate gifting",
    tag: "Corporate",
    source: "Hushwood",
    src: corporateReel.url,
  },
  {
    id: "4",
    title: "Stationery closeups",
    tag: "Stationery",
    source: "Customer",
    src: stationeryReel.url,
  },
  {
    id: "5",
    title: "Event decor",
    tag: "Decoration",
    source: "Hushwood",
    src: decorationReel.url,
  },
  {
    id: "6",
    title: "Festival gifting",
    tag: "Festivals",
    source: "Customer",
    src: festivalsReel.url,
  },
];

const ReelCard = ({ reel }: { reel: Reel }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    const v = videoRef.current;
    if (!v) return;

    try {
      v.currentTime = 0;
      await v.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const pause = () => {
    const v = videoRef.current;
    if (!v) return;

    v.pause();
    setIsPlaying(false);
  };

  const toggle = async () => {
    if (isPlaying) {
      pause();
      return;
    }

    await play();
  };

  return (
    <Card className="overflow-hidden shadow-elegant border border-border">
      <CardContent className="p-0">
        <div
          className="relative aspect-[9/16] bg-muted"
          onMouseEnter={play}
          onMouseLeave={pause}
          onClick={toggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              void toggle();
            }
          }}
          aria-label={`Reel: ${reel.title}`}
        >
          <video
            ref={videoRef}
            src={reel.src}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="metadata"
            loop
          />

          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <Badge className="bg-accent text-primary shadow-sm">{reel.tag}</Badge>
            <Badge variant="outline" className="bg-background/70 backdrop-blur-sm">
              {reel.source}
            </Badge>
          </div>

          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity",
              isPlaying ? "opacity-0" : "opacity-100",
            )}
          >
            <div className="w-14 h-14 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center shadow-elegant">
              <Play className="w-6 h-6 text-primary" />
            </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-primary-foreground font-semibold leading-snug line-clamp-2">{reel.title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ReelsCarousel = () => {
  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-6 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">Moments that Count</h2>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="relative"
        >
          <CarouselContent className="-ml-3 sm:-ml-6">
            {reels.map((reel) => (
              <CarouselItem key={reel.id} className="pl-3 sm:pl-6 basis-[80%] sm:basis-[45%] lg:basis-[26%]">
                <ReelCard reel={reel} />
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};
