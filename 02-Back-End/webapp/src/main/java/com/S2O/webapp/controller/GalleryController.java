package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Gallery;
import com.S2O.webapp.services.GalleryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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
    public ResponseEntity<List<Gallery>> getAllGalleries() {
        return ResponseEntity.ok(galleryService.getAllGalleries());
    }

    // Get a single gallery by ID
    @GetMapping("/{id}")
    public ResponseEntity<Gallery> getGalleryById(@PathVariable Long id) {
        return galleryService.getGalleryById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Create a new gallery with images
    @PostMapping
    public ResponseEntity<Gallery> createGallery(
            @RequestPart("gallery") Gallery gallery,
            @RequestPart("images") List<MultipartFile> imageFiles) {
        try {
            Gallery savedGallery = galleryService.saveGallery(gallery, imageFiles);
            return new ResponseEntity<>(savedGallery, HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update an existing gallery with new images
    @PutMapping("/{id}")
    public ResponseEntity<Gallery> updateGallery(
            @PathVariable Long id,
            @RequestPart("gallery") Gallery galleryDetails,
            @RequestPart("images") List<MultipartFile> imageFiles) {
        try {
            Gallery updatedGallery = galleryService.updateGallery(id, galleryDetails, imageFiles);
            return ResponseEntity.ok(updatedGallery);
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete a gallery by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable Long id) {
        galleryService.deleteGallery(id);
        return ResponseEntity.noContent().build();
    }
}
