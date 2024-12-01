package com.S2O.webapp.dto;

import lombok.Data;

@Data
public class ExamDto {
    private Long id;
    private String name;
    private String term;
    private int year;
}