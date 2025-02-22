package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Student;
import com.S2O.webapp.RequesModal.ExamDTO;
import com.S2O.webapp.RequesModal.MarkDTO;
import com.S2O.webapp.RequesModal.StudentDTO;
import com.S2O.webapp.RequesModal.SubjectDTO;
import com.S2O.webapp.dao.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;


    public Page<StudentDTO> getAllStudents(Pageable pageable) {
        return studentRepository.findAll(pageable)
                .map(this::convertToDTO);
    }



    public StudentDTO getStudentById(Long id) {
        return studentRepository.findById(id).map(this::convertToDTO).orElse(null);
    }


    public StudentDTO saveStudent(StudentDTO studentDTO) {
        Student student = new Student();
        student.setName(studentDTO.getName());
        student.setStream(studentDTO.getStream());
        student.setYear(studentDTO.getYear());
        student.setNic(studentDTO.getNic());
        Student saved = studentRepository.save(student);
        return convertToDTO(saved);
    }


    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    private StudentDTO convertToDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setName(student.getName());
        dto.setNic(student.getNic());
        dto.setStream(student.getStream());
        dto.setYear(student.getYear());

        // Convert marks list
        List<MarkDTO> markDTOs = student.getMarks().stream()
                .map(mark -> {
                    MarkDTO markDTO = new MarkDTO();
                    markDTO.setId(mark.getId());
                    markDTO.setMarks(mark.getMarks()); // Assuming `mark.getMarks()` returns the obtained marks
                    markDTO.setMaxMarks(mark.getMaxMarks()); // Assuming `mark.getMaxMarks()` returns the maximum marks

                    // Map related entities to their DTOs
                    StudentDTO studentDTO = new StudentDTO();
                    studentDTO.setId(mark.getStudent().getId());
                    studentDTO.setName(mark.getStudent().getName());
                    studentDTO.setNic(mark.getStudent().getNic());
                    studentDTO.setStream(mark.getStudent().getStream());
                    studentDTO.setYear(mark.getStudent().getYear());
                    markDTO.setStudentDTO(studentDTO);

                    SubjectDTO subjectDTO = new SubjectDTO();
                    subjectDTO.setId(mark.getSubject().getId());
                    subjectDTO.setName(mark.getSubject().getName());
                    markDTO.setSubjectDTO(subjectDTO);

                    ExamDTO examDTO = new ExamDTO();
                    examDTO.setId(mark.getExam().getId());
                    examDTO.setName(mark.getExam().getName());
                    examDTO.setDate(mark.getExam().getDate());
                    markDTO.setExamDTO(examDTO);

                    return markDTO;
                })
                .collect(Collectors.toList());

        dto.setMarks(markDTOs);
        return dto;
    }
}