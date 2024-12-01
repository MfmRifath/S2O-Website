package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.dao.StudentRepository;
import com.amazonaws.services.cloudfront.model.EntityNotFoundException;
import com.amazonaws.services.shield.model.OptimisticLockException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ConcurrentModificationException;
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
        if (student.getName() == null || student.getName().isEmpty()) {
            throw new IllegalArgumentException("Student name cannot be null or empty");
        }
        if (student.getStream() == null) {
            throw new IllegalArgumentException("Stream cannot be null or empty");
        }
        return studentRepository.save(student);
    }

    // Get all students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(UUID id) {
        System.out.println("Fetching student with ID: " + id);

        // Log all stored UUIDs for comparison
        studentRepository.findAll().forEach(student ->
                System.out.println("Stored UUID: " + student.getId())
        );

        Optional<Student> student = studentRepository.findById(id);


        if (student.isPresent()) {
            System.out.println("Found student: " + student.get().getName());
        } else {
            System.out.println("Student not found with ID: " + id);
        }

        return student;
    }
    public List<Student> getStudentsByYear(int year) {
        return studentRepository.findByYear(year); // Assuming this method exists in repository
    }
    // Update a student
    @Transactional
    public Student updateStudent(UUID id, Student updatedStudent) {
        try {
            Student existingStudent = studentRepository.findById(id)
                    .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + id));

            existingStudent.setName(updatedStudent.getName());
            existingStudent.setStream(updatedStudent.getStream());
            existingStudent.setYear(updatedStudent.getYear());

            return studentRepository.save(existingStudent);
        } catch (OptimisticLockException e) {
            // Handle exception: retry or inform the user
            throw new ConcurrentModificationException("The student record was modified by another transaction.", e);
        }
    }
    // Delete a student
    public void deleteStudent(UUID id) {
        studentRepository.deleteById(id);
    }
}