package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.StudentMark;
import com.S2O.webapp.Service.StudentMarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/student-marks")
public class StudentMarkController {

    @Autowired
    private StudentMarkService studentMarkService;

    @GetMapping
    public List<StudentMark> getAllStudentMarks() {
        return studentMarkService.getAllStudentMarks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentMark> getStudentMarkById(@PathVariable int id) {
        return studentMarkService.getStudentMarkById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public StudentMark createStudentMark(@RequestBody StudentMark studentMark) {
        return studentMarkService.saveStudentMark(studentMark);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentMark> updateStudentMark(@PathVariable int id, @RequestBody StudentMark studentMarkDetails) {
        StudentMark updatedMark = studentMarkService.updateStudentMark(id, studentMarkDetails);
        return ResponseEntity.ok(updatedMark);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudentMark(@PathVariable int id) {
        studentMarkService.deleteStudentMark(id);
        return ResponseEntity.noContent().build();
    }
}
