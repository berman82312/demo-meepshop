export type SectionDO =
  | TextSectionDO
  | ImageSectionDO
  | CarouselSectionDO
  | WysiwygSectionDO;

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

type CarouselImage = {
  id: string;
  url: string;
};
export interface CarouselSectionDO {
  id: string;
  type: "carousel";
  images: CarouselImage[];
}

export interface WysiwygSectionDO {
  id: string;
  type: "wysiwyg";
  content: string;
}

export abstract class EditorSection {
  id: string;
  constructor(id?: string) {
    this.id = id ?? Math.round(Math.random() * 1e16).toString();
  }

  updateField(name: string, value: unknown) {
    throw new Error(
      `Editor section must implement updateField method ${name} ${value}`,
    );
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

  updateField(name: string, value: unknown): void {
    if (name === "content" && typeof value === "string") {
      this.content = value;
    }
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
    this.width = options?.width ?? "402px";
    this.height = options?.height ?? "267px";
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

  updateField(name: string, value: unknown): void {
    if (name === "url" && typeof value === "string") {
      this.url = value;
    }
    if (name === "height" && typeof value === "string") {
      this.height = value;
    }
    if (name === "width" && typeof value === "string") {
      this.width = value;
    }
  }

  static fromDataObject(data: ImageSectionDO) {
    return new ImageSection(data.id, data);
  }
}

export class CarouselSection extends EditorSection {
  images: CarouselImage[];
  constructor(id?: string, options?: Partial<CarouselSectionDO>) {
    super(id);
    this.images = options?.images ?? [];
  }

  addImage() {
    this.images.push({
      url: "",
      id: Math.round(Math.random() * 1e16).toString(),
    });
  }

  editImage(id: string, url: string) {
    this.images.map((image) => {
      if (image.id === id) {
        image.url = url;
      }
      return image;
    });
  }

  removeImage(id: string) {
    this.images = this.images.filter((image) => image.id !== id);
  }

  updateField(name: string, value: unknown): void {
    if (name === "images" && Array.isArray(value)) {
      this.images = value;
    }
  }

  toDataObject(): CarouselSectionDO {
    return {
      type: "carousel",
      id: this.id,
      images: this.images,
    };
  }

  static fromDataObject(data: CarouselSectionDO) {
    return new CarouselSection(data.id, data);
  }
}

export class WysiwygSection extends EditorSection {
  content: string;
  constructor(id?: string, options?: Partial<WysiwygSectionDO>) {
    super(id);
    this.content = options?.content ?? "";
  }

  updateField(name: string, value: unknown): void {
    if (name === "content" && typeof value === "string") {
      this.content = value;
    }
  }

  toDataObject(): WysiwygSectionDO {
    return {
      type: "wysiwyg",
      id: this.id,
      content: this.content,
    };
  }

  static fromDataObject(data: WysiwygSectionDO) {
    return new WysiwygSection(data.id, data);
  }
}
