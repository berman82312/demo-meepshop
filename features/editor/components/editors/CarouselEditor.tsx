import { useContext } from "react";
import { EditorContext } from "../../context";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { ClearEditButton } from "../ResetEditing";
import { CarouselSection } from "features/editor/model";

export function CarouselEditor() {
  const { editingSection, editSection } = useContext(EditorContext);
  if (editingSection?.type !== "carousel") {
    return null;
  }

  function onEdit(field: string, id: string, value: string) {
    // @ts-expect-error is carousel
    const section = CarouselSection.fromDataObject(editingSection!);
    section.editImage(id, value);
    editSection(editingSection!, "images", section.toDataObject().images);
  }

  function addImage() {
    // @ts-expect-error is carousel
    const section = CarouselSection.fromDataObject(editingSection!);
    section.addImage();
    editSection(editingSection!, "images", section.toDataObject().images);
  }

  function removeImage(id: string) {
    // @ts-expect-error is carousel
    const section = CarouselSection.fromDataObject(editingSection!);
    section.removeImage(id);
    editSection(editingSection!, "images", section.toDataObject().images);
  }

  return (
    <Box className="flex flex-col gap-4">
      {editingSection.images.map((image) => (
        <TextField
          key={image.id}
          fullWidth
          variant="outlined"
          label="Content"
          value={image.url}
          onChange={(e) => onEdit("image", image.id, e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <IconButton onClick={() => removeImage(image.id)}>X</IconButton>
              ),
            },
          }}
        />
      ))}
      <Button variant="outlined" onClick={addImage}>+ Image</Button>
      <ClearEditButton />
    </Box>
  );
}
