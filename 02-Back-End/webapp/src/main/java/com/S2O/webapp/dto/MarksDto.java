package com.S2O.webapp.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class MarksDto {
    private UUID id;
    private String examType;
    private int marks;
    private String subject;
    private UUID studentId; // Reference to the student
}