package com.S2O.webapp.RequesModal;

import lombok.Data;

@Data
public class SubjectDTO {
    private Long id;
    private String name;
    private String stream;

    public SubjectDTO() {}
    public SubjectDTO(Long id, String name, String stream) {
        this.id = id;
        this.name = name;
        this.stream = stream;
    }
}