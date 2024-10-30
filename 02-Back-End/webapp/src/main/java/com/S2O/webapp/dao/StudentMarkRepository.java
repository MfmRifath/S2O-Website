package com.S2O.webapp.dao;


import com.S2O.webapp.Entity.StudentMark;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentMarkRepository extends JpaRepository<StudentMark, Integer> {
    Page<StudentMark> findAll(Pageable pageable);


}
