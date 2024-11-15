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

    // Getters and Setters
    public Long getTermId() {
        return termId;
    }

    public void setTermId(Long termId) {
        this.termId = termId;
    }

    public String getTermName() {
        return termName;
    }

    public void setTermName(String termName) {
        this.termName = termName;
    }

    public List<SubjectDTO> getSubjects() {
        return subjects;
    }

    public void setSubjects(List<SubjectDTO> subjects) {
        this.subjects = subjects;
    }
}
