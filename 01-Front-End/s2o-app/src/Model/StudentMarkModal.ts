import StudentModal from "./StudentModal";
import SubjectModal from "./SubjectModal";
import TermModal from "./TermModal";
import YearModal from "./YearModal";

class StudentMarkModal {
    markId: number;
    mark: number;
    student : StudentModal;
    subject: SubjectModal;
    term: TermModal;
    year: YearModal;

    constructor(markId: number,
      mark: number,
      student : StudentModal,
      subject: SubjectModal,
      term: TermModal,
      year: YearModal){
 this.mark=mark;
 this.markId=markId;
 this.student=student;
 this.subject=subject;
 this.term=term;
 this.year=year;
    }
  }

  export default StudentMarkModal;