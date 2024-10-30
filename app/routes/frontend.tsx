import { DragEventHandler } from "react";

export default function Page() {
  const handleDragStart: DragEventHandler = function(ev) {
    ev.dataTransfer.setData("type", (ev.target as HTMLDivElement).dataset?.type ?? '')
  }
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex items-center justify-center">
        <h2>Draggable</h2>
        <div 
          onDragStart={handleDragStart}
          className="flex items-center justify-center w-24 h-24 rounded border border-neutral-400"
          draggable
          data-type="image"
        >
          Image
        </div>
      </div>
      <div className="flex items-center justify-center">
        <h2>Droppable</h2>
      </div>
    </div>
  );
}
/