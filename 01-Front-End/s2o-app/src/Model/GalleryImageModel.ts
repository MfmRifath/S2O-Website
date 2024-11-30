import Image from "./Image";

class GalleryImageModel {
  id: number;
  event: string;
  description?: string;
  date?: string;
  images: Array<Image>;

  constructor(
    id: number,
    event: string,
    images: Array<Image> = [], // Default to an empty array
    description: string = "", // Default to an empty string
    date: string = "" // Default to an empty string
  ) {
    this.id = id;
    this.event = event;
    this.images = images;
    this.description = description;
    this.date = date;
  }
}

export default GalleryImageModel;