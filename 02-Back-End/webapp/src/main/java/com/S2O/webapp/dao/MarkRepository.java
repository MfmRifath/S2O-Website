package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Mark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MarkRepository extends JpaRepository<Mark, Long> {

    // Get all distinct years
    @Query("SELECT DISTINCT m.student.year FROM Mark m")
    List<String> findAllDistinctYears();

    // Get all distinct subjects
    @Query("SELECT DISTINCT m.subject.name FROM Mark m")
    List<String> findAllDistinctSubjects();

    // Get all exams for a specific subject
    @Query("SELECT DISTINCT m.exam.name FROM Mark m WHERE m.subject.name = :subjectName")
    List<String> findAllExamsForSubject(String subjectName);

    // Get marks distribution for a specific subject, exam, and year
    List<Mark> findBySubject_NameAndExam_NameAndStudent_Year(String subjectName, String examName, String year);
}