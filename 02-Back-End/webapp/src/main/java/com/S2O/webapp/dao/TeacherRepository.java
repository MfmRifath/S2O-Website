package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TeacherRepository extends JpaRepository<Teacher, UUID> {

    // Custom query to find teacher by email
    Optional<Teacher> findByEmail(String email);
}