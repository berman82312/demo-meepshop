import { useContext } from "react";
import { EditorContext } from "features/editor/context";
import { Box, TextField } from "@mui/material";
import { ClearEditButton } from "features/editor/components/ResetEditing";

export function ImageEditor() {
  const { editingSection, editSection } = useContext(EditorContext);
  if (editingSection?.type !== "image") {
    return null;
  }

  function onEdit(field: string, value: unknown) {
    editSection(editingSection!, field, value);
  }

  return (
    <Box className="flex flex-col gap-4">
      <TextField
        fullWidth
        variant="outlined"
        label="url"
        value={editingSection.url}
        onChange={(e) => onEdit("url", e.target.value)}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="width"
        value={editingSection.width}
        onChange={(e) => onEdit("width", e.target.value)}
      />
      <TextField
        fullWidth
        variant="outlined"
        label="height"
        value={editingSection.height}
        onChange={(e) => onEdit("height", e.target.value)}
      />
      <ClearEditButton />
    </Box>
  );
}
