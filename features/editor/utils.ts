import {
  CarouselSection,
  ImageSection,
  SectionDO,
  TextSection,
  WysiwygSection,
} from "./model";

export function getSectionFromDO(sectionDO: SectionDO) {
  if (sectionDO.type === "image") {
    return ImageSection.fromDataObject(sectionDO);
  }
  if (sectionDO.type === "text") {
    return TextSection.fromDataObject(sectionDO);
  }
  if (sectionDO.type === "carousel") {
    return CarouselSection.fromDataObject(sectionDO);
  }
  if (sectionDO.type === "wysiwyg") {
    return WysiwygSection.fromDataObject(sectionDO);
  }
  return null;
}
