import { type DragEventHandler } from "react";
import { useEditor } from "../hook";
import { ImageSectionDO, SectionDO, TextSectionDO } from "../model";
import { TextSection } from "./TextSection";
import { ImageSection } from "./ImageSection";

export const DroppableEditor = () => {
  const { sections, addSection } = useEditor();
  const handleDragOver: DragEventHandler = function (ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
  };
  // const handleDragLeave: DragEventHandler = function (ev) {
  //   const itemType = ev.dataTransfer.getData("type");
  //   console.log("Drag leave: ", itemType);
  // };
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
      // onDragLeave={handleDragLeave}
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
  return (
    <div className="flex p-4 rounded border border-neutral-200 dark: border-neutral-700">
      {section.type === "text"
        ? <TextSection section={section as TextSectionDO} />
        : <ImageSection section={section as ImageSectionDO} />}
    </div>
  );
}
