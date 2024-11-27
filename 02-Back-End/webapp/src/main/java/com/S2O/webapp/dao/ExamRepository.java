// Remove duplicate TermRepository interfaces and retain only one
package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Exam;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Long> {}