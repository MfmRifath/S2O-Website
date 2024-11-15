package com.S2O.webapp.dto;

import lombok.Data;

@Data
public class SubjectDTO {
    private Long subjectId;
    private String subjectName;
    StudentMarkDTO studentMarkDTO;

    public SubjectDTO(Long subjectId, String subjectName, StudentMarkDTO studentMarkDTO) {
        this.subjectId = subjectId;
        this.subjectName = subjectName;
        this.studentMarkDTO = studentMarkDTO;
    }
}