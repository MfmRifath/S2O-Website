package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.StudentMark;
import com.S2O.webapp.services.StudentMarkService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/student-marks")
public class StudentMarkController {
    private final StudentMarkService studentMarkService;

    public StudentMarkController(StudentMarkService studentMarkService) {
        this.studentMarkService = studentMarkService;
    }

    @GetMapping
    public List<StudentMark> getAllStudentMarks() {
        return studentMarkService.getAllStudentMarks();
    }

    @GetMapping("/{id}")
    public StudentMark getStudentMarkById(@PathVariable int id) {
        return studentMarkService.getStudentMarkById(id);
    }

    @PostMapping
    public StudentMark createStudentMark(@RequestBody StudentMark studentMark) {
        return studentMarkService.createStudentMark(studentMark);
    }

    @PutMapping("/{id}")
    public StudentMark updateStudentMark(@PathVariable int id, @RequestBody StudentMark studentMarkDetails) {
        return studentMarkService.updateStudentMark(id, studentMarkDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteStudentMark(@PathVariable int id) {
        studentMarkService.deleteStudentMark(id);
    }
}
