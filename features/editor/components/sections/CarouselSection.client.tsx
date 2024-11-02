import { CarouselSectionDO } from "../../model";
import { Carousel } from "nuka-carousel";

type CarouselSectionProps = {
  section: CarouselSectionDO;
};

export const CarouselSection = ({ section }: CarouselSectionProps) => {
  return (
    <div className="w-[400px]">
      <Carousel
        key={section.images.map(image => image.id).join(',')}
        autoplay
        showDots
      >
        {section.images.map((image) => (
          <CarouselImage key={image.url} image={image} />
        ))}
      </Carousel>
    </div>
  );
};

type CarouselImageProps = {
  image: {
    id: string;
    url: string;
  };
};

const CarouselImage = ({ image }: CarouselImageProps) => {
  return (
    <img
      style={{
        height: 300,
        width: 400,
      }}
      src={image.url}
      height={300}
      width={400}
      alt={image.url}
    />
  );
};
