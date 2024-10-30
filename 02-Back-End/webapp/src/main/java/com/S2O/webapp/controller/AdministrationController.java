package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Administration;
import com.S2O.webapp.RequesModal.AdminitrationRequestModal;
import com.S2O.webapp.services.AdministrationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/administrations")
public class AdministrationController {

    private final AdministrationService administrationService;
    private final ObjectMapper objectMapper;

    @Autowired
    public AdministrationController(AdministrationService administrationService, ObjectMapper objectMapper) {
        this.administrationService = administrationService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Administration>> getAllAdministrations() {
        try {
            List<Administration> administrations = administrationService.getAllAdministrations();
            return new ResponseEntity<>(administrations, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(value = "/add/admin-member", consumes = "multipart/form-data")
    public ResponseEntity<String> addAdministrationMember(
            @RequestPart("administration") String administrationRequest,
            @RequestPart("image") MultipartFile image
    ) {
        try {
            // Convert JSON string to AdminitrationRequestModal
            AdminitrationRequestModal adminRequest = objectMapper.readValue(administrationRequest, AdminitrationRequestModal.class);

            // Create a new administration with the provided data and image
            administrationService.createAdministration(adminRequest, image);
            return new ResponseEntity<>("Admin added successfully", HttpStatus.CREATED);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("Failed to parse administration data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add admin: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/edit/admin-member/{id}")
    public ResponseEntity<String> editAdministrationMember(
            @PathVariable Long id,
            @RequestPart("administration") String administrationRequest,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        try {
            // Convert JSON string to AdminitrationRequestModal
            AdminitrationRequestModal adminRequest = objectMapper.readValue(administrationRequest, AdminitrationRequestModal.class);

            // Update the administration member's information
            administrationService.updateAdministration(id, adminRequest, image);
            return new ResponseEntity<>("Admin updated successfully", HttpStatus.OK);
        } catch (JsonProcessingException e) {
            return new ResponseEntity<>("Failed to parse administration data: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update admin: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/admin-member/{id}")
    public ResponseEntity<String> deleteAdministrationMember(@PathVariable Long id) {
        try {
            // Check if the administration member exists before deletion
            if (!administrationService.existsById(id)) {
                return new ResponseEntity<>("Admin member not found", HttpStatus.NOT_FOUND);
            }

            // Delete the administration member
            administrationService.deleteAdministration(id);
            return new ResponseEntity<>("Admin deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete admin: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
