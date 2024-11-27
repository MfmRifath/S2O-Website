package com.S2O.webapp.dto;

import lombok.Data;

import java.util.UUID;
@Data
public class MarksDto {
    private String examType;
    private int marks;
    private String subject;
    private UUID studentId; // Must be provided in the request

    // Getters and setters
}