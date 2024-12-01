package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Exam;
import com.S2O.webapp.dto.ExamDto;
import com.S2O.webapp.services.ExamService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamService examService;

    public ExamController(ExamService examService) {
        this.examService = examService;
    }

    @GetMapping
    public ResponseEntity<List<ExamDto>> getAllExams() {
        List<ExamDto> exams = examService.getAllExams()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(exams);
    }

    @PostMapping
    public ResponseEntity<ExamDto> createExam(@RequestBody ExamDto examDto) {
        Exam exam = examService.saveExam(convertToEntity(examDto));
        return ResponseEntity.ok(convertToDto(exam));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        examService.deleteExam(id);
        return ResponseEntity.noContent().build();
    }

    // Convert DTO to Entity
    private Exam convertToEntity(ExamDto dto) {
        Exam exam = new Exam();
        exam.setId(dto.getId());
        exam.setName(dto.getName());
        exam.setTerm(dto.getTerm());
        exam.setYear(dto.getYear());
        return exam;
    }

    // Convert Entity to DTO
    private ExamDto convertToDto(Exam exam) {
        ExamDto dto = new ExamDto();
        dto.setId(exam.getId());
        dto.setName(exam.getName());
        dto.setTerm(exam.getTerm());
        dto.setYear(exam.getYear());
        return dto;
    }
}