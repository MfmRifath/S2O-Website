package com.S2O.webapp.RequesModal;

import lombok.Data;
import java.util.List;

@Data
public class StudentDTO {
    private Long id;
    private String name;
    private String stream;
    private String year;
    private String nic;
    private List<MarkDTO> marks;

    public StudentDTO() {
    }
    public StudentDTO(Long id, String name, String stream, String year, List<MarkDTO> marks, String nic) {
        this.id = id;
        this.name = name;
        this.stream = stream;
        this.year = year;
        this.marks = marks;
        this.nic = nic;
    }


}
