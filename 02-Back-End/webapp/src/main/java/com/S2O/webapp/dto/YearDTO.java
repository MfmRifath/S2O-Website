package com.S2O.webapp.dto;

import java.util.List;

public class YearDTO {
    private Long yearId;
    private Long yearValue;
    private List<TermDTO> terms;  // Optional terms list

    // Constructor without terms
    public YearDTO(Long yearId, Long yearValue) {
        this.yearId = yearId;
        this.yearValue = yearValue;
        this.terms = null; // Default to null if not provided
    }

    // Constructor with terms
    public YearDTO(Long yearId, Long yearValue, List<TermDTO> terms) {
        this.yearId = yearId;
        this.yearValue = yearValue;
        this.terms = terms;
    }

    // Getters and setters
    public Long getYearId() { return yearId; }
    public Long getYearValue() { return yearValue; }
    public List<TermDTO> getTerms() { return terms; }

    public void setYearId(Long yearId) { this.yearId = yearId; }
    public void setYearValue(Long yearValue) { this.yearValue = yearValue; }
    public void setTerms(List<TermDTO> terms) { this.terms = terms; }
}
