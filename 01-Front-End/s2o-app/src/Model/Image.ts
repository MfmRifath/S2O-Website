class Image {
  id: number;
  url: string;
  file?: File;

  constructor(id: number, url: string, File?: File) {
    this.id = id;
    this.url = url;
    this.file = File;
  }
}
export default Image;
