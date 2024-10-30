package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Gallery;
import com.S2O.webapp.Entity.Image;
import com.S2O.webapp.dao.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GalleryService {

    private final GalleryRepository galleryRepository;
    private final ImageService imageService;

    @Autowired
    public GalleryService(GalleryRepository galleryRepository, ImageService imageService) {
        this.galleryRepository = galleryRepository;
        this.imageService = imageService;
    }

    // Retrieve all galleries
    public List<Gallery> getAllGalleries() {
        return galleryRepository.findAll();
    }

    // Retrieve a single gallery by ID
    public Optional<Gallery> getGalleryById(Long id) {
        return galleryRepository.findById(id);
    }

    // Save a new gallery with images
    public Gallery saveGallery(Gallery gallery, List<MultipartFile> imageFiles) throws IOException {
        List<Image> images = new ArrayList<>();

        // Upload each MultipartFile and store URLs
        for (MultipartFile imageFile : imageFiles) {
            String imageUrl = imageService.uploadImage(imageFile);

            Image image = new Image();
            image.setUrl(imageUrl);
            images.add(image);
        }

        gallery.setImages(images); // Set images for the gallery
        return galleryRepository.save(gallery);
    }

    // Update an existing gallery with new images
    public Gallery updateGallery(Long id, Gallery galleryDetails, List<MultipartFile> newImageFiles) throws IOException {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gallery not found with id " + id));

        gallery.setEvent(galleryDetails.getEvent());
        gallery.setDescription(galleryDetails.getDescription());
        gallery.setDate(galleryDetails.getDate());

        // If new images are provided, upload and replace existing ones
        if (newImageFiles != null && !newImageFiles.isEmpty()) {
            gallery.getImages().clear(); // Clear existing images

            List<Image> images = new ArrayList<>();
            for (MultipartFile imageFile : newImageFiles) {
                String imageUrl = imageService.uploadImage(imageFile);

                Image image = new Image();
                image.setUrl(imageUrl);
                images.add(image);
            }
            gallery.setImages(images); // Set new images for the gallery
        }

        return galleryRepository.save(gallery);
    }

    // Delete a gallery by ID
    public void deleteGallery(Long id) {
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gallery not found with id " + id));
        galleryRepository.delete(gallery);
    }
}
