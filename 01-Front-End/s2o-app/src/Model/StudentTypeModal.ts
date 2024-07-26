import StudentModal from "./StudentModal";

class StudentTypeModal {
    studentTypeId :number;
    typeName:string;
    students  : StudentModal[];

    constructor(studentTypeId :number,
        typeName:string,
        students  : StudentModal[],
    ){
        this.studentTypeId=studentTypeId;
        this.typeName=typeName;
        this.students =students;
    }
}
export default StudentTypeModal;