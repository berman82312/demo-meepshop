import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";
import { WysiwygSectionDO } from "../../model";
import { useContext } from "react";
import { EditorContext } from "features/editor/context";

type WysiwygSectionProps = {
  section: WysiwygSectionDO;
};
export const WysiwygSection = ({ section }: WysiwygSectionProps) => {
  const { editSection } = useContext(EditorContext);
  function onChange(e: ContentEditableEvent) {
    editSection(section, "content", e.target.value);
  }
  return <Editor value={section.content} onChange={onChange} />;
};
