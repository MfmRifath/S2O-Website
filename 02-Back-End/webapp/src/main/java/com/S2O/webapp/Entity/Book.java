package com.S2O.webapp.Entity;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "book_id")
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "author")
    private String author;
    @Column(name = "cover_image")
    private String coverImage;
    @Column(name = "discription")
    private String description;
    @Column(name = "publisher")
    private String publisher;
    @Column(name = "date")
    private String publicationDate;
    @Column(name = "genre")
    private String genre;
    @Column(name = "pages")
    private int pages;
    @Column(name = "read_online_link")
    private String readOnlineLink;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB",name = "book_pdf")
    private byte[] pdfFile;

    // Getters and setters
}
