package com.S2O.webapp.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class StudentDto {
    private UUID id;
    private String studentName;
    private String stream; // Ensure it's a string to allow validations
    private int year;


}