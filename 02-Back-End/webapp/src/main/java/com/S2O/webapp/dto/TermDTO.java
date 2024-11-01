package com.S2O.webapp.dto;

import lombok.Data;

import java.util.List;
@Data
public class TermDTO {
    private Long termId;
    private String termName;
    private List<SubjectDTO> subjects;

    public TermDTO(Long termId, String termName, List<SubjectDTO> subjects) {
        this.termId = termId;
        this.termName = termName;
        this.subjects = subjects;
    }
// Constructor, getters, and setters
}
