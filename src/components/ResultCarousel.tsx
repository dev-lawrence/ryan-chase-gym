import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ClientStory {
  id: number;
  slug?: string;
  name: string;
  title: string;
  beforeImage: ImageMetadata;
  afterImage: ImageMetadata;
  testimonial: string;
  duration: string;
}

interface ClientStoriesCarouselProps {
  stories: ClientStory[];
  autoPlayInterval?: number;
}

export function ResultCarousel({
  stories,
  autoPlayInterval = 5000,
}: ClientStoriesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlay, stories.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
    setIsAutoPlay(false);
  };

  const currentStory = stories[currentIndex];

  return (
    <div className="w-full bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-[800px] mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl leading-[1.3] font-bold mb-2">
            Results speak for themselves
          </h2>
          <p className="text-lg text-muted-foreground mb-12">
            Hear from our clients about their incredible transformations and
            experiences working with us.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Carousel */}
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            {/* Left Arrow */}
            <button
              onClick={goToPrevious}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-accent transition-colors"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Story Card */}
            <div className="w-full max-w-2xl">
              <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm overflow-hidden">
                {/* Images Section */}
                <div className="relative overflow-hidden bg-muted">
                  <div className="flex gap-2 sm:gap-4 p-4 sm:p-6">
                    {/* Before Image */}
                    <div className="flex-1 aspect-[3/4] rounded-md overflow-hidden">
                      <img
                        src={currentStory.beforeImage.src || '/placeholder.svg'}
                        alt={`${currentStory.name} before`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* After Image */}
                    <div className="flex-1 aspect-[3/4] rounded-md overflow-hidden">
                      <img
                        src={currentStory.afterImage.src || '/placeholder.svg'}
                        alt={`${currentStory.name} after`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 sm:p-8">
                  {/* Duration */}
                  <p className="text-sm font-semibold text-muted-foreground mb-3">
                    {currentStory.duration}
                  </p>

                  {/* Testimonial */}
                  <p className="text-lg sm:text-xl text-foreground mb-6 leading-relaxed">
                    {currentStory.testimonial}
                  </p>

                  {/* Name and Read More */}
                  <div className="flex items-center justify-between">
                    <p className="text-base font-semibold text-primary">
                      — {currentStory.name}
                    </p>
                    <a
                      href={`/client-story/${currentStory.slug}`}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1"
                    >
                      Read more <span className="text-lg">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Arrow */}
            <button
              onClick={goToNext}
              onMouseEnter={() => setIsAutoPlay(false)}
              onMouseLeave={() => setIsAutoPlay(true)}
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full border border-border hover:bg-accent transition-colors"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex sm:hidden justify-between mt-4 gap-2">
            <button
              onClick={goToPrevious}
              className="flex-1 flex items-center justify-center py-2 rounded-md border border-border hover:bg-accent transition-colors"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              className="flex-1 flex items-center justify-center py-2 rounded-md border border-border hover:bg-accent transition-colors"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-muted-foreground hover:bg-muted-foreground/70'
                )}
                aria-label={`Go to story ${index + 1}`}
                aria-current={index === currentIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
