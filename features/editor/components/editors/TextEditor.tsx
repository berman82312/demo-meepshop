import { useContext } from "react";
import { EditorContext } from "../../context";
import { Box, TextField } from "@mui/material";
import { ClearEditButton } from "../ResetEditing";

export function TextEditor() {
  const { editingSection, editSection } = useContext(EditorContext);
  if (editingSection?.type !== "text") {
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
        label="Content"
        value={editingSection.content}
        onChange={(e) => onEdit("content", e.target.value)}
      />
      <ClearEditButton />
    </Box>
  );
}
