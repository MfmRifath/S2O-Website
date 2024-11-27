package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Gallery;
import com.S2O.webapp.Entity.Image;
import com.S2O.webapp.RequesModal.GalleryDTO;
import com.S2O.webapp.RequesModal.ImageDTO;
import com.S2O.webapp.dao.GalleryRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GalleryService {

    private final GalleryRepository galleryRepository;
    private final ImageService imageService;
    private final ObjectMapper objectMapper;

    @Autowired
    public GalleryService(GalleryRepository galleryRepository, ImageService imageService, ObjectMapper objectMapper) {
        this.galleryRepository = galleryRepository;
        this.imageService = imageService;
        this.objectMapper = objectMapper;
    }

    // Retrieve all galleries as DTOs
    @Transactional
    public List<GalleryDTO> getAllGalleries() {
        List<Gallery> galleries = galleryRepository.findAll();
        return galleries.stream()
                .map(this::convertToGalleryDTO)
                .collect(Collectors.toList());
    }

    // Retrieve a single gallery by ID
    public Optional<Gallery> getGalleryById(Long id) {
        return galleryRepository.findById(id);
    }

    // Save a new gallery with images
    @Transactional
    public Gallery saveGallery(Gallery gallery, List<MultipartFile> imageFiles) throws IOException {
        if (imageFiles != null && !imageFiles.isEmpty()) {
            List<Image> images = imageFiles.stream().map(file -> {
                try {
                    String keyName = imageService.uploadImage(file);
                    Image image = new Image();
                    image.setKeyName(keyName);
                    image.setGallery(gallery);
                    return image;
                } catch (IOException e) {
                    throw new RuntimeException("Failed to upload image", e);
                }
            }).collect(Collectors.toList());

            gallery.setImages(images);
        }

        return galleryRepository.save(gallery);
    }

    // Convert Gallery to DTO


    // Parse gallery JSON
    public Gallery parseGalleryJson(String galleryJson) throws IOException {
        return objectMapper.readValue(galleryJson, Gallery.class);
    }
    // Method visibility adjusted for convertToGalleryDTO
    public GalleryDTO convertToGalleryDTO(Gallery gallery) {
        List<ImageDTO> imageDTOs = gallery.getImages().stream()
                .map(image -> new ImageDTO(image.getKeyName(), imageService.getPresignedUrl(image.getKeyName())))
                .collect(Collectors.toList());

        return new GalleryDTO(gallery, imageDTOs);
    }
    @Transactional
    public Gallery updateGallery(Long id, Gallery updatedGalleryDetails, List<MultipartFile> imageFiles) throws IOException {
        // Find the existing gallery by ID
        Gallery existingGallery = galleryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gallery not found with ID: " + id));

        // Update gallery details
        existingGallery.setEvent(updatedGalleryDetails.getEvent());
        existingGallery.setDescription(updatedGalleryDetails.getDescription());
        existingGallery.setDate(updatedGalleryDetails.getDate());

        // Add new images if provided
        if (imageFiles != null && !imageFiles.isEmpty()) {
            List<Image> newImages = imageFiles.stream()
                    .map(file -> {
                        try {
                            // Upload image and get the S3 key
                            String keyName = imageService.uploadImage(file);

                            // Create a new Image entity
                            Image image = new Image();
                            image.setKeyName(keyName);
                            image.setGallery(existingGallery);
                            return image;
                        } catch (IOException e) {
                            throw new RuntimeException("Failed to upload image", e);
                        }
                    })
                    .collect(Collectors.toList());

            // Add the new images to the gallery
            existingGallery.getImages().addAll(newImages);
        }

        // Save the updated gallery in the repository
        return galleryRepository.save(existingGallery);
    }
    @Transactional
    public void deleteGallery(Long id) {
        // Find the existing gallery by ID
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gallery not found with ID: " + id));

        // Delete associated images from S3 and the database
        gallery.getImages().forEach(image -> {
            try {
                // Remove the image from S3
                imageService.deleteImage(image.getKeyName());
            } catch (Exception e) {
                throw new RuntimeException("Failed to delete image from S3: " + image.getKeyName(), e);
            }
        });

        // Remove the gallery from the repository
        galleryRepository.delete(gallery);
    }
}