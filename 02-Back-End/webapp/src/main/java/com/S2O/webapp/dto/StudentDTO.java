package com.S2O.webapp.dto;

import java.util.List;

public class StudentDTO {

    private Long studentId;
    private String studentName;
    private String stream;
    private YearDTO year;
    private List<TermDTO> terms; // New field for terms

    // Updated constructor to include terms
    public StudentDTO(Long studentId, String studentName, String stream, YearDTO year, List<TermDTO> terms) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.stream = stream;
        this.year = year;
        this.terms = terms;
    }

    // Getters and setters...
    public Long getStudentId() { return studentId; }
    public String getStudentName() { return studentName; }
    public String getStream() { return stream; }
    public YearDTO getYear() { return year; }
    public List<TermDTO> getTerms() { return terms; }

    public void setStudentId(Long studentId) { this.studentId = studentId; }
    public void setStudentName(String studentName) { this.studentName = studentName; }
    public void setStream(String stream) { this.stream = stream; }
    public void setYear(YearDTO year) { this.year = year; }
    public void setTerms(List<TermDTO> terms) { this.terms = terms; }
}
