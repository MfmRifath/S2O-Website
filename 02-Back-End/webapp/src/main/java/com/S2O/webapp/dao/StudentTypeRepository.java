package com.S2O.webapp.dao;


import com.S2O.webapp.Entity.StudentType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentTypeRepository extends JpaRepository<StudentType, Integer> {
}
