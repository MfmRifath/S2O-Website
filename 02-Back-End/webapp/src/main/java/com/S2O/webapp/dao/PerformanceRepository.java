package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PerformanceRepository extends JpaRepository<Performance, UUID> {

    // Custom query to find performance by student ID
    Optional<Performance> findByStudentId(UUID studentId);
}