import { ImageSection, SectionDO, TextSection } from "./model";

export function getSectionFromDO(sectionDO: SectionDO) {
  if (sectionDO.type === "image") {
    return ImageSection.fromDataObject(sectionDO);
  }
  if (sectionDO.type === "text") {
    return TextSection.fromDataObject(sectionDO);
  }
  return null;
}
