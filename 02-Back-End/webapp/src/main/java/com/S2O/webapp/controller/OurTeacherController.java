package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.OurTeacher;
import com.S2O.webapp.RequesModal.OurTeacherDTO;
import com.S2O.webapp.error.InvalidOurTeacherDataException;
import com.S2O.webapp.error.OurTeacherNotFoundException;
import com.S2O.webapp.services.OurTeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/ourTeachers")
public class OurTeacherController {
    private final OurTeacherService ourTeacherService;


    @Autowired
    public OurTeacherController(OurTeacherService ourTeacherService) {
        this.ourTeacherService = ourTeacherService;
    }

    // Get all teachers
    @GetMapping
    public ResponseEntity<List<OurTeacherDTO>> getAllTeachers() {
        List<OurTeacherDTO> teacherDTOs = ourTeacherService.getAllOurTeacher();
        return ResponseEntity.ok(teacherDTOs);
    }

    // Get a single teacher by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTeacherById(@PathVariable Long id) {
        try {
            OurTeacher teacher = ourTeacherService.getOurTeacherById(id)
                    .orElseThrow(() -> new OurTeacherNotFoundException("Teacher not found with ID: " + id));
            OurTeacherDTO teacherDTO = ourTeacherService.convertToOurTeacherDTO(teacher);
            return ResponseEntity.ok(teacherDTO);
        } catch (OurTeacherNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        }
    }

    // Create a new teacher with an image
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<?> createTeacher(
            @RequestPart("teacher") String teacherJson,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        try {
            OurTeacher teacher = ourTeacherService.parseOurTeacherJson(teacherJson);
            OurTeacher savedTeacher = ourTeacherService.saveOurTeacher(teacher, imageFile);
            OurTeacherDTO teacherDTO = ourTeacherService.convertToOurTeacherDTO(savedTeacher);
            return ResponseEntity.status(HttpStatus.CREATED).body(teacherDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    // Update an existing teacher
    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<?> updateTeacher(
            @PathVariable Long id,
            @RequestPart("teacher") String teacherJson,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        try {
            OurTeacher teacherDetails = ourTeacherService.parseOurTeacherJson(teacherJson);
            OurTeacher updatedTeacher = ourTeacherService.updateOurTeacher(id, teacherDetails, imageFile);
            OurTeacherDTO teacherDTO = ourTeacherService.convertToOurTeacherDTO(updatedTeacher);
            return ResponseEntity.ok(teacherDTO);
        } catch (OurTeacherNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error: " + e.getMessage());
        } catch (InvalidOurTeacherDataException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image. Please try again.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: An unexpected error occurred.");
        }
    }

    // Delete a teacher
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacher(@PathVariable Long id) {
        ourTeacherService.deleteOurTeacher(id);
        return ResponseEntity.noContent().build();
    }
}