import { createContext, ReactNode } from "react";
import { useEditor } from "./hook";
import { SectionDO } from "./model";

export const EditorContext = createContext<
  {
    sections: SectionDO[];
    editingSection: SectionDO | null | undefined;
    addSection: (type: string) => void;
    editSection: (section: SectionDO, field: string, value: unknown) => void;
    setEditing: (section: SectionDO | null) => void;
  }
>({
  sections: [],
  editingSection: null,
  addSection: () => {},
  editSection: () => {},
  setEditing: () => {},
});

type EditorContextProviderProps = {
  children: ReactNode;
};

export const EditorContextProvider = (
  { children }: EditorContextProviderProps,
) => {
  const editor = useEditor();
  return (
    <EditorContext.Provider value={editor}>
      {children}
    </EditorContext.Provider>
  );
};
