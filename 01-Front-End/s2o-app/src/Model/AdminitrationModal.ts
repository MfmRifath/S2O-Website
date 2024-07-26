import YearModal from "./YearModal";

class AdminitrationModal{
    adminId:number;
    designation:string;
    adminName: string;
    adminQualification: string;
    insta: string;
    LinkedIn: string;
    email: string;
    year: YearModal;
    adminImg?: string;

    constructor(adminId:number,
        designation:string,
        adminName: string,
        adminQualification: string,
        insta: string,
        LinkedIn: string,
        email: string,
        year: YearModal,
        adminImg: string){
            this.adminId=adminId;
            this.designation=designation;
            this.adminName=adminName;
            this.adminQualification=adminQualification;
            this.insta=insta;
            this.LinkedIn =LinkedIn;
            this.email=email;
            this.year=year;
            this.adminImg=adminImg;

    }


}
export default AdminitrationModal;