package com.S2O.webapp.services;


import com.S2O.webapp.RequesModal.StudentDTO;

import java.util.List;

public interface StudentService {
    List<StudentDTO> getAllStudents();
    StudentDTO getStudentById(Long id);
    StudentDTO saveStudent(StudentDTO studentDTO);
    void deleteStudent(Long id);
}