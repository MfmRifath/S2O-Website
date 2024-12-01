package com.S2O.webapp.Factory;

import com.S2O.webapp.dto.StudentInfoDto;

import java.util.List;
import java.util.UUID;

public interface StudentDataFactory {
    List<StudentInfoDto> getStudentInfo();
    StudentInfoDto getStudentInfoById(UUID studentId);
    StudentInfoDto addStudent(StudentInfoDto studentInfoDto);
    StudentInfoDto updateStudent(UUID studentId, StudentInfoDto studentInfoDto); // Add this line
}
