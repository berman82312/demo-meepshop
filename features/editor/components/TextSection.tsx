import { TextSectionDO } from "../model";

type TextSectionProps = {
  section: TextSectionDO;
};
export const TextSection = ({ section }: TextSectionProps) => {
  return (
    <div>
      {section.content}
    </div>
  );
};
