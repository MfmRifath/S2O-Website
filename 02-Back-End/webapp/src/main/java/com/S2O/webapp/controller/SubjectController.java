package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Subject;
import com.S2O.webapp.dto.StudentMarkDTO;
import com.S2O.webapp.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectService.getAllSubjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Subject> getSubjectById(@PathVariable Long id) {
        return subjectService.getSubjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Subject createSubject(@RequestBody Subject subject) {
        return subjectService.saveSubject(subject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subject> updateSubject(@PathVariable Long id, @RequestBody Subject subjectDetails) {
        Subject updatedSubject = subjectService.updateSubject(id, subjectDetails);
        return ResponseEntity.ok(updatedSubject);
    }

    @PostMapping("/{subjectId}/student-marks")
    public ResponseEntity<StudentMarkDTO> addStudentMark(
            @PathVariable Long subjectId,
            @RequestBody StudentMarkDTO studentMarkDTO) {

        System.out.println("Received Subject ID: " + subjectId);
        System.out.println("Received Mark Data: " + studentMarkDTO.getMark());

        // Call the service to save the mark for the specified subject
        StudentMarkDTO savedMark = subjectService.addStudentMarkToSubject(subjectId, studentMarkDTO.getMark());
        return ResponseEntity.ok(savedMark);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }
}
