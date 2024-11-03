import { useState } from "react";
import {
  CarouselSection,
  EditorSection,
  ImageSection,
  type SectionDO,
  TextSection,
  WysiwygSection,
} from "./model";
import { getSectionFromDO } from "./utils";

export function useEditor() {
  const [sections, setSections] = useState<SectionDO[]>([]);
  const [editingSectionId, setEditingSectionId] = useState("");

  const editingSection = sections.find((s) => s.id === editingSectionId);

  function addSection(type: string) {
    let newSection: EditorSection | null = null;
    if (type === "text") {
      newSection = new TextSection();
    }
    if (type === "image") {
      newSection = new ImageSection();
    }
    if (type === "carousel") {
      newSection = new CarouselSection();
    }
    if (type === "wysiwyg") {
      newSection = new WysiwygSection();
    }
    if (!newSection) {
      return;
    }
    setSections((prev) => prev.concat(newSection.toDataObject()));
  }

  function setEditing(section: SectionDO | null) {
    if (section === null) {
      setEditingSectionId("");
    } else {
      setEditingSectionId(section.id);
    }
  }

  function editSection(sectionDO: SectionDO, field: string, value: unknown) {
    const section = getSectionFromDO(sectionDO);
    if (!section) {
      return;
    }

    section.updateField(field, value);

    setSections((prev) =>
      prev.map((data) => {
        if (data.id !== section.id) {
          return data;
        }
        return section.toDataObject();
      })
    );
  }

  return {
    sections,
    editingSection,
    addSection,
    editSection,
    setEditing,
  };
}
