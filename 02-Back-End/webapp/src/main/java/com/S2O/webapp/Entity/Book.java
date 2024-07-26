package com.S2O.webapp.Entity;
import javax.persistence.*;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String author;
    private String coverImage;
    private String description;
    private String publisher;
    private String publicationDate;
    private String isbn;
    private String genre;
    private int pages;
    private String readOnlineLink;
    private String downloadEpubLink;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] pdfFile;

    // Getters and setters
}
