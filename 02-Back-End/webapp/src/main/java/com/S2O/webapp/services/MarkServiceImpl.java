package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Mark;
import com.S2O.webapp.RequesModal.MarkDTO;
import com.S2O.webapp.RequesModal.PerformanceDTO;
import com.S2O.webapp.RequesModal.SubjectPerformanceDTO;
import com.S2O.webapp.dao.ExamRepository;
import com.S2O.webapp.dao.MarkRepository;
import com.S2O.webapp.dao.StudentRepository;
import com.S2O.webapp.dao.SubjectRepository;
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
        return markRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public MarkDTO getMarkById(Long id) {
        return markRepository.findById(id).map(this::convertToDTO).orElse(null);
    }

    @Override
    public MarkDTO saveMark(MarkDTO markDTO) {
        Mark mark = new Mark();
        mark.setMarks(markDTO.getMarks());
        mark.setMaxMarks(markDTO.getMaxMarks());
        mark.setStudent(studentRepository.findById(markDTO.getStudentId()).orElseThrow());
        mark.setSubject(subjectRepository.findById(markDTO.getSubjectId()).orElseThrow());
        mark.setExam(examRepository.findById(markDTO.getExamId()).orElseThrow());

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
        dto.setStudentName(mark.getStudent().getName());
        dto.setSubjectName(mark.getSubject().getName());
        dto.setExamName(mark.getExam().getName());
        return dto;
    }
    @Override
    public List<PerformanceDTO> calculatePerformance() {
        List<Mark> marks = markRepository.findAll(); // Fetch all marks

        return marks.stream().map(mark -> {
            PerformanceDTO performance = new PerformanceDTO();
            performance.setStudentId(mark.getStudent().getId());
            performance.setStudentName(mark.getStudent().getName());
            performance.setSubjectId(mark.getSubject().getId());
            performance.setSubjectName(mark.getSubject().getName());
            performance.setExamId(mark.getExam().getId());
            performance.setExamName(mark.getExam().getName());
            performance.setMarks(mark.getMarks());
            performance.setMaxMarks(mark.getMaxMarks());
            performance.setPercentage((mark.getMarks() / mark.getMaxMarks()) * 100);
            return performance;
        }).collect(Collectors.toList());
    }
    @Override
    public Map<String, List<PerformanceDTO>> calculatePerformanceByStream() {
        List<Mark> marks = markRepository.findAll(); // Fetch all marks

        return marks.stream().map(mark -> {
            PerformanceDTO performance = new PerformanceDTO();
            performance.setStudentId(mark.getStudent().getId());
            performance.setStudentName(mark.getStudent().getName());
            performance.setStream(mark.getStudent().getStream()); // Set the stream
            performance.setSubjectId(mark.getSubject().getId());
            performance.setSubjectName(mark.getSubject().getName());
            performance.setExamId(mark.getExam().getId());
            performance.setExamName(mark.getExam().getName());
            performance.setMarks(mark.getMarks());
            performance.setMaxMarks(mark.getMaxMarks());
            performance.setPercentage((mark.getMarks() / mark.getMaxMarks()) * 100);
            return performance;
        }).collect(Collectors.groupingBy(PerformanceDTO::getStream));
    }
    @Override
    public List<SubjectPerformanceDTO> calculateOverallPerformanceBySubject() {
        List<Mark> marks = markRepository.findAll();

        // Group marks by subject and calculate the performance
        Map<Long, List<Mark>> marksBySubject = marks.stream()
                .collect(Collectors.groupingBy(mark -> mark.getSubject().getId()));

        return marksBySubject.entrySet().stream().map(entry -> {
            Long subjectId = entry.getKey();
            List<Mark> subjectMarks = entry.getValue();

            double totalMarksObtained = subjectMarks.stream().mapToDouble(Mark::getMarks).sum();
            double totalMaxMarks = subjectMarks.stream().mapToDouble(Mark::getMaxMarks).sum();
            double averagePercentage = (totalMarksObtained / totalMaxMarks) * 100;

            SubjectPerformanceDTO performance = new SubjectPerformanceDTO();
            performance.setSubjectId(subjectId);
            performance.setSubjectName(subjectMarks.get(0).getSubject().getName()); // Assumes all marks belong to the same subject
            performance.setTotalMarksObtained(totalMarksObtained);
            performance.setTotalMaxMarks(totalMaxMarks);
            performance.setAveragePercentage(averagePercentage);

            return performance;
        }).collect(Collectors.toList());
    }
}