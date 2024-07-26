package com.S2O.webapp.RequesModal;

import com.S2O.webapp.Entity.Year;
import lombok.Data;

@Data
public class AdminitrationRequestModal {
    private String designation;

    private String adminName;

    private String adminQualification;

    private String insta;

    private String linkedIn;
    private String email;
    private Year year;

    private String adminImg;

}
