package com.S2O.webapp.RequesModal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OurTeacherDTO {
    private Long id;
    private String teacherName;
    private String teacherQualification;
    private String teacherSubject;
    private String imageUrl; // URL for the associated image
}