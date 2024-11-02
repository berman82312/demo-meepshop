import { DragEventHandler, useContext } from "react";
import { EditorContext } from "../context";

export function SectionTool() {
  const { editingSection } = useContext(EditorContext);
  const handleDragStart: DragEventHandler = function (ev) {
    ev.dataTransfer.setData(
      "type",
      (ev.target as HTMLDivElement).dataset?.type ?? "",
    );
    ev.dataTransfer.dropEffect = "copy";
  };
  if (editingSection) {
    return null;
  }
  return (
    <div className="flex gap-4">
      <div
        onDragStart={handleDragStart}
        className="flex items-center justify-center w-24 h-24 rounded border border-neutral-400"
        draggable
        data-type="image"
      >
        Image
      </div>
      <div
        onDragStart={handleDragStart}
        className="flex items-center justify-center w-24 h-24 rounded border border-neutral-400"
        draggable
        data-type="text"
      >
        Text
      </div>
    </div>
  );
}
