package com.S2O.webapp.dto;

import lombok.Data;
import org.springframework.transaction.annotation.Transactional;

@Data
@Transactional
public class StudentMarkDTO {
    private Long markId;
    private int mark;
    // Add this field to store the Subject ID

    public StudentMarkDTO(Long markId, int mark) {
        this.markId = markId;
        this.mark = mark;
        // Initialize the subject ID
    }
}
