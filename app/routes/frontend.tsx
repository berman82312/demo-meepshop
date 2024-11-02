import { Button, Typography } from "@mui/material";
import { Link } from "@remix-run/react";
import { DroppableEditor } from "features/editor/components/DroppableEditor";
import { ImageEditor } from "features/editor/components/ImageEditor";
import { SectionTool } from "features/editor/components/SectionTools";
import { TextEditor } from "features/editor/components/TextEditor";
import { EditorContextProvider } from "features/editor/context";

export default function Page() {
  return (
    <EditorContextProvider>
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="flex w-1/3 lg:w-1/4 flex-col bg-sky-100 dark:bg-sky-900 h-full gap-4 p-4">
          <Link to="/">
            <Button variant="text">
              <Typography>
                Back to home
              </Typography>
            </Button>
          </Link>
          <SectionTool />
          <ImageEditor />
          <TextEditor />
        </div>
        <div className="h-full w-2/3 lg:w-3/4">
          <DroppableEditor />
        </div>
      </div>
    </EditorContextProvider>
  );
}
