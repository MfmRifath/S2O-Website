package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Mark;
import com.S2O.webapp.RequesModal.*;
import com.S2O.webapp.dao.ExamRepository;
import com.S2O.webapp.dao.MarkRepository;
import com.S2O.webapp.dao.StudentRepository;
import com.S2O.webapp.dao.SubjectRepository;
import com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MarkServiceImpl implements MarkService {

    @Autowired
    private MarkRepository markRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private ExamRepository examRepository;

    @Override
    public List<MarkDTO> getAllMarks() {
        return markRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public MarkDTO getMarkById(Long id) {
        return markRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }

    @Override
    public MarkDTO saveMark(MarkDTO markDTO) {
        Mark mark = new Mark();
        mark.setMarks(markDTO.getMarks());
        mark.setMaxMarks(markDTO.getMaxMarks());
        mark.setStudent(studentRepository.findById(markDTO.getStudentDTO().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found")));
        mark.setSubject(subjectRepository.findById(markDTO.getSubjectDTO().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found")));
        mark.setExam(examRepository.findById(markDTO.getExamDTO().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Exam not found")));

        Mark saved = markRepository.save(mark);
        return convertToDTO(saved);
    }

    @Override
    public void deleteMark(Long id) {
        markRepository.deleteById(id);
    }

    private MarkDTO convertToDTO(Mark mark) {
        MarkDTO dto = new MarkDTO();
        dto.setId(mark.getId());
        dto.setMarks(mark.getMarks());
        dto.setMaxMarks(mark.getMaxMarks());

        // Map Student entity to StudentDTO
        StudentDTO studentDTO = new StudentDTO();
        studentDTO.setId(mark.getStudent().getId());
        studentDTO.setName(mark.getStudent().getName());
        studentDTO.setStream(mark.getStudent().getStream());
        studentDTO.setYear(mark.getStudent().getYear());
        dto.setStudentDTO(studentDTO);

        // Map Subject entity to SubjectDTO
        SubjectDTO subjectDTO = new SubjectDTO();
        subjectDTO.setId(mark.getSubject().getId());
        subjectDTO.setName(mark.getSubject().getName());
        dto.setSubjectDTO(subjectDTO);

        // Map Exam entity to ExamDTO
        ExamDTO examDTO = new ExamDTO();
        examDTO.setId(mark.getExam().getId());
        examDTO.setName(mark.getExam().getName());
        dto.setExamDTO(examDTO);

        return dto;
    }

    private PerformanceDTO mapToPerformanceDTO(Mark mark) {
        PerformanceDTO performance = new PerformanceDTO();
        performance.setStudentId(mark.getStudent().getId());
        performance.setStudentName(mark.getStudent().getName());
        performance.setStream(mark.getStudent().getStream());
        performance.setSubjectId(mark.getSubject().getId());
        performance.setSubjectName(mark.getSubject().getName());
        performance.setExamId(mark.getExam().getId());
        performance.setExamName(mark.getExam().getName());
        performance.setMarks(mark.getMarks());
        performance.setMaxMarks(mark.getMaxMarks());
        performance.setPercentage((mark.getMarks() / mark.getMaxMarks()) * 100);
        return performance;
    }

    @Override
    public List<PerformanceDTO> calculatePerformance() {
        return markRepository.findAll().stream()
                .map(this::mapToPerformanceDTO)
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, List<PerformanceDTO>> calculatePerformanceByStream() {
        return markRepository.findAll().stream()
                .map(this::mapToPerformanceDTO)
                .collect(Collectors.groupingBy(PerformanceDTO::getStream));
    }

    @Override
    public List<SubjectPerformanceDTO> calculateOverallPerformanceBySubject() {
        List<Mark> marks = markRepository.findAll();

        Map<Long, List<Mark>> marksBySubject = marks.stream()
                .collect(Collectors.groupingBy(mark -> mark.getSubject().getId()));

        return marksBySubject.entrySet().stream()
                .map(entry -> {
                    Long subjectId = entry.getKey();
                    List<Mark> subjectMarks = entry.getValue();

                    double totalMarksObtained = subjectMarks.stream().mapToDouble(Mark::getMarks).sum();
                    double totalMaxMarks = subjectMarks.stream().mapToDouble(Mark::getMaxMarks).sum();
                    double averagePercentage = (totalMarksObtained / totalMaxMarks) * 100;

                    SubjectPerformanceDTO performance = new SubjectPerformanceDTO();
                    performance.setSubjectId(subjectId);
                    performance.setSubjectName(subjectMarks.isEmpty() ? "Unknown" : subjectMarks.get(0).getSubject().getName());
                    performance.setTotalMarksObtained(totalMarksObtained);
                    performance.setTotalMaxMarks(totalMaxMarks);
                    performance.setAveragePercentage(averagePercentage);

                    return performance;
                }).collect(Collectors.toList());
    }
}