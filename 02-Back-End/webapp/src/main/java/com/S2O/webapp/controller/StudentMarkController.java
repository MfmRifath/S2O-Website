package com.S2O.webapp.controller;

import com.S2O.webapp.dto.StudentMarkDTO;
import com.S2O.webapp.services.StudentMarkService;
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
    public List<StudentMarkDTO> getAllStudentMarks() {
        return studentMarkService.getAllStudentMarks();
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentMarkDTO> getStudentMarkById(@PathVariable Long id) {
        StudentMarkDTO studentMarkDTO = studentMarkService.getStudentMarkById(id);
        return studentMarkDTO != null ? ResponseEntity.ok(studentMarkDTO) : ResponseEntity.notFound().build();
    }






    @PutMapping("/{id}")
    public ResponseEntity<StudentMarkDTO> updateStudentMark(@PathVariable Long id, @RequestBody StudentMarkDTO studentMarkDetails) {
        StudentMarkDTO updatedMark = studentMarkService.updateStudentMark(id, studentMarkDetails);
        return ResponseEntity.ok(updatedMark);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudentMark(@PathVariable Long id) {
        studentMarkService.deleteStudentMark(id);
        return ResponseEntity.noContent().build();
    }
}
