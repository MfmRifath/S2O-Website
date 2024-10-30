package com.S2O.webapp.Service;

import com.S2O.webapp.Entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private com.S2O.webapp.dao.StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(int studentId) {
        return studentRepository.findById(studentId);
    }

    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    public Student updateStudent(int studentId, Student studentDetails) {
        return studentRepository.findById(studentId)
                .map(student -> {
                    student.setStudentName(studentDetails.getStudentName());
                    student.setStream(studentDetails.getStream());
                    student.setYear(studentDetails.getYear());
                    return studentRepository.save(student);
                })
                .orElseGet(() -> studentRepository.save(studentDetails));
    }

    public void deleteStudent(int studentId) {
        studentRepository.deleteById(studentId);
    }
}
