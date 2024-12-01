package com.S2O.webapp.Factory;

import com.S2O.webapp.Entity.Stream;
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

    public StudentInfoDto addStudent(StudentInfoDto studentInfoDto) {
        Student student = new Student();
        student.setName(studentInfoDto.getStudentName());
        student.setStream(String.valueOf(Stream.valueOf(studentInfoDto.getStream()))); // Ensure this matches your Enum
        student.setYear(studentInfoDto.getYear());

        Student savedStudent = studentService.addStudent(student);
        return convertToDto(savedStudent);
    }

    public StudentInfoDto updateStudent(UUID studentId, StudentInfoDto studentInfoDto) {
        // Log the incoming studentId
        System.out.println("Updating Student with ID: " + studentId);

        // Fetch the existing student from the database
        Student student = studentService.getStudentById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + studentId));

        // Update the student entity
        student.setName(studentInfoDto.getStudentName());
        student.setStream(studentInfoDto.getStream()); // Assuming stream validation is handled elsewhere
        student.setYear(studentInfoDto.getYear());

        // Save the updated student
        Student updatedStudent = studentService.updateStudent(studentId, student);

        // Convert the updated entity back to DTO and return
        return convertToDto(updatedStudent);
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