package com.S2O.webapp.Entity;
import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "examPaper")
public class ExamPaper {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paper_id")
    private Long id;
    @Column(name = "title")
    private String title;
    @Column(name = "Year")
    private Long Year;


    @ManyToOne
    @JoinColumn(name = "exam_paper_cover_image_id")
    private Image coverImage;

    @Column(name = "pages")
    private int pages;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB",name = "book_pdf")
    private byte[] pdfFile;

    // Getters and setters
}
