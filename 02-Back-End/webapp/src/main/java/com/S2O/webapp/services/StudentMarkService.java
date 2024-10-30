package com.S2O.webapp.Service;

import com.S2O.webapp.Entity.StudentMark;
import com.S2O.webapp.dao.StudentMarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentMarkService {

    @Autowired
    private StudentMarkRepository studentMarkRepository;

    public List<StudentMark> getAllStudentMarks() {
        return studentMarkRepository.findAll();
    }

    public Optional<StudentMark> getStudentMarkById(int markId) {
        return studentMarkRepository.findById(markId);
    }

    public StudentMark saveStudentMark(StudentMark studentMark) {
        return studentMarkRepository.save(studentMark);
    }

    public StudentMark updateStudentMark(int markId, StudentMark studentMarkDetails) {
        return studentMarkRepository.findById(markId)
                .map(mark -> {
                    mark.setMark(studentMarkDetails.getMark());
                    return studentMarkRepository.save(mark);
                })
                .orElseGet(() -> studentMarkRepository.save(studentMarkDetails));
    }

    public void deleteStudentMark(int markId) {
        studentMarkRepository.deleteById(markId);
    }
}
