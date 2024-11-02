import { ImageSectionDO } from "../../model";

type ImageSectionProps = {
  section: ImageSectionDO;
};
export const ImageSection = ({ section }: ImageSectionProps) => {
  return (
    <div className="w-full overflow-hidden">
      <img
        className="max-w-none overflow-hidden"
        src={section.url}
        alt="test"
        height={section.height}
        width={section.width}
        style={{
          height: section.height,
          width: section.width,
        }}
      />
    </div>
  );
};
