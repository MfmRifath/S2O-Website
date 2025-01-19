package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByNameAndStream(String name, String stream);
}