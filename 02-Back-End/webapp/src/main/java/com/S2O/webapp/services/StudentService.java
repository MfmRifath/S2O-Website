package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.dao.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Add a new student
    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get a student by ID
    public Optional<Student> getStudentById(UUID id) {
        return studentRepository.findById(id);
    }
    public List<Student> getStudentsByYear(int year) {
        return studentRepository.findByYear(year); // Assuming this method exists in repository
    }
    // Update a student
    public Student updateStudent(UUID id, Student updatedStudent) {
        return studentRepository.findById(id)
                .map(student -> {
                    student.setName(updatedStudent.getName());
                    student.setStream(updatedStudent.getStream());
                    student.setYear(updatedStudent.getYear());
                    return studentRepository.save(student);
                })
                .orElseThrow(() -> new IllegalArgumentException("Student not found with ID: " + id));
    }

    // Delete a student
    public void deleteStudent(UUID id) {
        studentRepository.deleteById(id);
    }
}