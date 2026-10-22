import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import {
  Expand,
  FastForward,
  Pause,
  Play,
  Rewind,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
};

const SKIP_SECONDS = 10;

const ReelPlayerDialog = ({
  reel,
  onClose,
}: {
  reel: Reel;
  onClose: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => setDuration(v.duration || 0);
    const onTime = () => {
      setCurrentTime(v.currentTime);
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    };
    const onEnded = () => setIsPlaying(false);
    const onFullscreenChange = () =>
      setIsFullscreen(Boolean(document.fullscreenElement));

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    document.addEventListener("fullscreenchange", onFullscreenChange);

    // Start playback automatically with sound (opened via a user click).
    v.currentTime = 0;
    v.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, [reel.id]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const v = videoRef.current;
      if (!v) return;
      if (e.key === "Escape") {
        if (document.fullscreenElement) return; // browser exits fullscreen first
        e.preventDefault();
        onClose();
      } else if (e.key === " " || e.key === "k") {
        e.preventDefault();
        toggle();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        seekBy(-SKIP_SECONDS);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        seekBy(SKIP_SECONDS);
      } else if (e.key === "m") {
        e.preventDefault();
        toggleMute();
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const seekBy = (delta: number) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = Math.min(
      Math.max(0, v.currentTime + delta),
      v.duration || 0
    );
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    const pct = Number(e.target.value);
    setProgress(pct);
    v.currentTime = (pct / 100) * v.duration;
  };

  const toggleFullscreen = () => {
    const wrapper = videoRef.current?.parentElement;
    if (!wrapper) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void wrapper.requestFullscreen?.().catch(() => {});
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-primary/80 backdrop-blur-sm p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Playing reel: ${reel.title}`}
    >
      <div
        className="relative w-full max-w-[380px] mx-auto"
        style={{ maxHeight: "90vh", aspectRatio: "9 / 16" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-elegant border border-border bg-muted flex flex-col">
          {/* Video area */}
          <div className="relative flex-1 min-h-0">
            <video
              ref={videoRef}
              src={reel.src}
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              preload="auto"
              onClick={toggle}
            />

            <div className="absolute top-3 left-3 flex items-center gap-2">
              <Badge className="bg-accent text-primary shadow-sm">
                {reel.tag}
              </Badge>
              <Badge
                variant="outline"
                className="bg-background/70 backdrop-blur-sm"
              >
                {reel.source}
              </Badge>
            </div>

            <button
              onClick={onClose}
              aria-label="Close reel player"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-background transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isPlaying && (
              <button
                onClick={toggle}
                aria-label="Play reel"
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="w-14 h-14 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center shadow-elegant">
                  <Play className="w-6 h-6 text-primary" />
                </span>
              </button>
            )}
          </div>

          {/* Controls bar */}
          <div className="bg-background/95 backdrop-blur-sm border-t border-border px-3 pt-2 pb-3 space-y-2">
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={onSeek}
              aria-label="Seek within reel"
              className="w-full h-1.5 accent-[hsl(var(--accent))] cursor-pointer"
            />
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => seekBy(-SKIP_SECONDS)}
                  aria-label="Back 10 seconds"
                  className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-primary"
                >
                  <Rewind className="w-4 h-4" />
                </button>
                <button
                  onClick={toggle}
                  aria-label={isPlaying ? "Pause reel" : "Play reel"}
                  className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-primary"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </button>
                <button
                  onClick={() => seekBy(SKIP_SECONDS)}
                  aria-label="Forward 10 seconds"
                  className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-primary"
                >
                  <FastForward className="w-4 h-4" />
                </button>
              </div>

              <span className="text-xs text-muted-foreground tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute reel" : "Mute reel"}
                  className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-primary"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={toggleFullscreen}
                  aria-label="View fullscreen"
                  className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-primary"
                >
                  <Expand className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-3 text-center text-sm text-primary-foreground font-medium line-clamp-2 px-6">
          {reel.title}
        </p>
      </div>
    </div>
  );
};

const ReelCard = ({ reel }: { reel: Reel }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);

  const play = async () => {
    if (showPlayer) return;
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

  const openPlayer = () => {
    pause();
    setShowPlayer(true);
  };

  return (
    <>
      <Card className="overflow-hidden shadow-elegant border border-border">
        <CardContent className="p-0">
          <div
            className="relative aspect-[9/16] bg-muted"
            onMouseEnter={play}
            onMouseLeave={pause}
            onClick={openPlayer}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openPlayer();
              }
            }}
            aria-label={`Open reel: ${reel.title}`}
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
              <Badge className="bg-accent text-primary shadow-sm">
                {reel.tag}
              </Badge>
              <Badge
                variant="outline"
                className="bg-background/70 backdrop-blur-sm"
              >
                {reel.source}
              </Badge>
            </div>

            <div
              className={cn(
                "absolute top-4 right-4 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center",
                isPlaying ? "opacity-0" : "opacity-100"
              )}
            >
              <Expand className="w-4 h-4 text-primary" />
            </div>

            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-opacity pointer-events-none",
                isPlaying ? "opacity-0" : "opacity-100"
              )}
            >
              <div className="w-14 h-14 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center shadow-elegant">
                <Play className="w-6 h-6 text-primary" />
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-primary-foreground font-semibold leading-snug line-clamp-2">
                {reel.title}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {showPlayer && (
        <ReelPlayerDialog reel={reel} onClose={() => setShowPlayer(false)} />
      )}
    </>
  );
};

export const ReelsCarousel = () => {
  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-6 mb-6 sm:mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary">
              Moments that Count
            </h2>
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
              <CarouselItem
                key={reel.id}
                className="pl-3 sm:pl-6 basis-[80%] sm:basis-[45%] lg:basis-[26%]"
              >
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
