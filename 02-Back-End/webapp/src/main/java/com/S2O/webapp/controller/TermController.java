package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Term;
import com.S2O.webapp.services.TermService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/terms")
public class TermController {
    private final TermService termService;

    public TermController(TermService termService) {
        this.termService = termService;
    }

    @GetMapping
    public List<Term> getAllTerms() {
        return termService.getAllTerms();
    }

    @GetMapping("/{id}")
    public Term getTermById(@PathVariable int id) {
        return termService.getTermById(id);
    }

    @PostMapping
    public Term createTerm(@RequestBody Term term) {
        return termService.createTerm(term);
    }

    @PutMapping("/{id}")
    public Term updateTerm(@PathVariable int id, @RequestBody Term termDetails) {
        return termService.updateTerm(id, termDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteTerm(@PathVariable int id) {
        termService.deleteTerm(id);
    }
}
