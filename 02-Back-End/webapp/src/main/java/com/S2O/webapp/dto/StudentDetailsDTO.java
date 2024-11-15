// StudentDetailsDTO.java

import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.dto.StudentMarkDTO;
import com.S2O.webapp.dto.SubjectDTO;
import com.S2O.webapp.dto.TermDTO;
import com.S2O.webapp.dto.YearDTO;
import lombok.Data;

import java.util.stream.Collectors;

@Data
public class StudentDetailsDTO {
    private Long studentId;
    private String studentName;
    private String stream;
    private YearDTO year;

    public StudentDetailsDTO(Student student) {
        this.studentId = student.getStudentId();
        this.studentName = student.getStudentName();
        this.stream = student.getStream();

        if (student.getYear() != null) {
            this.year = new YearDTO(student.getYear().getYearId(), student.getYear().getYearValue(),
                    student.getYear().getTerms().stream()
                            .map(term -> new TermDTO(term.getTermId(), term.getTermName(),
                                    term.getSubjects().stream()
                                            .map(subject -> new SubjectDTO(subject.getSubjectId(), subject.getSubjectName(),
                                                    new StudentMarkDTO(subject.getStudentMark().getMarkId(), subject.getStudentMark().getMark())))
                                            .collect(Collectors.toList())))
                            .collect(Collectors.toList()));
        }
    }
}
