package com.S2O.webapp.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "articleId")
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

    @JsonManagedReference("article-Image")
    @BatchSize(size = 10)// Indicate the parent side
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "article")
    private List<Image> images;


}
