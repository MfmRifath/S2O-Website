class GalleryImageModel{
  id: number;
  event: string;
  description?: string;
  date?: string;
  img?:string;
  img1?:string;
  img2?:string;
  img3?:string;
  img4?:string;
  img5?:string;
  

  constructor(id: number,
    event: string,
    description: string,
    date: string,
    img:string,
    img1:string,
    img2:string,
    img3:string,
    img4:string,
    img5?:string){
      this.id=id;
      this.event=event;
      this.description =description;
      this.date=date;
      this.img=img;
      this.img1=img1;
      this.img2=img2;
      this.img3=img3;
      this.img4 =img4;
      this.img5=img5;
      
    }
}


export default GalleryImageModel;