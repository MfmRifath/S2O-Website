package com.S2O.webapp.dto;

import java.util.List;

public class TermDTO {
    private Long termId;
    private String termName;
    private List<SubjectDTO> subjects;

    public TermDTO(Long termId, String termName, List<SubjectDTO> subjects) {
        this.termId = termId;
        this.termName = termName;
        this.subjects = subjects;
    }
}