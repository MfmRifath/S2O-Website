package com.S2O.webapp.Entity;

import com.S2O.webapp.Entity.Administration;
import com.S2O.webapp.Entity.Article;
import com.S2O.webapp.Entity.Gallery;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.io.File;

@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@Data
@Entity
@Table(name = "image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(nullable = false)
    private String keyName; // Store only the S3 key

    @Transient
    private String url; // Temporary URL for pre-signed link

    @Column(name = "file")
    private File file;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = true) // Allow null for images not associated with an Article
    @JsonBackReference("article-Image")
    private Article article;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gallery_id", nullable = true) // Allow null for images not associated with a Gallery
    @JsonBackReference("gallery-images")
    private Gallery gallery;

    @OneToOne
    @JoinColumn(name = "administration_id", nullable = true) // Allow null for images not associated with Administration
    @JsonBackReference
    private Administration administration;

    @Override
    public String toString() {
        return "Image{" +
                "id=" + id +
                ", keyName='" + keyName + '\'' +
                '}'; // Avoid including 'gallery'
    }
}