package com.S2O.webapp.RequesModal;

import com.S2O.webapp.Entity.Gallery;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class GalleryDTO {
    private Long id;
    private String event;
    private String description;
    private LocalDate date;
    private List<ImageDTO> images; // List of ImageDTOs

    public GalleryDTO(Gallery gallery, List<ImageDTO> imageDTOs) {
        this.id = gallery.getId();
        this.event = gallery.getEvent();
        this.description = gallery.getDescription();
        this.date = gallery.getDate();
        this.images = imageDTOs; // Assign image DTOs
    }
}