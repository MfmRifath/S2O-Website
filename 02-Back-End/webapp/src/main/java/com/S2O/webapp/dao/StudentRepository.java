package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}