package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Marks;
import com.S2O.webapp.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface MarksRepository extends JpaRepository<Marks, UUID> {

    // Custom query to get all marks for a specific student
    List<Marks> findByStudentId(UUID studentId);

    // Custom query to get all marks for a specific subject
    List<Marks> findBySubject(String subject);
    List<Marks> findByStudent(Student student );
}