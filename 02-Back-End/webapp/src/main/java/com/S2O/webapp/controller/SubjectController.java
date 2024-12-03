package com.S2O.webapp.controller;


import com.S2O.webapp.RequesModal.SubjectDTO;
import com.S2O.webapp.services.SubjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    /**
     * Get all subjects.
     */
    @GetMapping
    public ResponseEntity<List<SubjectDTO>> getAllSubjects() {
        List<SubjectDTO> subjects = subjectService.getAllSubjects();
        return ResponseEntity.ok(subjects);
    }

    /**
     * Get subject by ID.
     * @param id Subject ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<SubjectDTO> getSubjectById(@PathVariable Long id) {
        SubjectDTO subject = subjectService.getSubjectById(id);
        return subject != null ? ResponseEntity.ok(subject) : ResponseEntity.notFound().build();
    }

    /**
     * Create a new subject.
     * @param subjectDTO Subject data transfer object
     */
    @PostMapping
    public ResponseEntity<SubjectDTO> createSubject(@RequestBody SubjectDTO subjectDTO) {
        SubjectDTO savedSubject = subjectService.saveSubject(subjectDTO);
        return ResponseEntity.ok(savedSubject);
    }

    /**
     * Update an existing subject.
     * @param id Subject ID
     * @param subjectDTO Updated subject data
     */
    @PutMapping("/{id}")
    public ResponseEntity<SubjectDTO> updateSubject(@PathVariable Long id, @RequestBody SubjectDTO subjectDTO) {
        SubjectDTO existingSubject = subjectService.getSubjectById(id);
        if (existingSubject == null) {
            return ResponseEntity.notFound().build();
        }
        subjectDTO.setId(id); // Ensure the ID matches
        SubjectDTO updatedSubject = subjectService.saveSubject(subjectDTO);
        return ResponseEntity.ok(updatedSubject);
    }

    /**
     * Delete a subject by ID.
     * @param id Subject ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubject(@PathVariable Long id) {
        subjectService.deleteSubject(id);
        return ResponseEntity.noContent().build();
    }
}