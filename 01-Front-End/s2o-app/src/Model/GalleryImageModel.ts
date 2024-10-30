class GalleryImageModel {
  id: number;
  event: string;
  description?: string;
  date?: string;
  img: Array<File | string>; // Use File for uploads or string for URLs

  constructor(
    id: number,
    event: string,
    img: Array<File | string>,
    description?: string,
    date?: string
  ) {
    this.id = id;
    this.event = event;
    this.img = img;
    this.description = description;
    this.date = date;
  }
}

export default GalleryImageModel;
