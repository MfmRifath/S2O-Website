// Remove duplicate TermRepository interfaces and retain only one
package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TermRepository extends JpaRepository<Term, Long> {
    List<Term> findByYearYearId(Long yearId);
}
