package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Term;
import com.S2O.webapp.dao.TermRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TermService {
    private final TermRepository termRepository;

    public TermService(TermRepository termRepository) {
        this.termRepository = termRepository;
    }

    public List<Term> getAllTerms() {
        return termRepository.findAll();
    }

    public Term getTermById(int id) {
        return termRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Term not found"));
    }

    public Term createTerm(Term term) {
        return termRepository.save(term);
    }

    public Term updateTerm(int id, Term termDetails) {
        Term term = termRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Term not found"));
        term.setTermName(termDetails.getTermName());
        return termRepository.save(term);
    }

    public void deleteTerm(int id) {
        Term term = termRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Term not found"));
        termRepository.delete(term);
    }
}
