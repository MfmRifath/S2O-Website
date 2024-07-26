package com.S2O.webapp.services;

import com.S2O.webapp.dao.GalleryRepository;
import org.springframework.stereotype.Service;

@Service
public class GalleryServices {
    private GalleryRepository galleryRepository;


    public GalleryServices(GalleryRepository galleryRepository){
        this.galleryRepository =galleryRepository;
    }


}
