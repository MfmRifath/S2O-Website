package Factory;

import com.S2O.webapp.dto.StudentInfoDto;

import java.util.List;
import java.util.UUID;

public interface StudentDataFactory {
    List<StudentInfoDto> getStudentInfo();
    StudentInfoDto getStudentInfoById(UUID studentId);
}