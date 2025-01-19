package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Gallery;
import com.S2O.webapp.Entity.Image;
import com.S2O.webapp.Entity.OurTeacher;
import com.S2O.webapp.RequesModal.GalleryDTO;
import com.S2O.webapp.RequesModal.ImageDTO;
import com.S2O.webapp.RequesModal.OurTeacherDTO;
import com.S2O.webapp.dao.GalleryRepository;
import com.S2O.webapp.dao.OurTeacherRepository;
import com.S2O.webapp.error.GalleryNotFoundException;
import com.S2O.webapp.error.InvalidGalleryDataException;
import com.S2O.webapp.error.OurTeacherNotFoundException;
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
public class OurTeacherService {
    private final OurTeacherRepository ourTeacherRepository;
    private final ImageService imageService;
    private final ObjectMapper objectMapper;


    @Autowired
    public OurTeacherService(OurTeacherRepository ourTeacherRepository, ImageService imageService, ObjectMapper objectMapper) {
        this.ourTeacherRepository = ourTeacherRepository;
        this.imageService = imageService;
        this.objectMapper = objectMapper;
    }

    // Retrieve all galleries as DTOs
    @Transactional
    public List<OurTeacherDTO> getAllOurTeacher() {
        List<OurTeacher> ourTeachers = ourTeacherRepository.findAll();
        return ourTeachers.stream()
                .map(this::convertToOurTeacherDTO)
                .collect(Collectors.toList());
    }

    // Retrieve a single gallery by ID
    public Optional<OurTeacher> getOurTeacherById(Long id) {
        return ourTeacherRepository.findById(id);
    }

    // Save a new gallery with images
    @Transactional
    public OurTeacher saveOurTeacher(OurTeacher ourTeacher, MultipartFile imageFile) throws IOException {
        if (imageFile != null && !imageFile.isEmpty()) {
            String keyName = imageService.uploadImage(imageFile);
            Image image = new Image();
            image.setKeyName(keyName);
            image.setOurTeacher(ourTeacher);
            ourTeacher.setImage(image); // Set a single image
        }

        return ourTeacherRepository.save(ourTeacher); // Save ourTeacher with the image
    }

    // Convert Gallery to DTO


    // Parse gallery JSON
    public OurTeacher parseOurTeacherJson(String ourTeacherJson) throws IOException {
        return objectMapper.readValue(ourTeacherJson, OurTeacher.class);
    }
    // Method visibility adjusted for convertToGalleryDTO
    public OurTeacherDTO convertToOurTeacherDTO(OurTeacher ourTeacher) {
        Image image = ourTeacher.getImage();
        String imageUrl = (image != null) ? imageService.getPresignedUrl(image.getKeyName()) : null;
        ImageDTO imageDTO = (image != null) ? new ImageDTO(image.getKeyName(), imageUrl) : null;

        return new OurTeacherDTO(
                ourTeacher.getId(),
                ourTeacher.getTeacherName(),
                ourTeacher.getTeacherQualification(),
                ourTeacher.getTeacherSubject(),
                imageDTO != null ? imageDTO.getUrl() : null // Using the URL from ImageDTO if available
        );
    }
    @Transactional
    public OurTeacher updateOurTeacher(Long id, OurTeacher updatedOurTeacherDetails, MultipartFile imageFile) throws IOException {
        // Fetch the existing OurTeacher
        OurTeacher existingOurTeacher = ourTeacherRepository.findById(id)
                .orElseThrow(() -> new OurTeacherNotFoundException("Teacher not found with ID: " + id));

        // Update basic details
        if (updatedOurTeacherDetails.getTeacherName() == null || updatedOurTeacherDetails.getTeacherQualification().isEmpty() || updatedOurTeacherDetails.getTeacherSubject().isEmpty()) {
            throw new InvalidGalleryDataException("Our Teacher details cannot be empty.");
        }
        existingOurTeacher.setTeacherName(updatedOurTeacherDetails.getTeacherName());
        existingOurTeacher.setTeacherQualification(updatedOurTeacherDetails.getTeacherQualification());
        existingOurTeacher.setTeacherSubject(updatedOurTeacherDetails.getTeacherSubject());

        // Handle single image upload
        if (imageFile != null && !imageFile.isEmpty()) {
            // Validate file type and size
            if (!imageFile.getContentType().startsWith("image/")) {
                throw new InvalidGalleryDataException("Only image files are allowed.");
            }
            if (imageFile.getSize() > 5 * 1024 * 1024) { // Limit: 5MB
                throw new InvalidGalleryDataException("File size exceeds the maximum limit of 5MB.");
            }

            // Upload new image and set it
            String keyName = imageService.uploadImage(imageFile);

            // Replace existing image
            Image oldImage = existingOurTeacher.getImage();
            if (oldImage != null) {
                imageService.deleteImage(oldImage.getKeyName());  // Optionally delete old image from storage
            }
            Image newImage = new Image();
            newImage.setKeyName(keyName);
            newImage.setOurTeacher(existingOurTeacher);
            existingOurTeacher.setImage(newImage);  // Set single image
        }

        // Save the updated OurTeacher
        return ourTeacherRepository.save(existingOurTeacher);
    }
    @Transactional
    public void deleteOurTeacher(Long id) {
        // Find the existing OurTeacher by ID
        OurTeacher ourTeacher = ourTeacherRepository.findById(id)
                .orElseThrow(() -> new OurTeacherNotFoundException("OurTeacher not found with ID: " + id));

        // Delete associated image from S3 and the database
        Image image = ourTeacher.getImage();
        if (image != null) {
            try {
                // Remove the image from S3
                imageService.deleteImage(image.getKeyName());
            } catch (Exception e) {
                throw new RuntimeException("Failed to delete image from S3: " + image.getKeyName(), e);
            }
        }

        // Remove the OurTeacher from the repository
        ourTeacherRepository.delete(ourTeacher);
    }
}
