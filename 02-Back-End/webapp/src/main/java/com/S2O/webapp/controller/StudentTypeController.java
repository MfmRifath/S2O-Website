package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.StudentType;
import com.S2O.webapp.services.StudentTypeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/student-types")
public class StudentTypeController {
    private final StudentTypeService studentTypeService;

    public StudentTypeController(StudentTypeService studentTypeService) {
        this.studentTypeService = studentTypeService;
    }

    @GetMapping
    public List<StudentType> getAllStudentTypes() {
        return studentTypeService.getAllStudentTypes();
    }

    @GetMapping("/{id}")
    public StudentType getStudentTypeById(@PathVariable int id) {
        return studentTypeService.getStudentTypeById(id);
    }

    @PostMapping
    public StudentType createStudentType(@RequestBody StudentType studentType) {
        return studentTypeService.createStudentType(studentType);
    }

    @PutMapping("/{id}")
    public StudentType updateStudentType(@PathVariable int id, @RequestBody StudentType studentTypeDetails) {
        return studentTypeService.updateStudentType(id, studentTypeDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteStudentType(@PathVariable int id) {
        studentTypeService.deleteStudentType(id);
    }
}
