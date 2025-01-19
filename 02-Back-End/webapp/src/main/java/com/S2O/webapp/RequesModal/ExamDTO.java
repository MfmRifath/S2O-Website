package com.S2O.webapp.RequesModal;

import lombok.Data;
import java.util.Date;

@Data
public class ExamDTO {
    private Long id;
    private String name;
    private Date date;


    public ExamDTO() {}
    public ExamDTO(Long id, String name, Date date) {
        this.id = id;
        this.name = name;
        this.date = date;
    }
}