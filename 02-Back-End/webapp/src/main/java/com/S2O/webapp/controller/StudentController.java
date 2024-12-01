package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Stream;
import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.dto.StudentDto;
import com.S2O.webapp.services.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping
    public ResponseEntity<StudentDto> addStudent(@RequestBody StudentDto studentDto) {
        Student student = studentService.addStudent(convertToEntity(studentDto));
        return ResponseEntity.ok(convertToDto(student));
    }

    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents() {
        List<StudentDto> students = studentService.getAllStudents()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(students);
    }

    @GetMapping("/year/{year}")
    public ResponseEntity<List<StudentDto>> getStudentsByYear(@PathVariable int year) {
        List<StudentDto> students = studentService.getStudentsByYear(year)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(students);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable UUID id, @RequestBody StudentDto studentDto) {
        Student updatedStudent = studentService.updateStudent(id, convertToEntity(studentDto));
        return ResponseEntity.ok(convertToDto(updatedStudent));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable UUID id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }

    // Convert DTO to Entity
    private Student convertToEntity(StudentDto dto) {
        Student student = new Student();
        student.setId(dto.getId());
        student.setName(dto.getStudentName());
        student.setStream(String.valueOf(Stream.valueOf(String.valueOf(dto.getStream())))); // Assuming Stream is an enum
        student.setYear(dto.getYear());
        return student;
    }

    // Convert Entity to DTO
    private StudentDto convertToDto(Student student) {
        StudentDto dto = new StudentDto();
        dto.setId(student.getId());
        dto.setStudentName(student.getName());
        dto.setStream(student.getStream().toString());
        dto.setYear(student.getYear());
        return dto;
    }
}