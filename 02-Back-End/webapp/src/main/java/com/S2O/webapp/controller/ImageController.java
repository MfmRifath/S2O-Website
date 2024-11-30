package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Image;
import com.S2O.webapp.services.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService imageService;

    @Autowired
    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    /**
     * Endpoint to upload an image.
     *
     * @param file the image file to upload
     * @return ResponseEntity with the uploaded image's key
     */
    @PostMapping
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String keyName = imageService.uploadImage(file);
            return ResponseEntity.status(HttpStatus.CREATED).body(keyName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload image: " + e.getMessage());
        }
    }

    /**
     * Endpoint to get a presigned URL for an image.
     *
     * @param keyName the key of the image
     * @return ResponseEntity with the presigned URL
     */
    @GetMapping("/{keyName}/url")
    public ResponseEntity<String> getPresignedUrl(@PathVariable String keyName) {
        try {
            String presignedUrl = imageService.getPresignedUrl(keyName);
            return ResponseEntity.ok(presignedUrl);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to generate presigned URL: " + e.getMessage());
        }
    }

    /**
     * Endpoint to fetch image content as a byte array.
     *
     * @param keyName the key of the image
     * @return ResponseEntity with the image content
     */
    @GetMapping("/{keyName}")
    public ResponseEntity<byte[]> getImageContent(@PathVariable String keyName) {
        try {
            byte[] content = imageService.getImageContent(keyName);
            return ResponseEntity.ok(content);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    /**
     * Endpoint to delete an image.
     *
     * @param keyName the key of the image to delete
     * @return ResponseEntity with the delete status
     */
    @DeleteMapping("/{keyName}")
    public ResponseEntity<String> deleteImage(@PathVariable String keyName) {
        try {
            imageService.deleteImage(keyName);
            return ResponseEntity.ok("Image deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete image: " + e.getMessage());
        }
    }
}