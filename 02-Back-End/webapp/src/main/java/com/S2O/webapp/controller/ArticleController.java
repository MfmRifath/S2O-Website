package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Article;
import com.S2O.webapp.Entity.Image;
import com.S2O.webapp.RequesModal.CreateArticleRequestModal;
import com.S2O.webapp.services.ArticleServices;
import com.S2O.webapp.services.AwsService;
import com.S2O.webapp.services.ImageService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleServices articleServices;
    private final AwsService awsService;
    private final ImageService imageService;

    @Autowired
    public ArticleController(ArticleServices articleServices, AwsService awsService, ImageService imageService) {
        this.articleServices = articleServices;
        this.awsService = awsService;
        this.imageService = imageService;
    }
    @Autowired
    private ObjectMapper objectMapper;

    @EntityGraph(attributePaths = {"images"})
    @GetMapping("/all")
    public ResponseEntity<List<Article>> getAllArticles() {
        try {
            List<Article> articles = articleServices.getAllArticles();
            articles.forEach(article -> {
                article.getImages().forEach(image -> {
                    String presignedUrl = imageService.getPresignedUrl(image.getKeyName());
                    image.setUrl(presignedUrl); // Set the generated URL in the Image object
                });
            });
            return new ResponseEntity<>(articles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @PostMapping(value = "/add/article", consumes = "multipart/form-data")
    public ResponseEntity<String> addArticle(
            @RequestParam("article") String articleData,
            @RequestPart("images") List<MultipartFile> images
    ) {
        try {
            CreateArticleRequestModal articleRequest = objectMapper.readValue(articleData, CreateArticleRequestModal.class);
            articleServices.createArticle(articleRequest, images);

            return new ResponseEntity<>("Article added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to add article: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/edit/article/{id}", consumes = {"multipart/form-data", "application/json"})
    public ResponseEntity<String> editArticle(
            @PathVariable Long id,
            @RequestParam(value = "article", required = false) String articleData,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {
        try {
            // Initialize images as empty list if null to avoid NPE
            if (images == null) images = new ArrayList<>();

            if (articleData == null) {
                throw new IllegalArgumentException("Article data is missing");
            }

            CreateArticleRequestModal articleRequest = objectMapper.readValue(articleData, CreateArticleRequestModal.class);
            articleServices.updateArticle(id, articleRequest, images);

            return new ResponseEntity<>("Article updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to update article: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/delete/article/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable Long id) {
        try {
            Article article = articleServices.getArticleById(id);
            for (Image image : article.getImages()) {
                awsService.deleteFile("s2ooluvilimages", image.getUrl());
            }
            articleServices.deleteArticleById(id);
            return new ResponseEntity<>("Article deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to delete article: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
