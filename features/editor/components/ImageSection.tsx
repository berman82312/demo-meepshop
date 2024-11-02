import { ImageSectionDO } from "../model";

type ImageSectionProps = {
  section: ImageSectionDO;
};
export const ImageSection = ({ section }: ImageSectionProps) => {
  return (
    <div>
      <img
        src={section.url}
        alt="test"
        height={section.height}
        width={section.width}
      />
    </div>
  );
};
