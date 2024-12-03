package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Subject;
import com.S2O.webapp.RequesModal.SubjectDTO;
import com.S2O.webapp.dao.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SubjectServiceImpl implements SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;

    @Override
    public List<SubjectDTO> getAllSubjects() {
        return subjectRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public SubjectDTO getSubjectById(Long id) {
        return subjectRepository.findById(id).map(this::convertToDTO).orElse(null);
    }

    @Override
    public SubjectDTO saveSubject(SubjectDTO subjectDTO) {
        Subject subject = new Subject();
        subject.setName(subjectDTO.getName());
        subject.setStream(subjectDTO.getStream());

        Subject saved = subjectRepository.save(subject);
        return convertToDTO(saved);
    }

    @Override
    public void deleteSubject(Long id) {
        subjectRepository.deleteById(id);
    }

    private SubjectDTO convertToDTO(Subject subject) {
        SubjectDTO dto = new SubjectDTO();
        dto.setId(subject.getId());
        dto.setName(subject.getName());
        dto.setStream(subject.getStream());
        return dto;
    }
}