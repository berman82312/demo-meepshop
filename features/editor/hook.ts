import { useState } from "react";
import { EditorSection, ImageSection, SectionDO, TextSection } from "./model";

export function useEditor() {
  const [sections, setSections] = useState<SectionDO[]>([]);

  function addSection(type: string) {
    let newSection: EditorSection | null = null;
    if (type === "text") {
      newSection = new TextSection();
    }
    if (type === "image") {
      newSection = new ImageSection();
    }
    if (!newSection) {
      return;
    }
    setSections((prev) => prev.concat(newSection.toDataObject()));
  }

  return {
    sections,
    addSection,
  };
}
