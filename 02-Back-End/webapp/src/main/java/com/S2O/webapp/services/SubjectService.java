package com.S2O.webapp.Service;

import com.S2O.webapp.Entity.Subject;
import com.S2O.webapp.dao.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Optional<Subject> getSubjectById(int subjectId) {
        return subjectRepository.findById(subjectId);
    }

    public Subject saveSubject(Subject subject) {
        return subjectRepository.save(subject);
    }

    public Subject updateSubject(int subjectId, Subject subjectDetails) {
        return subjectRepository.findById(subjectId)
                .map(subject -> {
                    subject.setSubjectName(subjectDetails.getSubjectName());
                    subject.setTerm(subjectDetails.getTerm());
                    subject.setStudentMark(subjectDetails.getStudentMark());
                    return subjectRepository.save(subject);
                })
                .orElseGet(() -> subjectRepository.save(subjectDetails));
    }

    public void deleteSubject(int subjectId) {
        subjectRepository.deleteById(subjectId);
    }
}
