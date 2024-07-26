package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.Entity.StudentType;
import com.S2O.webapp.dao.StudentRepository;
import com.S2O.webapp.dao.StudentTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final StudentTypeRepository studentTypeRepository;

    public StudentService(StudentRepository studentRepository, StudentTypeRepository studentTypeRepository) {
        this.studentRepository = studentRepository;
        this.studentTypeRepository = studentTypeRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id " + id));
    }

    public Student createStudent(Student student) {
        StudentType studentType = studentTypeRepository.findById(student.getStudentType().getStudentTypeId())
                .orElseThrow(() -> new RuntimeException("StudentType not found with id " + student.getStudentType().getStudentTypeId()));
        student.setStudentType(studentType);
        return studentRepository.save(student);
    }

    public Student updateStudent(Long id, Student studentDetails) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id " + id));
        StudentType studentType = studentTypeRepository.findById(studentDetails.getStudentType().getStudentTypeId())
                .orElseThrow(() -> new RuntimeException("StudentType not found with id " + studentDetails.getStudentType().getStudentTypeId()));
        student.setStudentName(studentDetails.getStudentName());
        student.setStudentType(studentType);
        return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id " + id));
        studentRepository.delete(student);
    }
}
