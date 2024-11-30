package com.S2O.webapp.controller;

import com.S2O.webapp.RequesModal.ArticleDTO;
import com.S2O.webapp.services.ArticleServices;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final ObjectMapper objectMapper;

    @Autowired
    public ArticleController(ArticleServices articleServices, ObjectMapper objectMapper) {
        this.articleServices = articleServices;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ArticleDTO>> getAllArticles() {
        List<ArticleDTO> articles = articleServices.getAllArticles();
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @PostMapping(value = "/add/article", consumes = "multipart/form-data")
    public ResponseEntity<String> addArticle(
            @RequestParam("article") String articleData,
            @RequestPart("images") List<MultipartFile> images
    ) {
        try {
            ArticleDTO articleDTO = objectMapper.readValue(articleData, ArticleDTO.class);
            articleServices.createArticle(articleDTO, images);
            return new ResponseEntity<>("Article added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to add article: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping(value = "/edit/article/{id}", consumes = "multipart/form-data")
    public ResponseEntity<String> editArticle(
            @PathVariable Long id,
            @RequestParam("article") String articleData,
            @RequestPart(value = "images", required = false) List<MultipartFile> images
    ) {
        try {
            if (images == null) images = new ArrayList<>();
            ArticleDTO articleDTO = objectMapper.readValue(articleData, ArticleDTO.class);
            articleServices.updateArticle(id, articleDTO, images);
            return new ResponseEntity<>("Article updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to update article: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/article/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable Long id) {
        try {
            articleServices.deleteArticleById(id);
            return new ResponseEntity<>("Article deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to delete article: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}