package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Administration;
import com.S2O.webapp.RequesModal.AdminitrationRequestModal;
import com.S2O.webapp.services.AdministrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/administrations")
public class AdministrationController {

    private final AdministrationService administrationService;

    @Autowired
    public AdministrationController(AdministrationService administrationService) {
        this.administrationService = administrationService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Administration>> getAllAdministrations() {
        try {
            List<Administration> administrations = administrationService.getAllAdministrations();
            return new ResponseEntity<>(administrations, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/add/admin-member")
    public ResponseEntity<String> addAdministrationMember(@RequestBody AdminitrationRequestModal administration) {
        try {
            if (administration == null) {
                throw new IllegalArgumentException("Request body cannot be null");
            }
            if (administration.getDesignation() == null || administration.getDesignation().isEmpty()) {
                throw new IllegalArgumentException("Designation is required");
            }
            if (administration.getAdminName() == null || administration.getAdminName().isEmpty()) {
                throw new IllegalArgumentException("Admin name is required");
            }
            if (administration.getAdminQualification() == null || administration.getAdminQualification().isEmpty()) {
                throw new IllegalArgumentException("Admin qualification is required");
            }
            if (administration.getInsta() == null || administration.getInsta().isEmpty()) {
                throw new IllegalArgumentException("Instagram link is required");
            }
            if (administration.getLinkedIn() == null || administration.getLinkedIn().isEmpty()) {
                throw new IllegalArgumentException("LinkedIn link is required");
            }
            if (administration.getEmail() == null || administration.getEmail().isEmpty()) {
                throw new IllegalArgumentException("Email is required");
            }
            if (administration.getYear() == null) {
                throw new IllegalArgumentException("Year is required");
            }
            if (administration.getAdminImg() == null || administration.getAdminImg().isEmpty()) {
                throw new IllegalArgumentException("Admin image is required");
            }

            administrationService.createAdministration(administration);

            return new ResponseEntity<>("Admin added successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Invalid input: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to add admin: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/edit/admin-member/{id}")
    public ResponseEntity<String> editAdministrationMember(@PathVariable Long id, @RequestBody AdminitrationRequestModal administration) {
        try {
            if (administration == null) {
                throw new IllegalArgumentException("Request body cannot be null");
            }
            if (administration.getDesignation() == null || administration.getDesignation().isEmpty()) {
                throw new IllegalArgumentException("Designation is required");
            }
            if (administration.getAdminName() == null || administration.getAdminName().isEmpty()) {
                throw new IllegalArgumentException("Admin name is required");
            }
            if (administration.getAdminQualification() == null || administration.getAdminQualification().isEmpty()) {
                throw new IllegalArgumentException("Admin qualification is required");
            }
            if (administration.getInsta() == null || administration.getInsta().isEmpty()) {
                throw new IllegalArgumentException("Instagram link is required");
            }
            if (administration.getLinkedIn() == null || administration.getLinkedIn().isEmpty()) {
                throw new IllegalArgumentException("LinkedIn link is required");
            }
            if (administration.getEmail() == null || administration.getEmail().isEmpty()) {
                throw new IllegalArgumentException("Email is required");
            }
            if (administration.getYear() == null) {
                throw new IllegalArgumentException("Year is required");
            }
            if (administration.getAdminImg() == null || administration.getAdminImg().isEmpty()) {
                throw new IllegalArgumentException("Admin image is required");
            }

            administrationService.updateAdministration(id, administration);

            return new ResponseEntity<>("Admin updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Invalid input: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to update admin: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/admin-member/{id}")
    public ResponseEntity<String> deleteAdministrationMember(@PathVariable Long id) {
        try {
            administrationService.deleteAdministration(id);
            return new ResponseEntity<>("Admin deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to delete admin: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
