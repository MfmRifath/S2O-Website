package com.S2O.webapp.controller;

import com.S2O.webapp.RequesModal.AdministrationDTO;
import com.S2O.webapp.services.AdministrationService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

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

    // Get all administrations
    @GetMapping("/all")
    public ResponseEntity<List<AdministrationDTO>> getAllAdministrations() {
        List<AdministrationDTO> administrations = administrationService.getAllAdministrations();
        return new ResponseEntity<>(administrations, HttpStatus.OK);
    }

    // Get an administration by ID
    @GetMapping("/{id}")
    public ResponseEntity<AdministrationDTO> getAdministrationById(@PathVariable Long id) {
        Optional<AdministrationDTO> administration = administrationService.getAdministrationById(id);
        return administration.map(dto -> new ResponseEntity<>(dto, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Add a new administration
    @PostMapping(value = "/add", consumes = "multipart/form-data")
    public ResponseEntity<String> addAdministration(
            @RequestPart("administration") String administrationRequest,
            @RequestPart("image") MultipartFile image
    ) {
        try {
            // Parse and save the administration data
            AdministrationDTO adminDTO = objectMapper.readValue(administrationRequest, AdministrationDTO.class);
            administrationService.createAdministration(adminDTO, image);
            return ResponseEntity.status(HttpStatus.CREATED).body("Administration added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add administration: " + e.getMessage());
        }
    }

    // Edit an existing administration
    @PutMapping(value = "/edit/{id}", consumes = "multipart/form-data")
    public ResponseEntity<String> editAdministration(
            @PathVariable Long id,
            @RequestPart("administration") String administrationRequest,
            @RequestPart(value = "image", required = false) MultipartFile image
    ) {
        try {
            AdministrationDTO adminDTO = objectMapper.readValue(administrationRequest, AdministrationDTO.class);
            administrationService.updateAdministration(id, adminDTO, image);
            return new ResponseEntity<>("Administration updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update administration: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAdministration(@PathVariable Long id) {
        try {
            if (!administrationService.existsById(id)) {
                return new ResponseEntity<>("Administration not found", HttpStatus.NOT_FOUND);
            }

            administrationService.deleteAdministration(id);
            return new ResponseEntity<>("Administration deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return new ResponseEntity<>("Failed to delete administration: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}