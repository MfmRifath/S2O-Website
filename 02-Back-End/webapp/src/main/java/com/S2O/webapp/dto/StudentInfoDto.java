package com.S2O.webapp.dto;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class StudentInfoDto {
    private UUID studentId;
    private String studentName;
    private String stream;
    private int year;
    private List<ExamInfo> exams;

    @Data
    public static class ExamInfo {
        private String examType;
        private String subject;
        private int marks;
        private String term;
        private int year;
    }
}