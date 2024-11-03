import { Box } from "@mui/material";
import { ClearEditButton } from "../ResetEditing";
import { useContext } from "react";
import { EditorContext } from "features/editor/context";

export function WysiwygEditor() {
  const { editingSection } = useContext(EditorContext);
  if (editingSection?.type !== "wysiwyg") {
    return null;
  }
  return (
    <Box className="flex flex-col gap-4">
      <ClearEditButton />
    </Box>
  );
}
