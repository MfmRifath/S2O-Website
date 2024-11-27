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
    images: Array<Image>,
    description?: string,
    date?: string
  ) {
    this.id = id;
    this.event = event;
    this.images = images;
    this.description = description;
    this.date = date;
  }
}

export default GalleryImageModel;