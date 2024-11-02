export interface SectionDO {
  id: string;
  type: string;
}

export interface TextSectionDO {
  id: string;
  type: "text";
  content: string;
}

export interface ImageSectionDO {
  id: string;
  type: "image";
  url: string;
  width: string;
  height: string;
}

export abstract class EditorSection {
  id: string;
  constructor(id?: string) {
    this.id = id ?? Math.round(Math.random() * 1e16).toString();
  }

  toDataObject(): SectionDO {
    throw new Error("Editor section must implement toDataObject");
  }

  static fromDataObject(data: SectionDO): EditorSection {
    throw new Error(
      `Editor section must implement static fromDataObject ${data.id}`,
    );
  }
}

export class TextSection extends EditorSection {
  content: string;
  constructor(id?: string, options?: Partial<TextSectionDO>) {
    super(id);
    this.content = options?.content ?? "";
  }

  toDataObject(): TextSectionDO {
    return {
      type: "text",
      id: this.id,
      content: this.content,
    };
  }

  static fromDataObject(data: TextSectionDO) {
    return new TextSection(data.id, data);
  }
}

export class ImageSection extends EditorSection {
  url: string;
  width: string;
  height: string;
  constructor(id?: string, options?: Partial<ImageSectionDO>) {
    super(id);
    this.url = options?.url ?? "/sample.jpg";
    this.width = options?.width ?? "1340px";
    this.height = options?.height ?? "890px";
  }
  toDataObject(): ImageSectionDO {
    return {
      type: "image",
      id: this.id,
      url: this.url,
      width: this.width,
      height: this.height,
    };
  }

  static fromDataObject(data: ImageSectionDO) {
    return new ImageSection(data.id, data);
  }
}
