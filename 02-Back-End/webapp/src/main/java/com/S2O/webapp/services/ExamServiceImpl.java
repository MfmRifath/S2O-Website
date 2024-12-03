package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Exam;
import com.S2O.webapp.RequesModal.ExamDTO;
import com.S2O.webapp.dao.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExamServiceImpl implements ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Override
    public List<ExamDTO> getAllExams() {
        return examRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public ExamDTO getExamById(Long id) {
        return examRepository.findById(id).map(this::convertToDTO).orElse(null);
    }

    @Override
    public ExamDTO saveExam(ExamDTO examDTO) {
        Exam exam = new Exam();
        exam.setName(examDTO.getName());
        exam.setDate(examDTO.getDate());

        Exam saved = examRepository.save(exam);
        return convertToDTO(saved);
    }

    @Override
    public void deleteExam(Long id) {
        examRepository.deleteById(id);
    }

    private ExamDTO convertToDTO(Exam exam) {
        ExamDTO dto = new ExamDTO();
        dto.setId(exam.getId());
        dto.setName(exam.getName());
        dto.setDate(exam.getDate());
        return dto;
    }
}