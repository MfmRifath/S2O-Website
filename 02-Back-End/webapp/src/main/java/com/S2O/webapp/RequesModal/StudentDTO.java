package com.S2O.webapp.RequesModal;

import lombok.Data;
import java.util.List;

@Data
public class StudentDTO {
    private Long id;
    private String name;
    private String stream;
    private String year;
    private List<MarkDTO> marks;
}