import { Button } from "@mui/material";
import { Link } from "@remix-run/react";
import { type DragEventHandler } from "react";

export default function Page() {
  const handleDragStart: DragEventHandler = function (ev) {
    ev.dataTransfer.setData(
      "type",
      (ev.target as HTMLDivElement).dataset?.type ?? ""
    );
    ev.dataTransfer.dropEffect = "copy";
  };

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
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex w-1/3 lg:w-1/4 flex-col items-center bg-sky-100 h-full gap-4">
        <Link to="/">
          <Button variant="contained">
            Back to home
          </Button>
        </Link>
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
      <div
        className="flex flex-grow flex-col items-center justify-center bg-lime-100 h-full"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <h2>Droppable</h2>
      </div>
    </div>
  );
}
