package Factory;

import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.dto.StudentInfoDto;
import com.S2O.webapp.services.StudentService;
import com.S2O.webapp.services.MarksService;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class StudentDataFactoryImpl implements StudentDataFactory {

    private final StudentService studentService;
    private final MarksService marksService;

    public StudentDataFactoryImpl(StudentService studentService, MarksService marksService) {
        this.studentService = studentService;
        this.marksService = marksService;
    }

    @Override
    public List<StudentInfoDto> getStudentInfo() {
        return studentService.getAllStudents().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public StudentInfoDto getStudentInfoById(UUID studentId) {
        return studentService.getStudentById(studentId)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));
    }

    private StudentInfoDto convertToDto(Student student) {
        StudentInfoDto dto = new StudentInfoDto();
        dto.setStudentId(student.getId());
        dto.setStudentName(student.getName());
        dto.setStream(student.getStream().toString());
        dto.setYear(student.getYear());

        dto.setExams(marksService.getMarksByStudent(student.getId()).stream()
                .map(mark -> {
                    StudentInfoDto.ExamInfo examInfo = new StudentInfoDto.ExamInfo();
                    examInfo.setExamType(mark.getExamType());
                    examInfo.setSubject(mark.getSubject());
                    examInfo.setMarks(mark.getMarks());
                    examInfo.setTerm("Term Example"); // Replace with actual term logic
                    examInfo.setYear(student.getYear());
                    return examInfo;
                })
                .collect(Collectors.toList()));

        return dto;
    }
}