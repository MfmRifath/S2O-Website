package com.S2O.webapp.controller;



import com.S2O.webapp.Entity.Marks;
import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.dto.MarksDto;
import com.S2O.webapp.services.MarksService;
import com.S2O.webapp.services.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/marks")
public class MarksController {

    private final MarksService marksService;
    private final StudentService studentService;

    public MarksController(MarksService marksService, StudentService studentService) {
        this.marksService = marksService;
        this.studentService = studentService;
    }

    @PostMapping("/marks")
    public ResponseEntity<Marks> addMarks(@RequestBody MarksDto marksDto) {
        Marks marks = new Marks();
        marks.setExamType(marksDto.getExamType());
        marks.setMarks(marksDto.getMarks());
        marks.setSubject(marksDto.getSubject());

        Marks savedMarks = marksService.saveMarks(marksDto.getStudentId(), marks);
        return ResponseEntity.ok(savedMarks);
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<List<Marks>> getMarksByStudent(@PathVariable UUID studentId) {
        List<Marks> marksList = marksService.getMarksByStudent(studentId);
        return ResponseEntity.ok(marksList);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Marks> updateMarks(@PathVariable UUID id, @RequestBody Marks updatedMarks) {
        Marks marks = marksService.updateMarks(id, updatedMarks);
        return ResponseEntity.ok(marks);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMarks(@PathVariable UUID id) {
        marksService.deleteMarks(id);
        return ResponseEntity.noContent().build();
    }
}