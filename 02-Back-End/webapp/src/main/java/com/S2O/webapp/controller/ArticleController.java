package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Article;
import com.S2O.webapp.RequesModal.CreateArticleRequestModal;
import com.S2O.webapp.services.ArticleServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private  ArticleServices articleServices;

    @Autowired
    public ArticleController(ArticleServices articleServices){
        this.articleServices=articleServices;
    }


    @GetMapping("/all")
    public ResponseEntity<List<Article>> getAllArticles(){
        try {
            List<Article> articles =articleServices.getAllArticles();
            return new ResponseEntity<>(articles, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("/add/article")
    public ResponseEntity<String> addArticle(@RequestBody CreateArticleRequestModal createArticleRequestModal) {
        try {
            if (createArticleRequestModal == null) {
                throw new IllegalArgumentException("Request body cannot be null");
            }
            if (createArticleRequestModal .getAuthor() == null || createArticleRequestModal.getAuthor().isEmpty()) {
                throw new IllegalArgumentException("Author is required");
            }
            if (createArticleRequestModal .getTitle() == null || createArticleRequestModal.getTitle().isEmpty()) {
                throw new IllegalArgumentException("Author is required");
            }
            if (createArticleRequestModal.getContent() == null || createArticleRequestModal.getContent().isEmpty()) {
                throw new IllegalArgumentException("Content name is required");
            }
            if (createArticleRequestModal.getDate() == null) {
                throw new IllegalArgumentException("Date is required");
            }
            if (createArticleRequestModal.getAuthorQualification() == null || createArticleRequestModal.getAuthorQualification().isEmpty()) {
                throw new IllegalArgumentException("Author Qualification  is required");
            }
            if (createArticleRequestModal.getImg() == null || createArticleRequestModal.getImg().isEmpty()) {
                throw new IllegalArgumentException("Img is required");
            }
            if (createArticleRequestModal.getImg1() == null || createArticleRequestModal.getImg1().isEmpty()) {
                throw new IllegalArgumentException("Img1 is required");
            }
            if (createArticleRequestModal.getImg2()== null || createArticleRequestModal.getImg2().isEmpty()) {
                throw new IllegalArgumentException("Img2 is required");
            }


            articleServices.createArticle(createArticleRequestModal);

            return new ResponseEntity<>("Article added successfully", HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Invalid input: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to add Article: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/edit/article/{id}")
    public ResponseEntity<String> editArticle(@PathVariable Long id, @RequestBody CreateArticleRequestModal createArticleRequestModal) {
        try {
            if (createArticleRequestModal == null) {
                throw new IllegalArgumentException("Request body cannot be null");
            }
            if (createArticleRequestModal.getAuthor() == null || createArticleRequestModal.getAuthor().isEmpty()) {
                throw new IllegalArgumentException("Author is required");
            }
            if (createArticleRequestModal.getTitle() == null || createArticleRequestModal.getTitle().isEmpty()) {
                throw new IllegalArgumentException("Author is required");
            }
            if (createArticleRequestModal.getAuthorQualification() == null || createArticleRequestModal.getAuthorQualification().isEmpty()) {
                throw new IllegalArgumentException("Author Qualification name is required");
            }
            if (createArticleRequestModal.getContent() == null || createArticleRequestModal.getContent().isEmpty()) {
                throw new IllegalArgumentException("Content qualification is required");
            }
            if (createArticleRequestModal.getDate() == null ) {
                throw new IllegalArgumentException("Date is required");
            }
            if (createArticleRequestModal.getImg() == null || createArticleRequestModal.getImg().isEmpty()) {
                throw new IllegalArgumentException("Img link is required");
            }
            if (createArticleRequestModal.getImg1() == null || createArticleRequestModal.getImg1().isEmpty()) {
                throw new IllegalArgumentException("Img1 is required");
            }

            if (createArticleRequestModal.getImg2() == null ||createArticleRequestModal.getImg2().isEmpty()) {
                throw new IllegalArgumentException("Img2 image is required");
            }

            articleServices.updateArticle(id,createArticleRequestModal);

            return new ResponseEntity<>("Article updated successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            e.printStackTrace();
            return new ResponseEntity<>("Invalid input: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to update Admin: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/delete/article/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable Long id) {
        try {
            articleServices.deleteArticleById(id);
            return new ResponseEntity<>("Article deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Failed to delete article: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
