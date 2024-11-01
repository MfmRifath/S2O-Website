package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.dao.YearRepository;
import com.S2O.webapp.dto.StudentDTO;
import com.S2O.webapp.dto.YearDTO;
import com.S2O.webapp.dto.YearWithStudentsDTO;
import com.S2O.webapp.services.StudentService;
import com.S2O.webapp.services.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private YearService yearService;

    @GetMapping
    public ResponseEntity<List<Student>> getAllYearsWithStudents() {
        List<Student> students = studentService.getAllStudents();
        return ResponseEntity.ok(students);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        return studentService.getStudentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createStudent(@RequestBody Student student) {
        if (student.getYear().getYearId() == null) {
            return ResponseEntity.badRequest().body("Year ID is required.");
        }
        try {
            Student savedStudent = studentService.saveStudent(student);
            return ResponseEntity.ok(savedStudent);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error saving student: " + e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable Long id, @RequestBody Student studentDetails) {
        Student updatedStudent = studentService.updateStudent(id, studentDetails);
        return ResponseEntity.ok(updatedStudent);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}
