package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Book;
import com.S2O.webapp.Entity.ExamPaper;
import com.S2O.webapp.services.BookService;
import com.S2O.webapp.services.ExamPaperService;
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
@RequestMapping("/api/examPaper")
public class ExamPaperController {

    @Autowired
    private ExamPaperService examPaperService;

    @GetMapping("/all")
    public ResponseEntity<List<ExamPaper>> getAllexamPaper() {
        List<ExamPaper> books = examPaperService.getAllExamPaper();
        return ResponseEntity.ok(books);
    }

    @PostMapping("/add/examPaper")
    public ResponseEntity<ExamPaper> createExamPaper(@RequestParam("examPaper") String examPaperJson, @RequestParam("file") MultipartFile file) throws IOException {
        ExamPaper examPaper = new ObjectMapper().readValue(examPaperJson, ExamPaper.class);
        return ResponseEntity.ok(examPaperService.saveExamPaper(examPaper, file));
    }

    @PutMapping("/edit/examPaper/{id}")
    public ResponseEntity<ExamPaper> updateExamPaper(@PathVariable Long id, @RequestParam("examPaper") String examPaperJson, @RequestParam("file") MultipartFile file) throws IOException {
        ExamPaper examPaper = new ObjectMapper().readValue(examPaperJson, ExamPaper.class);
        examPaper.setId(id);
        return ResponseEntity.ok(examPaperService.saveExamPaper(examPaper, file));
    }

    @DeleteMapping("/delete/examPaper/{id}")
    public ResponseEntity<Void> deleteExamPaper(@PathVariable Long id) {
        examPaperService.deleteExamPaperById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/download/examPaper/{id}/pdf")
    public ResponseEntity<ByteArrayResource> downloadBookPdf(@PathVariable Long id) {
        Optional<ExamPaper> examPaperOptional = examPaperService.getExamPaperById(id);
        if (examPaperOptional.isPresent()) {
            ExamPaper examPaper = examPaperOptional.get();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + examPaper.getTitle() + ".pdf\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(new ByteArrayResource(examPaper.getPdfFile()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/cover/examPaper/{id}")
    public ResponseEntity<ByteArrayResource> getExamPaperCover(@PathVariable Long id) {
        Optional<ExamPaper> examPaperOptional = examPaperService.getExamPaperById(id);
        if (examPaperOptional.isPresent()) {
            try {
                byte[] imageData = examPaperService.getFirstPageAsImage(examPaperOptional.get().getPdfFile());
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
