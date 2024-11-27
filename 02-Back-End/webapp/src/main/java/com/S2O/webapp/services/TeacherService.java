package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Teacher;
import com.S2O.webapp.dao.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public TeacherService(TeacherRepository teacherRepository) {
        this.teacherRepository = teacherRepository;
    }

    public Teacher addTeacher(Teacher teacher) {
        return teacherRepository.save(teacher);
    }

    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    public Optional<Teacher> getTeacherById(UUID id) {
        return teacherRepository.findById(id);
    }

    public Teacher updateTeacher(UUID id, Teacher updatedTeacher) {
        return teacherRepository.findById(id)
                .map(teacher -> {
                    teacher.setName(updatedTeacher.getName());
                    teacher.setEmail(updatedTeacher.getEmail());
                    return teacherRepository.save(teacher);
                })
                .orElseThrow(() -> new IllegalArgumentException("Teacher not found with ID: " + id));
    }

    public void deleteTeacher(UUID id) {
        teacherRepository.deleteById(id);
    }
}