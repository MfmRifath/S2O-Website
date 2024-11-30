class Image {
  id: number;
  url: string;
  keyName?: string; // Optional keyName property for S3 object keys
  file?: File;

  constructor(id: number, url: string, file?: File, keyName?: string) {
    this.id = id;
    this.url = url;
    this.file = file;
    this.keyName = keyName; // Initialize keyName if provided
  }
}

export default Image;