package com.S2O.webapp.services;


import com.S2O.webapp.RequesModal.SubjectDTO;

import java.util.List;

public interface SubjectService {
    List<SubjectDTO> getAllSubjects();
    SubjectDTO getSubjectById(Long id);
    SubjectDTO saveSubject(SubjectDTO subjectDTO);
    void deleteSubject(Long id);
}