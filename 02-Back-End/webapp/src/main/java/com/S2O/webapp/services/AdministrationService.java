package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Administration;
import com.S2O.webapp.Entity.Image;
import com.S2O.webapp.RequesModal.AdminitrationRequestModal;
import com.S2O.webapp.dao.AdministrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

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
    public List<Administration> getAllAdministrations() {
        List<Administration> administrations = administrationRepository.findAll();
        administrations.forEach(admin -> {
            if (admin.getAdminImages() != null) {
                String presignedUrl = imageService.getPresignedUrl(admin.getAdminImages().getKeyName());
                admin.getAdminImages().setUrl(presignedUrl); // Set URL for each image
            }
        });
        return administrations;
    }

    // Retrieve an administration by ID
    public Optional<Administration> getAdministrationById(Long id) {
        return administrationRepository.findById(id);
    }

    public void createAdministration(AdminitrationRequestModal adminRequest, MultipartFile adminImg) throws IOException {
        // Step 1: Save Administration entity first
        Administration administration = new Administration();
        administration.setDesignation(adminRequest.getDesignation());
        administration.setAdminName(adminRequest.getAdminName());
        administration.setInsta(adminRequest.getInsta());
        administration.setLinkedIn(adminRequest.getLinkedIn());
        administration.setEmail(adminRequest.getEmail());
        administration.setAdminQualification(adminRequest.getAdminQualification());
        administration.setYear(adminRequest.getYear());

        administration = administrationRepository.save(administration); // Save first to generate ID

        // Step 2: Handle image upload and associate the saved Administration entity
        if (adminImg != null && !adminImg.isEmpty()) {
            String imageKey = imageService.uploadImage(adminImg);

            // Create and save Image entity
            Image adminImage = new Image();
            adminImage.setKeyName(imageKey);
            adminImage.setAdministration(administration); // Associate image with administration
            imageService.saveImage(adminImage); // Save the image

            // Associate the saved image with administration and update administration
            administration.setAdminImages(adminImage);
            administrationRepository.save(administration); // Update administration with the image
        }
    }

    @Transactional
    public Administration updateAdministration(Long id, AdminitrationRequestModal adminRequest, MultipartFile adminImg) throws IOException {
        Administration administration = administrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Administration not found with id " + id));

        // Map request data to the existing administration
        mapRequestToAdministration(adminRequest, administration);

        // Re-upload image if a new image is provided
        if (adminImg != null && !adminImg.isEmpty()) {
            String imageKey = imageService.uploadImage(adminImg);
            Image adminImage = new Image();
            adminImage.setKeyName(imageKey); // Set new image key
            adminImage.setAdministration(administration); // Link image to administration

            administration.setAdminImages(adminImage); // Associate new image with administration
            imageService.saveImage(adminImage); // Save updated image entity
        }

        return administrationRepository.save(administration); // Save updated administration
    }

    // Delete an administration by ID
    public void deleteAdministration(Long id) {
        Administration administration = administrationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Administration not found with id " + id));
        administrationRepository.delete(administration);
    }

    // Check if an administration exists by ID
    public boolean existsById(Long id) {
        return administrationRepository.existsById(id);
    }

    // Utility to map request data to a new Administration entity
    private Administration mapRequestToAdministration(AdminitrationRequestModal request) {
        Administration administration = new Administration();
        administration.setDesignation(request.getDesignation());
        administration.setAdminName(request.getAdminName());
        administration.setInsta(request.getInsta());
        administration.setLinkedIn(request.getLinkedIn());
        administration.setEmail(request.getEmail());
        administration.setAdminQualification(request.getAdminQualification());
        administration.setYear(request.getYear());
        return administration;
    }

    // Overloaded utility to map request data to an existing Administration entity
    private void mapRequestToAdministration(AdminitrationRequestModal request, Administration administration) {
        administration.setDesignation(request.getDesignation());
        administration.setAdminName(request.getAdminName());
        administration.setInsta(request.getInsta());
        administration.setLinkedIn(request.getLinkedIn());
        administration.setEmail(request.getEmail());
        administration.setAdminQualification(request.getAdminQualification());
        administration.setYear(request.getYear());
    }
}
