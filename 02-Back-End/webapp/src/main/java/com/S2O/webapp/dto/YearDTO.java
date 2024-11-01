package com.S2O.webapp.dto;


import com.S2O.webapp.Entity.Year;
import lombok.Data;

@Data
public class YearDTO {
    private int yearId;
    private int yearValue;

    // Constructor to map Year to YearDTO
    public YearDTO(Year year) {
        this.yearId = year.getYearId();
        this.yearValue = year.getYearValue();
    }

    // Getters and setters...
}
