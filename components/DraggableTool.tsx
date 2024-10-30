import { DragEventHandler, ReactNode } from "react";

type DraggableToolProps = {
  onDragStart: DragEventHandler;
  children: ReactNode;
};

export function DraggableTool({ onDragStart, children }: DraggableToolProps) {
  return (
    <div
      onDragStart={onDragStart}
      className="flex items-center justify-center w-24 h-24 rounded border border-neutral-400"
      draggable
    >
      {children}
    </div>
  );
}
