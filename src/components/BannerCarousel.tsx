import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const HERO_SLIDES = [
  {
    src: "https://wallpapers.com/images/featured/summer-pictures-nyv022soo0r5p1sq.webp",
    alt: "Fashion model in a vibrant pink outfit",
    title: "Vibrant Summer Collection",
    subtitle: "Up to 50% Off",
  },
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    alt: "Street style fashion",
    title: "Urban Streetwear Edit",
    subtitle: "New Arrivals Daily",
  },
  {
    src: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    alt: "Woman shopping for clothes",
    title: "Exclusive Online Deals",
    subtitle: "Shop Now, Pay Later",
  },
  {
    src: "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?q=80&w=1887&auto=format&fit=crop",
    alt: "Model wearing ethnic wear",
    title: "Ethnic & Festive Wear",
    subtitle: "Celebrate in Style",
  },
  {
    src: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1887&auto=format&fit=crop",
    alt: "Collection of sneakers",
    title: "Top Sneaker Brands",
    subtitle: "Find Your Perfect Pair",
  },
];
// ---

export function BannerCarousel() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useMemo(
    () => Autoplay({ delay: 4000, stopOnInteraction: false }),
    []
  );

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="w-full pt-4 relative group">
      <Carousel
        setApi={setApi}
        plugins={[plugin]}
        className="w-full"
        onMouseEnter={plugin.stop}
        onMouseLeave={plugin.reset}
      >
        <CarouselContent>
          {HERO_SLIDES.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative h-32 w-full hover:scale-103 transition-all duration-1500 ease-in-out">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                  <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-md">
                    {slide.title}
                  </h1>
                  <p className="mt-4 text-lg md:text-2xl font-medium drop-shadow-md">
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden group-hover:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden group-hover:flex" />
      </Carousel>

      {/* Custom Bottom Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ease-in-out ${
                current === index ? "w-8 bg-ajio-pink" : "w-4 bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
