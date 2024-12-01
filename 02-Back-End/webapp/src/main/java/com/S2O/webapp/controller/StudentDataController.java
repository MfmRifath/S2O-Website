package com.S2O.webapp.controller;

import com.S2O.webapp.dto.StudentInfoDto;
import com.S2O.webapp.factory.StudentDataFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/student-data")
public class StudentDataController {

    private final StudentDataFactory studentDataFactory;

    public StudentDataController(StudentDataFactory studentDataFactory) {
        this.studentDataFactory = studentDataFactory;
    }

    @GetMapping
    public ResponseEntity<List<StudentInfoDto>> getAllStudentInfo() {
        return ResponseEntity.ok(studentDataFactory.getStudentInfo());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentInfoDto> getStudentInfoById(@PathVariable UUID id) {
        return ResponseEntity.ok(studentDataFactory.getStudentInfoById(id));
    }
}