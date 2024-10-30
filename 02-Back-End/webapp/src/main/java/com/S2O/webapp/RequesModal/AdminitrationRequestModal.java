package com.S2O.webapp.RequesModal;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
@Data
public class AdminitrationRequestModal {
    private String designation;
    private String adminName;
    private String insta;
    private String linkedIn;
    private String email;
    private String adminQualification;
    private Integer year;
    private MultipartFile adminImg; // Changed to MultipartFile // This is the image file path
    private String adminImgUrl;

}
