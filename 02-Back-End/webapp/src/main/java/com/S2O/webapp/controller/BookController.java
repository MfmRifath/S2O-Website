package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Book;
import com.S2O.webapp.services.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestParam("book") String bookJson, @RequestParam("file") MultipartFile file) throws IOException {
        Book book = new ObjectMapper().readValue(bookJson, Book.class);
        return ResponseEntity.ok(bookService.saveBook(book, file));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {
        Optional<Book> book = bookService.getBookById(id);
        return book.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> getBookPdf(@PathVariable Long id) {
        Optional<Book> book = bookService.getBookById(id);
        if (book.isPresent() && book.get().getPdfFile() != null) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + book.get().getTitle() + ".pdf\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(book.get().getPdfFile());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestParam("book") String bookJson, @RequestParam("file") MultipartFile file) throws IOException {
        Book book = new ObjectMapper().readValue(bookJson, Book.class);
        book.setId(id);
        return ResponseEntity.ok(bookService.saveBook(book, file));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBookById(id);
        return ResponseEntity.noContent().build();
    }
}