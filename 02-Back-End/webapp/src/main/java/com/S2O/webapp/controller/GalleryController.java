package com.S2O.webapp.controller;

import com.S2O.webapp.services.GalleryServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/galleries")
public class GalleryController {
    private GalleryServices galleryServices;

            @Autowired
    public GalleryController(GalleryServices galleryServices){
        this.galleryServices=galleryServices;
    }


}
