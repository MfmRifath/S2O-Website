package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Exam;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    Optional<Exam> findByName(String name);
}