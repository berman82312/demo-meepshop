import { type DragEventHandler } from "react";

export const DroppableEditor = () => {
  const handleDragOver: DragEventHandler = function (ev) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "copy";
    const itemType = ev.dataTransfer.getData("type");
    console.log("Drag over: ", itemType);
  };
  const handleDragLeave: DragEventHandler = function (ev) {
    const itemType = ev.dataTransfer.getData("type");
    console.log("Drag leave: ", itemType);
  };
  const handleDrop: DragEventHandler = function (ev) {
    const itemType = ev.dataTransfer.getData("type");
    console.log("Drop: ", itemType);
  };
  return (
    <div
      className="flex flex-grow flex-col items-center justify-center h-full"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
    >
      <h2>Droppable</h2>
    </div>
  );
};
