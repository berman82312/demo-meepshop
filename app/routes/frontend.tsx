import { Button, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import { DroppableEditor } from "features/editor/components/DroppableEditor";
import { type DragEventHandler } from "react";

export default function Page() {
  const handleDragStart: DragEventHandler = function (ev) {
    ev.dataTransfer.setData(
      "type",
      (ev.target as HTMLDivElement).dataset?.type ?? "",
    );
    ev.dataTransfer.dropEffect = "copy";
  };
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex w-1/3 lg:w-1/4 flex-col bg-sky-100 dark:bg-sky-900 h-full gap-4 p-4">
        <Link to="/">
          <Button variant="text">
            <Typography>
              Back to home
            </Typography>
          </Button>
        </Link>
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
      </div>
      <DroppableEditor />
    </div>
  );
}
