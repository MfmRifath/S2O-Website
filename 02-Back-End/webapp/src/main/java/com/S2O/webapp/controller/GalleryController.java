package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Gallery;
import com.S2O.webapp.RequesModal.GalleryDTO;
import com.S2O.webapp.services.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/galleries")
public class GalleryController {

    private final GalleryService galleryService;

    @Autowired
    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    // Get all galleries
    @GetMapping
    public ResponseEntity<List<GalleryDTO>> getAllGalleries() {
        List<GalleryDTO> galleryDTOs = galleryService.getAllGalleries();
        return ResponseEntity.ok(galleryDTOs);
    }

    // Get a single gallery by ID

    // Create a new gallery with images
    // Simplified createGallery to use convertToGalleryDTO
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> createGallery(
            @RequestPart("gallery") String galleryJson,
            @RequestPart("images") List<MultipartFile> imageFiles) {
        try {
            Gallery gallery = galleryService.parseGalleryJson(galleryJson);
            Gallery savedGallery = galleryService.saveGallery(gallery, imageFiles);
            GalleryDTO galleryDTO = galleryService.convertToGalleryDTO(savedGallery);
            return ResponseEntity.status(HttpStatus.CREATED).body(galleryDTO);
        } catch (Exception e) {
            System.err.println("Error while creating gallery: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }
//    @PostMapping(consumes = "multipart/form-data")
//    public ResponseEntity<?> debugCreateGallery(
//            @RequestPart("gallery") String galleryJson,
//            @RequestPart("images") List<MultipartFile> imageFiles) {
//        System.out.println("Received gallery JSON: " + galleryJson);
//        System.out.println("Received files: " + imageFiles.size());
//        imageFiles.forEach(file -> System.out.println("File: " + file.getOriginalFilename()));
//        return ResponseEntity.ok("Debug successful");
//    }

    // Update an existing gallery
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<?> updateGallery(
            @PathVariable Long id,
            @RequestPart("gallery") String galleryJson,
            @RequestPart(required = false) List<MultipartFile> imageFiles) {
        try {
            // Parse the incoming JSON to a Gallery object
            Gallery galleryDetails = galleryService.parseGalleryJson(galleryJson);

            // Update the gallery with new details and optionally new images
            Gallery updatedGallery = galleryService.updateGallery(id, galleryDetails, imageFiles);

            // Convert the updated gallery to a DTO for response
            GalleryDTO galleryDTO = galleryService.convertToGalleryDTO(updatedGallery);

            return ResponseEntity.ok(galleryDTO);
        } catch (IOException e) {
            System.err.println("Error while updating gallery: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Unable to update gallery.");
        } catch (RuntimeException e) {
            System.err.println("Error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getGalleryById(@PathVariable Long id) {
        try {
            // Retrieve the gallery by ID
            Gallery gallery = galleryService.getGalleryById(id)
                    .orElseThrow(() -> new RuntimeException("Gallery not found with ID: " + id));

            // Convert the gallery entity to a DTO
            GalleryDTO galleryDTO = galleryService.convertToGalleryDTO(gallery);

            return ResponseEntity.ok(galleryDTO);
        } catch (RuntimeException e) {
            System.err.println("Error while fetching gallery: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error while fetching gallery: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Unable to fetch gallery.");
        }
    }
    // Delete a gallery
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable Long id) {
        galleryService.deleteGallery(id);
        return ResponseEntity.noContent().build();
    }
}