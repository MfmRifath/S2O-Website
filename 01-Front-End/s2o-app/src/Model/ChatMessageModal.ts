class ChatMessageModal{
    id:number;
    sender: string;
    reciver:string;
    content:string ;

    constructor(   id:number,
        sender:string,
        reciver:string,
        content:string){
this.id=id;
this.sender=sender;
this.reciver=reciver;
this.content=content
    }
}
export default ChatMessageModal;