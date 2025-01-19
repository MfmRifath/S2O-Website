package com.S2O.webapp.controller;

import com.S2O.webapp.RequesModal.StudentDTO;
import com.S2O.webapp.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    /**
     * Get all students with pagination.
     *
     * @param page The page number (default: 0).
     * @param size The page size (default: 10).
     * @return A paginated list of students.
     */
    @GetMapping
    public ResponseEntity<Page<StudentDTO>> getAllStudents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<StudentDTO> students = studentService.getAllStudents(PageRequest.of(page, size));
        return ResponseEntity.ok(students);
    }

    /**
     * Get a specific student by ID.
     *
     * @param id The student ID.
     * @return The student details.
     */
    @GetMapping("/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id) {
        StudentDTO student = studentService.getStudentById(id);
        return ResponseEntity.ok(student);
    }

    /**
     * Create a new student.
     *
     * @param studentDTO The student data.
     * @return The created student.
     */
    @PostMapping
    public ResponseEntity<StudentDTO> createStudent(@Valid @RequestBody StudentDTO studentDTO) {
        StudentDTO createdStudent = studentService.saveStudent(studentDTO);
        return ResponseEntity.status(201).body(createdStudent);
    }

    /**
     * Update an existing student by ID.
     *
     * @param id         The student ID.
     * @param studentDTO The updated student data.
     * @return The updated student.
     */
    @PutMapping("/{id}")
    public ResponseEntity<StudentDTO> updateStudent(
            @PathVariable Long id, @Valid @RequestBody StudentDTO studentDTO) {
        studentDTO.setId(id); // Ensure the ID matches
        StudentDTO updatedStudent = studentService.saveStudent(studentDTO);
        return ResponseEntity.ok(updatedStudent);
    }

    /**
     * Delete a student by ID.
     *
     * @param id The student ID.
     * @return No content on successful deletion.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
        return ResponseEntity.noContent().build();
    }
}