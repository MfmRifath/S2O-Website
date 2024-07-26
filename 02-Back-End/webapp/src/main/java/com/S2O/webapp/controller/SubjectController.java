package com.S2O.webapp.controller;


import com.S2O.webapp.Entity.Subject;
import com.S2O.webapp.dao.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/subjects")
public class SubjectController {

    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @PostMapping
    public Subject createSubject(@RequestBody Subject subject) {
        return subjectRepository.save(subject);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Subject> updateSubject(@PathVariable Long id, @RequestBody Subject subjectDetails) {
        return subjectRepository.findById(Math.toIntExact(id))
                .map(subject -> {
                    subject.setSubjectName(subjectDetails.getSubjectName());
                    Subject updatedSubject = subjectRepository.save(subject);
                    return ResponseEntity.ok(updatedSubject);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSubject(@PathVariable Long id) {
        return subjectRepository.findById(Math.toIntExact(id))
                .map(subject -> {
                    subjectRepository.delete(subject);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
