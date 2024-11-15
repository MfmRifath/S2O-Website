package com.S2O.webapp.services;

import com.S2O.webapp.Entity.StudentMark;
import com.S2O.webapp.Entity.Subject;
import com.S2O.webapp.dao.StudentMarkRepository;
import com.S2O.webapp.dao.SubjectRepository;
import com.S2O.webapp.dto.StudentMarkDTO;
import com.S2O.webapp.dto.SubjectDTO;
import com.amazonaws.services.cloudfront.model.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private StudentMarkRepository studentMarkRepository;

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }
    public List<Subject> getSubjectsByTermId(Long termId) {
        return subjectRepository.findByTermTermId(termId);
    }
    public Optional<Subject> getSubjectById(Long subjectId) {
        return subjectRepository.findById(subjectId);
    }

    public Subject saveSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public Subject updateSubject(Long subjectId, Subject subjectDetails) {
        return subjectRepository.findById(subjectId)
                .map(subject -> {
                    subject.setSubjectName(subjectDetails.getSubjectName());
                    subject.setTerm(subjectDetails.getTerm());
                    subject.setStudentMark(subjectDetails.getStudentMark());
                    return subjectRepository.save(subject);
                })
                .orElseGet(() -> subjectRepository.save(subjectDetails));
    }
    public SubjectDTO saveSubject(SubjectDTO subjectDTO) {
        Subject subject = new Subject();
        subject.setSubjectName(subjectDTO.getSubjectName());
        // Handle the student mark association if necessary
        Subject savedSubject = subjectRepository.save(subject);
        return new SubjectDTO(savedSubject.getSubjectId(), savedSubject.getSubjectName(), null); // Set studentMarkDTO as needed
    }

    public StudentMarkDTO addStudentMarkToSubject(Long subjectId, int mark) {
        // Find the subject by ID
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new EntityNotFoundException("Subject not found"));

        // Create and set up the StudentMark
        StudentMark studentMark = new StudentMark();
        studentMark.setMark(mark);
        studentMark.setSubject(subject); // Link StudentMark to Subject

        // Save the new StudentMark
        studentMark = studentMarkRepository.save(studentMark);

        // Convert to DTO and return
        return new StudentMarkDTO(studentMark.getMarkId(), studentMark.getMark());
    }


    public void deleteSubject(Long subjectId) {
        subjectRepository.deleteById(subjectId);
    }

}
