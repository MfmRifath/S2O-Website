package com.S2O.webapp.services;

import com.S2O.webapp.Entity.StudentType;
import com.S2O.webapp.dao.StudentTypeRepository;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentTypeService {
    private final StudentTypeRepository studentTypeRepository;

    public StudentTypeService(StudentTypeRepository studentTypeRepository) {
        this.studentTypeRepository = studentTypeRepository;
    }

    public List<StudentType> getAllStudentTypes() {
        return studentTypeRepository.findAll();
    }

    public StudentType getStudentTypeById(int id) {
        return studentTypeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StudentType not found"));
    }

    public StudentType createStudentType(StudentType studentType) {
        return studentTypeRepository.save(studentType);
    }

    public StudentType updateStudentType(int id, StudentType studentTypeDetails) {
        StudentType studentType = studentTypeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StudentType not found"));
        studentType.setTypeName(studentTypeDetails.getTypeName());
        return studentTypeRepository.save(studentType);
    }

    public void deleteStudentType(int id) {
        StudentType studentType = studentTypeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StudentType not found"));
        studentTypeRepository.delete(studentType);
    }
}
