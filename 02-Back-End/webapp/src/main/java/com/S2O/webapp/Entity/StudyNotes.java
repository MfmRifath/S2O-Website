package com.S2O.webapp.Entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "notes")
public class StudyNotes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notes_id")
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "teacher")
    private String author;



    @Column(name = "discription")
    private String description;
    @Column(name = "publisher")
    private String publisher;
    @Column(name = "date")
    private String publicationDate;
    @Column(name = "subject")
    private String subject;
    @Column(name = "pages")
    private int pages;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB",name = "notes_pdf")
    private byte[] pdfFile;
}
