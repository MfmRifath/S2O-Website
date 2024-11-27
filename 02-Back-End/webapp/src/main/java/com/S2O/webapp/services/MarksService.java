package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Marks;
import com.S2O.webapp.Entity.Student;

import com.S2O.webapp.dao.MarksRepository;
import com.S2O.webapp.dao.StudentRepository;
import com.amazonaws.services.accessanalyzer.model.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MarksService {

    private final MarksRepository marksRepository;
    private final StudentRepository studentRepository;

    public MarksService(MarksRepository marksRepository, StudentRepository studentRepository) {
        this.marksRepository = marksRepository;
        this.studentRepository = studentRepository;
    }

    // Save marks for a student
    public Marks saveMarks(UUID studentId, Marks marks) {
        // Find the student by ID
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));

        // Set the student in the Marks entity
        marks.setStudent(student);

        // Save the Marks entity
        return marksRepository.save(marks);
    }

    // Other methods
    public List<Marks> getAllMarks() {
        return marksRepository.findAll();
    }

    public List<Marks> getMarksByStudent(UUID studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + studentId));
        return marksRepository.findByStudent(student);
    }

    public Marks updateMarks(UUID marksId, Marks updatedMarks) {
        Marks marks = marksRepository.findById(marksId)
                .orElseThrow(() -> new ResourceNotFoundException("Marks not found with id: " + marksId));

        marks.setMarks(updatedMarks.getMarks());
        marks.setExamType(updatedMarks.getExamType());
        marks.setSubject(updatedMarks.getSubject());

        return marksRepository.save(marks);
    }

    public void deleteMarks(UUID marksId) {
        Marks marks = marksRepository.findById(marksId)
                .orElseThrow(() -> new ResourceNotFoundException("Marks not found with id: " + marksId));
        marksRepository.delete(marks);
    }
}