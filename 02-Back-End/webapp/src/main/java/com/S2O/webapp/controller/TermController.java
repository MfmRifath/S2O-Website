package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Term;
import com.S2O.webapp.Service.TermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/terms")
public class TermController {

    @Autowired
    private TermService termService;

    @GetMapping
    public List<Term> getAllTerms() {
        return termService.getAllTerms();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Term> getTermById(@PathVariable int id) {
        return termService.getTermById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Term createTerm(@RequestBody Term term) {
        return termService.saveTerm(term);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Term> updateTerm(@PathVariable int id, @RequestBody Term termDetails) {
        Term updatedTerm = termService.updateTerm(id, termDetails);
        return ResponseEntity.ok(updatedTerm);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTerm(@PathVariable int id) {
        termService.deleteTerm(id);
        return ResponseEntity.noContent().build();
    }
}
