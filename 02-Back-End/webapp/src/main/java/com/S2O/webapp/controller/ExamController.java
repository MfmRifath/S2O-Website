package com.S2O.webapp.controller;


import com.S2O.webapp.Entity.Exam;
import com.S2O.webapp.services.ExamService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/exams")
public class ExamController {
    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @GetMapping
    public List<Exam> getAllExams() {
        return examService.getAllExams();
    }

    @GetMapping("/{id}")
    public Exam getExamById(@PathVariable Long id) {
        return examService.getExamById(id);
    }

    @PostMapping
    public Exam createExam(@RequestBody Exam exam) {
        return examService.saveExam(exam);
    }

    @DeleteMapping("/{id}")
    public void deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
    }
}