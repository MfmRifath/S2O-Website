package com.S2O.webapp.services;

import com.S2O.webapp.RequesModal.ExamDTO;

import java.util.List;

public interface ExamService {
    List<ExamDTO> getAllExams();
    ExamDTO getExamById(Long id);
    ExamDTO saveExam(ExamDTO examDTO);
    void deleteExam(Long id);
}