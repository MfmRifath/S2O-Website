class ArticleModal{
    articleId: number;
    author: string;
    title:string;
    authorQualification: string;
    content:string;
    date: Date;
    img: string;
    img1:string;
    img2:string;

    constructor(articleId: number,
        author: string,
        title:string,
        authorQualification: string,
        content:string,
        date: Date,
        img: string,
        img1:string,
        img2:string){
this.articleId=articleId;
this.author =author;
this.authorQualification =authorQualification;
this.content =content;
this.date =date;
this.img = img;
this.img1 =img1;
this.img2 = img2;
this.title = title;
    }

}
export default ArticleModal;