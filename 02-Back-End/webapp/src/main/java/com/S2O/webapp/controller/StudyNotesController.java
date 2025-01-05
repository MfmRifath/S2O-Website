package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Book;
import com.S2O.webapp.Entity.StudyNotes;
import com.S2O.webapp.services.BookService;
import com.S2O.webapp.services.StudyNotesServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/notes")
public class StudyNotesController {
    @Autowired
    private StudyNotesServices studyNotesServices;

    @GetMapping("/all")
    public ResponseEntity<List<StudyNotes>> getAllNotes() {
        List<StudyNotes> studyNotes = studyNotesServices.getAllNotes();
        return ResponseEntity.ok(studyNotes);
    }

    @PostMapping("/add/note")
    public ResponseEntity<StudyNotes> createNotes(@RequestParam("notes") String noteJson, @RequestParam("file") MultipartFile file) throws IOException {
        StudyNotes studyNotes = new ObjectMapper().readValue(noteJson, StudyNotes.class);
        return ResponseEntity.ok(studyNotesServices.saveNootes(studyNotes, file));
    }

    @PutMapping("/edit/note/{id}")
    public ResponseEntity<StudyNotes> updateNote(@PathVariable Long id, @RequestParam("notes") String noteJson, @RequestParam("file") MultipartFile file) throws IOException {
        StudyNotes studyNotes = new ObjectMapper().readValue(noteJson, StudyNotes.class);
        studyNotes.setId(id);
        return ResponseEntity.ok(studyNotesServices.saveNootes(studyNotes, file));
    }

    @DeleteMapping("/delete/note/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable Long id) {
        studyNotesServices.deleteNotesById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/download/note/{id}/pdf")
    public ResponseEntity<ByteArrayResource> downloadNotePdf(@PathVariable Long id) {
        Optional<StudyNotes> noteOptional = studyNotesServices.getNotesById(id);
        if (noteOptional.isPresent()) {
            StudyNotes studyNotes = noteOptional.get();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + studyNotes.getTitle() + ".pdf\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(new ByteArrayResource(studyNotes.getPdfFile()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/cover/note/{id}")
    public ResponseEntity<ByteArrayResource> getNoteCover(@PathVariable Long id) {
        Optional<StudyNotes> bookOptional = studyNotesServices.getNotesById(id);
        if (bookOptional.isPresent()) {
            try {
                byte[] imageData = studyNotesServices.getFirstPageAsImage(bookOptional.get().getPdfFile());
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_PNG)
                        .body(new ByteArrayResource(imageData));
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
