package com.S2O.webapp.dao;


import com.S2O.webapp.Entity.Year;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface YearRepository extends JpaRepository<Year, Long> {


}
