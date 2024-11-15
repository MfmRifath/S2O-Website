package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Subject;
import com.S2O.webapp.Entity.Term;
import com.S2O.webapp.services.SubjectService;
import com.S2O.webapp.services.TermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/terms")
public class TermController {

    @Autowired
    private TermService termService;

    @Autowired
    private SubjectService subjectService;
    @GetMapping
    public List<Term> getAllTerms() {
        return termService.getAllTerms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Term> getTermById(@PathVariable Long id) {
        return termService.getTermById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Term> createTerm(@RequestBody Term term) {
        try {
            Term createdTerm = termService.saveTerm(term);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTerm);
        } catch (Exception e) {
            e.printStackTrace(); // Log the full stack trace for debugging
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


    @GetMapping("/{termId}/subjects")
    public ResponseEntity<List<Subject>> getSubjectsByTermId(@PathVariable Long termId) {
        List<Subject> subjects = subjectService.getSubjectsByTermId(termId);
        return ResponseEntity.ok(subjects);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Term> updateTerm(@PathVariable Long id, @RequestBody Term termDetails) {
        Term updatedTerm = termService.updateTerm(id, termDetails);
        return ResponseEntity.ok(updatedTerm);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTerm(@PathVariable Long id) {
        termService.deleteTerm(id);
        return ResponseEntity.noContent().build();
    }

}
