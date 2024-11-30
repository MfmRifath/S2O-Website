package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Administration;
import com.S2O.webapp.Entity.Image;
import com.S2O.webapp.RequesModal.AdministrationDTO;
import com.S2O.webapp.RequesModal.ImageDTO;
import com.S2O.webapp.dao.AdministrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdministrationService {

    private final AdministrationRepository administrationRepository;
    private final ImageService imageService;

    @Autowired
    public AdministrationService(AdministrationRepository administrationRepository, ImageService imageService) {
        this.administrationRepository = administrationRepository;
        this.imageService = imageService;
    }

    // Retrieve all administrations with their images
    @Transactional
    public List<AdministrationDTO> getAllAdministrations() {
        List<Administration> administrations = administrationRepository.findAll();
        return administrations.stream()
                .map(this::convertToAdministrationDTO)
                .collect(Collectors.toList());
    }

    // Convert `Administration` entity to `AdministrationDTO`
    public AdministrationDTO convertToAdministrationDTO(Administration administration) {
        // Create `ImageDTO` if `adminImages` exists
        ImageDTO imageDTO = null;
        if (administration.getAdminImages() != null) {
            Image image = administration.getAdminImages();
            imageDTO = new ImageDTO(image.getKeyName(), imageService.getPresignedUrl(image.getKeyName()));
        }

        // Return `AdministrationDTO` with image information
        return new AdministrationDTO(
                administration.getId(),
                administration.getDesignation(),
                administration.getAdminName(),
                administration.getAdminQualification(),
                administration.getInsta(),
                administration.getLinkedIn(),
                administration.getEmail(),
                administration.getYear(),
                imageDTO
        );
    }

    // Retrieve an administration by ID
    public Optional<AdministrationDTO> getAdministrationById(Long id) {
        return administrationRepository.findById(id).map(this::convertToAdministrationDTO);
    }

    public void createAdministration(AdministrationDTO adminDTO, MultipartFile adminImg) throws IOException {
        Administration administration = mapToEntity(adminDTO);
        administration = administrationRepository.save(administration);

        if (adminImg != null && !adminImg.isEmpty()) {
            try {
                String imageKey = imageService.uploadImage(adminImg); // Upload image to S3
                Image adminImage = new Image();
                adminImage.setKeyName(imageKey);
                adminImage.setAdministration(administration);
                adminImage.setFile(imageService.getFileFromS3(imageKey)); // Retrieve and set the file

                imageService.saveImage(adminImage); // Save image entity to the database

                administration.setAdminImages(adminImage); // Link the image to the administration
                administrationRepository.save(administration); // Save administration with the linked image
            } catch (Exception e) {
                System.err.println("Error uploading image: " + e.getMessage());
                throw new IOException("Failed to upload and associate the image.", e);
            }
        } else {
            System.err.println("No image provided for the administration.");
        }
    }
    @Transactional
    public AdministrationDTO updateAdministration(Long id, AdministrationDTO adminDTO, MultipartFile adminImg) throws IOException {
        Administration administration = administrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Administration not found with id " + id));

        // Update administration fields
        mapToEntity(adminDTO, administration);

        if (adminImg != null && !adminImg.isEmpty()) {
            Image existingImage = administration.getAdminImages();

            if (existingImage != null) {
                // Remove the association with the administration first
                administration.setAdminImages(null);
                administrationRepository.save(administration); // Save the administration without the image

                // Delete the existing image from S3 and the database
                imageService.deleteImage(existingImage.getKeyName());
            }

            // Upload and associate a new image
            String newImageKey = imageService.uploadImage(adminImg);
            Image newImage = new Image();
            newImage.setKeyName(newImageKey);
            newImage.setAdministration(administration);
            imageService.saveImage(newImage);

            administration.setAdminImages(newImage); // Link the new image
        }

        // Save the updated administration
        administration = administrationRepository.save(administration);
        return convertToAdministrationDTO(administration);
    }
    // Delete an administration by ID
    @Transactional
    public void deleteAdministration(Long id) {
        Administration administration = administrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Administration not found with id " + id));

        // Delete associated image
        Image adminImage = administration.getAdminImages();
        if (adminImage != null) {
            imageService.deleteImage(adminImage.getKeyName());
        }

        // Delete the administration
        administrationRepository.delete(administration);
    }

    // Check if an administration exists by ID
    public boolean existsById(Long id) {
        return administrationRepository.existsById(id);
    }


    // Map an AdministrationDTO to a new Administration entity
    private Administration mapToEntity(AdministrationDTO dto) {
        Administration admin = new Administration();
        admin.setDesignation(dto.getDesignation());
        admin.setAdminName(dto.getAdminName());
        admin.setAdminQualification(dto.getAdminQualification());
        admin.setInsta(dto.getInsta());
        admin.setLinkedIn(dto.getLinkedIn());
        admin.setEmail(dto.getEmail());
        admin.setYear(dto.getYear());
        return admin;
    }

    // Update an existing Administration entity with data from AdministrationDTO
    private void mapToEntity(AdministrationDTO dto, Administration admin) {
        admin.setDesignation(dto.getDesignation());
        admin.setAdminName(dto.getAdminName());
        admin.setAdminQualification(dto.getAdminQualification());
        admin.setInsta(dto.getInsta());
        admin.setLinkedIn(dto.getLinkedIn());
        admin.setEmail(dto.getEmail());
        admin.setYear(dto.getYear());
    }
}