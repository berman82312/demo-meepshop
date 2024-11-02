import { Button } from "@mui/material";
import { useContext } from "react";
import { EditorContext } from "../context";

export function ClearEditButton() {
  const { setEditing } = useContext(EditorContext);
  return (
    <Button variant="outlined" onClick={() => setEditing(null)}>
      Show Tools
    </Button>
  );
}
