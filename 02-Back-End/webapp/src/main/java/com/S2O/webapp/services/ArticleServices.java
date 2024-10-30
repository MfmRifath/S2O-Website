package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Article;
import com.S2O.webapp.Entity.Image;
import com.S2O.webapp.RequesModal.CreateArticleRequestModal;
import com.S2O.webapp.dao.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ArticleServices {

    private final ArticleRepository articleRepository;

    private final ImageService imageService;

    @Autowired
    public ArticleServices(ArticleRepository articleRepository, ImageService imageService){
        this.articleRepository = articleRepository;
        this.imageService = imageService;
    }

    public List<Article> getAllArticles() {
        List<Article> articles = articleRepository.findAllWithImages();
        articles.forEach(article -> {
            article.getImages().forEach(image -> image.setUrl(imageService.getPresignedUrl(image.getKeyName())));
        });
        return articles;
    }



    public Article getArticleById(Long id) {
        return articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));
    }

    public void createArticle(CreateArticleRequestModal createArticleRequestModal, List<MultipartFile> images) throws IOException {
        Article article = new Article();
        article.setAuthor(createArticleRequestModal.getAuthor());
        article.setAuthorQualification(createArticleRequestModal.getAuthorQualification());
        article.setTitle(createArticleRequestModal.getTitle());
        article.setContent(createArticleRequestModal.getContent());
        article.setDate(createArticleRequestModal.getDate());

        List<Image> articleImages = new ArrayList<>();
        for (MultipartFile imageFile : images) {
            String imageUrl = imageService.uploadImage(imageFile);
            Image articleImage = new Image();
            articleImage.setUrl(imageUrl);
            articleImage.setKeyName(imageFile.getOriginalFilename()); // Ensure keyName is set
            articleImage.setArticle(article); // Link image to article
            articleImages.add(articleImage);
        }
        article.setImages(articleImages);

        articleRepository.save(article);
    }

    @Transactional
    public Article updateArticle(Long id, CreateArticleRequestModal createArticleRequestModal, List<MultipartFile> images) throws IOException {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with Id " + id));

        article.setAuthor(createArticleRequestModal.getAuthor());
        article.setAuthorQualification(createArticleRequestModal.getAuthorQualification());
        article.setTitle(createArticleRequestModal.getTitle());
        article.setContent(createArticleRequestModal.getContent());
        article.setDate(createArticleRequestModal.getDate());

        if (images != null && !images.isEmpty()) {
            List<Image> articleImages = new ArrayList<>();
            for (MultipartFile imageFile : images) {
                String imageUrl = imageService.uploadImage(imageFile);
                Image articleImage = new Image();
                articleImage.setUrl(imageUrl);
                articleImage.setArticle(article);
                articleImages.add(articleImage);
            }
            article.getImages().clear();
            article.getImages().addAll(articleImages);
        }

        return articleRepository.save(article);
    }


    public void deleteArticleById(Long id) {
        if (articleRepository.existsById(id)) {
            articleRepository.deleteById(id);
        } else {
            throw new RuntimeException("Article not found for Id " + id);
        }
    }
}
