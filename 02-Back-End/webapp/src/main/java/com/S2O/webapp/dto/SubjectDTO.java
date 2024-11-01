package com.S2O.webapp.dto;

public class SubjectDTO {
    private Long subjectId;
    private String subjectName;

    public SubjectDTO(Long subjectId, String subjectName) {
        this.subjectId = subjectId;
        this.subjectName = subjectName;
    }
}