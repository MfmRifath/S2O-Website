package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Subject;
import com.S2O.webapp.Entity.Term;
import com.S2O.webapp.dao.SubjectRepository;
import com.S2O.webapp.dao.TermRepository;
import com.amazonaws.services.cloudfront.model.EntityNotFoundException;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class TermService {

    @Autowired
    private TermRepository termRepository;
    @Autowired
    private SubjectRepository subjectRepository;

    @Transactional(readOnly = true)
    public List<Term> getAllTerms() {
        List<Term> terms = termRepository.findAll();
        terms.forEach(term -> Hibernate.initialize(term.getSubjects())); // Force initialization
        return terms;
    }
    @Transactional(readOnly = true)
    public Optional<Term> getTermById(Long termId) {
        Optional<Term> term = termRepository.findById(termId);
        term.ifPresent(t -> Hibernate.initialize(t.getSubjects())); // Ensure subjects are initialized
        return term;
    }

    @Transactional
    public List<Term> getTermsByYearId(Long yearId) {
        List<Term> terms = termRepository.findByYearYearId(yearId);
        terms.forEach(term -> Hibernate.initialize(term.getSubjects())); // Initialize subjects collection
        return terms;
    }
    public Term saveTerm(Term term) {
        return termRepository.save(term);
    }

    public Term updateTerm(Long termId, Term termDetails) {
        return termRepository.findById(termId)
                .map(term -> {
                    term.setTermName(termDetails.getTermName());
                    // update any other fields as needed
                    return termRepository.save(term);
                })
                .orElseThrow(() -> new EntityNotFoundException("Term not found with id: " + termId));
    }

    public void deleteTerm(Long termId) {
        Term term = termRepository.findById(termId)
                .orElseThrow(() -> new EntityNotFoundException("Term not found with id: " + termId));

        // Delete all subjects associated with this term
        for (Subject subject : term.getSubjects()) {
            subjectRepository.delete(subject);
        }

        termRepository.delete(term);
    }

}
