package com.S2O.webapp.Service;

import com.S2O.webapp.Entity.Term;
import com.S2O.webapp.dao.TermRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TermService {

    @Autowired
    private TermRepository termRepository;

    public List<Term> getAllTerms() {
        return termRepository.findAll();
    }

    public Optional<Term> getTermById(int termId) {
        return termRepository.findById(termId);
    }

    public Term saveTerm(Term term) {
        return termRepository.save(term);
    }

    public Term updateTerm(int termId, Term termDetails) {
        return termRepository.findById(termId)
                .map(term -> {
                    term.setTermName(termDetails.getTermName());
                    term.setYear(termDetails.getYear());
                    term.setSubjects(termDetails.getSubjects());
                    return termRepository.save(term);
                })
                .orElseGet(() -> termRepository.save(termDetails));
    }

    public void deleteTerm(int termId) {
        termRepository.deleteById(termId);
    }
}
