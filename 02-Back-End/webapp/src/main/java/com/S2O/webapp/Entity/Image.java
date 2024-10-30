package com.S2O.webapp.Entity;

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
    File file;

    @ManyToOne
    @JoinColumn(name = "article_id", insertable = false, updatable = false) // Ensure unique column name and settings
    @JsonBackReference
    private Article article;

    @ManyToOne
    @JoinColumn(name = "gallery_id", insertable = false, updatable = false) // Ensure unique column name and settings
    @JsonBackReference
    private Gallery gallery;

    @OneToOne
    @JoinColumn(name = "administration_id", referencedColumnName = "id") // Unique name to avoid conflict with primary key
    @JsonBackReference
    private Administration administration;
}
