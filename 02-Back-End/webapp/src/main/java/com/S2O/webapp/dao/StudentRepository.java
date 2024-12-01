package com.S2O.webapp.dao;


import com.S2O.webapp.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface StudentRepository extends JpaRepository<Student, UUID> {

    // Custom query to find students by stream
    List<Student> findByYear(int year);

    // Custom query to find students by year

}