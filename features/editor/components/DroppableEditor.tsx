import { type DragEventHandler, KeyboardEventHandler, useContext } from "react";
import {
  CarouselSectionDO,
  ImageSectionDO,
  SectionDO,
  TextSectionDO,
  WysiwygSectionDO,
} from "../model";
import { TextSection } from "./sections/TextSection";
import { ImageSection } from "./sections/ImageSection";
import { EditorContext } from "../context";
import { CarouselSection } from "./sections/CarouselSection.client";
import { WysiwygSection } from "./sections/WysiwygSection";

export const DroppableEditor = () => {
  const { sections, addSection } = useContext(EditorContext);
  const handleDragOver: DragEventHandler = function (ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
  };
  const handleDrop: DragEventHandler = function (ev) {
    ev.preventDefault();
    const itemType = ev.dataTransfer.getData("type");
    addSection(itemType);
  };

  return (
    <div
      className="flex flex-grow flex-col p-4 gap-4 h-full w-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {sections.map((section, index) => {
        return <EditorSection section={section} key={`${section}_${index}`} />;
      })}
    </div>
  );
};

type EditorSectionProps = {
  section: SectionDO;
};

function EditorSection({ section }: EditorSectionProps) {
  const { setEditing } = useContext(EditorContext);

  function onClick() {
    setEditing(section);
  }

  const onKeyUp: KeyboardEventHandler = function (e) {
    if (e.nativeEvent.key === "Enter") {
      setEditing(section);
    }
  };

  return (
    <div
      className="flex p-4 rounded border border-neutral-200"
      onClick={onClick}
      onKeyUp={onKeyUp}
      role="button"
      tabIndex={0}
    >
      {section.type === "text"
        ? <TextSection section={section as TextSectionDO} />
        : section.type === "image"
        ? <ImageSection section={section as ImageSectionDO} />
        : section.type === "carousel"
        ? <CarouselSection section={section as CarouselSectionDO} />
        : <WysiwygSection section={section as WysiwygSectionDO} />}
    </div>
  );
}
