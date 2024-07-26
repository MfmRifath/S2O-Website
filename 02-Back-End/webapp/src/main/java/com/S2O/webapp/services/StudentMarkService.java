package com.S2O.webapp.services;

import com.S2O.webapp.Entity.*;
import com.S2O.webapp.dao.*;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentMarkService {
    private final StudentMarkRepository studentMarkRepository;
    private final StudentRepository studentRepository;
    private final SubjectRepository subjectRepository;
    private final TermRepository termRepository;
    private final YearRepository yearRepository;

    public StudentMarkService(StudentMarkRepository studentMarkRepository, StudentRepository studentRepository,
                              SubjectRepository subjectRepository, TermRepository termRepository, YearRepository yearRepository) {
        this.studentMarkRepository = studentMarkRepository;
        this.studentRepository = studentRepository;
        this.subjectRepository = subjectRepository;
        this.termRepository = termRepository;
        this.yearRepository = yearRepository;
    }

    public List<StudentMark> getAllStudentMarks() {
        return studentMarkRepository.findAll();
    }

    public StudentMark getStudentMarkById(int id) {
        return studentMarkRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StudentMark not found"));
    }

    public StudentMark createStudentMark(StudentMark studentMark) {
        Student student = studentRepository.findById((long) studentMark.getStudent().getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Subject subject = subjectRepository.findById(studentMark.getSubject().getSubjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        Term term = termRepository.findById(studentMark.getTerm().getTermId())
                .orElseThrow(() -> new ResourceNotFoundException("Term not found"));
        Year year = yearRepository.findById(studentMark.getYear().getYearId())
                .orElseThrow(() -> new ResourceNotFoundException("Year not found"));
        studentMark.setStudent(student);
        studentMark.setSubject(subject);
        studentMark.setTerm(term);
        studentMark.setYear(year);
        return studentMarkRepository.save(studentMark);
    }

    public StudentMark updateStudentMark(int id, StudentMark studentMarkDetails) {
        StudentMark studentMark = studentMarkRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StudentMark not found"));
        Student student = studentRepository.findById((long) studentMarkDetails.getStudent().getStudentId())
                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));
        Subject subject = subjectRepository.findById(studentMarkDetails.getSubject().getSubjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        Term term = termRepository.findById(studentMarkDetails.getTerm().getTermId())
                .orElseThrow(() -> new ResourceNotFoundException("Term not found"));
        Year year = yearRepository.findById(studentMarkDetails.getYear().getYearId())
                .orElseThrow(() -> new ResourceNotFoundException("Year not found"));
        studentMark.setStudent(student);
        studentMark.setSubject(subject);
        studentMark.setTerm(term);
        studentMark.setYear(year);
        studentMark.setMark(studentMarkDetails.getMark());
        return studentMarkRepository.save(studentMark);
    }

    public void deleteStudentMark(int id) {
        StudentMark studentMark = studentMarkRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("StudentMark not found"));
        studentMarkRepository.delete(studentMark);
    }
}
