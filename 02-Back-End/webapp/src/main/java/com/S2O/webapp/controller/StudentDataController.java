package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Stream;
import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.Factory.StudentDataFactory;
import com.S2O.webapp.Factory.StudentDataFactoryImpl;
import com.S2O.webapp.dto.StudentDto;
import com.S2O.webapp.dto.StudentInfoDto;
import com.S2O.webapp.services.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/student-data")
public class StudentDataController {

    private final StudentDataFactory studentDataFactory;
    private final StudentService studentService;

    public StudentDataController(StudentDataFactory studentDataFactory, StudentService studentService, StudentDataFactoryImpl studentDataFactoryImpl) {
        this.studentDataFactory = studentDataFactory;
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<StudentInfoDto>> getAllStudentInfo() {
        return ResponseEntity.ok(studentDataFactory.getStudentInfo());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentInfoDto> getStudentInfoById(@PathVariable UUID id) {
        return ResponseEntity.ok(studentDataFactory.getStudentInfoById(id));
    }
    @PostMapping
    public ResponseEntity<StudentInfoDto> addStudent(@RequestBody StudentInfoDto studentInfoDto) {
        // Delegate the call to the factory
        StudentInfoDto savedStudent = studentDataFactory.addStudent(studentInfoDto);
        return ResponseEntity.ok(savedStudent);
    }
    @PutMapping("/{id}")
    public ResponseEntity<StudentInfoDto> updateStudent(@PathVariable UUID id, @RequestBody StudentInfoDto studentInfoDto) {
        StudentInfoDto updatedStudent = studentDataFactory.updateStudent(id, studentInfoDto);
        return ResponseEntity.ok(updatedStudent);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable UUID id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}