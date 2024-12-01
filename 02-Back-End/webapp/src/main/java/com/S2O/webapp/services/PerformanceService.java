package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Performance;
import com.S2O.webapp.Entity.Stream;
import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.dao.PerformanceRepository;
import com.S2O.webapp.services.StudentService;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class PerformanceService {

    private final PerformanceRepository performanceRepository;
    private final StudentService studentService;

    public PerformanceService(PerformanceRepository performanceRepository, StudentService studentService) {
        this.performanceRepository = performanceRepository;
        this.studentService = studentService;
    }

    // Calculate and save performance
    public Performance calculatePerformance(UUID studentId) {
        Student student = studentService.getStudentById(studentId)
                .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + studentId));

        // Example logic: fetch marks, calculate average and count
        float averageMarks = 75.0f;  // Placeholder calculation
        int examCount = 5;           // Placeholder count

        Performance performance = new Performance();
        performance.setStudent(student);
        performance.setAverageMarks(averageMarks);
        performance.setExamCount(examCount);
        performance.setStream(Stream.valueOf(student.getStream()));

        return performanceRepository.save(performance);
    }

    // Get performance by student
    public Optional<Performance> getPerformanceByStudent(UUID studentId) {
        return performanceRepository.findByStudentId(studentId);
    }
}