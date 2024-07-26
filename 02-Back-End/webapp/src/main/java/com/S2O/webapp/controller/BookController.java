package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Book;
import com.S2O.webapp.services.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @PostMapping("/add/book")
    public ResponseEntity<Book> createBook(@RequestParam("book") String bookJson, @RequestParam("file") MultipartFile file) throws IOException {
        Book book = new ObjectMapper().readValue(bookJson, Book.class);
        return ResponseEntity.ok(bookService.saveBook(book, file));
    }

    @PutMapping("/edit/book/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestParam("book") String bookJson, @RequestParam("file") MultipartFile file) throws IOException {
        Book book = new ObjectMapper().readValue(bookJson, Book.class);
        book.setId(id);
        return ResponseEntity.ok(bookService.saveBook(book, file));
    }

    @DeleteMapping("/delete/book/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBookById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/download/book/{id}/pdf")
    public ResponseEntity<ByteArrayResource> downloadBookPdf(@PathVariable Long id) {
        Optional<Book> bookOptional = bookService.getBookById(id);
        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + book.getTitle() + ".pdf\"")
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(new ByteArrayResource(book.getPdfFile()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
