package com.S2O.webapp.RequesModal;

import com.S2O.webapp.Entity.Image;
import lombok.Data;

@Data
public class AdministrationDTO {
    private Long id;
    private String designation;
    private String adminName;
    private String adminQualification;
    private String insta;
    private String linkedIn;
    private String email;
    private int year;
    private ImageDTO adminImage; // Full image details

    public AdministrationDTO(Long id, String designation, String adminName, String adminQualification, String insta, String linkedIn, String email, int year, ImageDTO adminImage) {
        this.id = id;
        this.designation = designation;
        this.adminName = adminName;
        this.adminQualification = adminQualification;
        this.insta = insta;
        this.linkedIn = linkedIn;
        this.email = email;
        this.year = year;
        this.adminImage = adminImage;
    }
}