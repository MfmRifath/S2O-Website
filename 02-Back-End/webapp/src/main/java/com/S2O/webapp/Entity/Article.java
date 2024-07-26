package com.S2O.webapp.Entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "article")
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Long articleId;

    @Column(name = "author")
    private String author;


    @Column(name = "author_qualification")
    private String authorQualification;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "img")
    private String img;

    @Column(name="img1")
    private String img1;

    @Column(name = "img2")
    private String img2;

}
