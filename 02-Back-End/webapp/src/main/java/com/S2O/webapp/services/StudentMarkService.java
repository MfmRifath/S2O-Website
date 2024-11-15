package com.S2O.webapp.services;

import com.S2O.webapp.Entity.StudentMark;
import com.S2O.webapp.dao.StudentMarkRepository;
import com.S2O.webapp.dao.SubjectRepository;
import com.S2O.webapp.dto.StudentMarkDTO;
import com.amazonaws.services.cloudfront.model.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentMarkService {

    @Autowired
    private StudentMarkRepository studentMarkRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    // Retrieve all student marks
    public List<StudentMarkDTO> getAllStudentMarks() {
        return studentMarkRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Retrieve a specific student mark by ID
    public StudentMarkDTO getStudentMarkById(Long id) {
        return studentMarkRepository.findById(id)
                .map(this::convertToDTO)
                .orElse(null);
    }




    // Update an existing student mark by ID
    public StudentMarkDTO updateStudentMark(Long id, StudentMarkDTO studentMarkDTO) {
        StudentMark studentMark = studentMarkRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Student mark not found"));
        studentMark.setMark(studentMarkDTO.getMark());
        studentMarkRepository.save(studentMark);
        return convertToDTO(studentMark);
    }

    // Delete student mark by ID
    public void deleteStudentMark(Long id) {
        studentMarkRepository.deleteById(id);
    }

    // Helper method to convert entity to DTO
    private StudentMarkDTO convertToDTO(StudentMark studentMark) {
        return new StudentMarkDTO(
                studentMark.getMarkId(),
                studentMark.getMark()
        );
    }
}
