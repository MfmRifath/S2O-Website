class BookModal {
    id: number;
    title: string;
    author: string;
    coverImage: string;
    description: string;
    publisher: string;
    publicationDate: string;
    genre: string;
    pages: number;
   

    constructor(id: number,
        title: string,
        author: string,
        coverImage: string,
        description: string,
        publisher: string,
        publicationDate: string,
        genre: string,
        pages: number,
        readOnlineLink: string){
            this.id=id;
            this.title=title;
            this.author=author;
            this.coverImage =coverImage;
            this.description=description;
            this.publisher=publisher;
            this.publicationDate=publicationDate;
            this.genre=genre;
            this.pages=pages;
            
    }
    
  }
  export default BookModal;