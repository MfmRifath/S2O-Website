package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.Entity.Year;
import com.S2O.webapp.dao.StudentRepository;
import com.S2O.webapp.dao.YearRepository;
import com.S2O.webapp.dto.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class StudentService {

    private static final Logger logger = LoggerFactory.getLogger(StudentService.class);

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private YearRepository yearRepository;
    public StudentService(StudentRepository studentRepository, YearRepository yearRepository) {
        this.studentRepository = studentRepository; this.yearRepository = yearRepository;

    }




    @Transactional
    public List<StudentDTO> getAllStudentsWithDetails() {
        return studentRepository.findAllWithYear().stream()
                .map(student -> {
                    List<TermDTO> termDTOs = Optional.ofNullable(student.getYear())
                            .map(year -> year.getTerms())
                            .orElse(Collections.emptyList())
                            .stream()
                            .map(term -> new TermDTO(
                                    term.getTermId(),
                                    term.getTermName(),
                                    Optional.ofNullable(term.getSubjects())
                                            .orElse(Collections.emptyList())
                                            .stream()
                                            .map(subject -> new SubjectDTO(
                                                    subject.getSubjectId(),
                                                    subject.getSubjectName(),
                                                    Optional.ofNullable(subject.getStudentMark())
                                                            .map(mark -> new StudentMarkDTO(
                                                                    mark.getMarkId(),
                                                                    mark.getMark()
                                                            )).orElse(null)
                                            )).collect(Collectors.toList())
                            )).collect(Collectors.toList());

                    YearDTO yearDTO = Optional.ofNullable(student.getYear())
                            .map(year -> new YearDTO(
                                    year.getYearId(),
                                    year.getYearValue()
                            )).orElse(null);

                    return new StudentDTO(
                            student.getStudentId(),
                            student.getStudentName(),
                            student.getStream(),
                            yearDTO,
                            termDTOs
                    );
                }).collect(Collectors.toList());
    }




    public Optional<Student> getStudentById(Long studentId) {
        return studentRepository.findById(studentId);
    }

    public Student saveStudent(Student student) {
        validateYear(student);

        // Retrieve and set the year for the student
        Year year = yearRepository.findById(student.getYear().getYearId())
                .orElseThrow(() -> new RuntimeException("Year with ID " + student.getYear().getYearId() + " not found."));
        student.setYear(year);

        return studentRepository.save(student);
    }

    public Student updateStudent(Long studentId, Student studentDetails) {
        validateYear(studentDetails);

        return studentRepository.findById(studentId)
                .map(student -> {
                    student.setStudentName(studentDetails.getStudentName());
                    student.setStream(studentDetails.getStream());

                    // Retrieve and set the updated year
                    Year year = yearRepository.findById(studentDetails.getYear().getYearId())
                            .orElseThrow(() -> new RuntimeException("Year with ID " + studentDetails.getYear().getYearId() + " not found."));
                    student.setYear(year);

                    return studentRepository.save(student);
                })
                .orElseThrow(() -> new RuntimeException("Student with ID " + studentId + " not found."));
    }

    public void deleteStudent(Long studentId) {
        studentRepository.deleteById(studentId);
    }

    private void validateYear(Student student) {
        if (student.getYear() == null || student.getYear().getYearId() <= 0) {
              throw new IllegalArgumentException("Year ID is missing or invalid.");
        }
    }
}
