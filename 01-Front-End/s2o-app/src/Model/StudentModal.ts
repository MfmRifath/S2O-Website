import StudentTypeModal from "./StudentTypeModal";

class StudentModal{
  
  studentId: number;
  studentName: string;
  studentType? : StudentTypeModal;

  constructor(studentId: number,
    studentName: string,
    studenttype : StudentTypeModal,
  ){
    this.studentId=studentId;
    this.studentName=studentName;
    this.studentType=studenttype;
  }
}

export default StudentModal;