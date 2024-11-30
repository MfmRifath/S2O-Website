package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Article;
import com.S2O.webapp.Entity.Image;
import com.S2O.webapp.RequesModal.ArticleDTO;
import com.S2O.webapp.RequesModal.ImageDTO;
import com.S2O.webapp.dao.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ArticleServices {

    private final ArticleRepository articleRepository;
    private final ImageService imageService;

    @Autowired
    public ArticleServices(ArticleRepository articleRepository, ImageService imageService) {
        this.articleRepository = articleRepository;
        this.imageService = imageService;
    }

    // Get all articles with images
    public List<ArticleDTO> getAllArticles() {
        return articleRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    // Get a single article by ID
    public ArticleDTO getArticleById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));
        return convertToDTO(article);
    }

    // Create an article
    public void createArticle(ArticleDTO articleDTO, List<MultipartFile> images) throws IOException {
        Article article = mapToEntity(articleDTO);
        List<Image> articleImages = new ArrayList<>();

        for (MultipartFile imageFile : images) {
            String imageKey = imageService.uploadImage(imageFile);
            Image articleImage = new Image();
            articleImage.setKeyName(imageKey);
            articleImage.setArticle(article);
            articleImages.add(articleImage);
        }
        article.setImages(articleImages);
        articleRepository.save(article);
    }

    // Update an article
    @Transactional
    public void updateArticle(Long id, ArticleDTO articleDTO, List<MultipartFile> images) throws IOException {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with Id " + id));

        article.setAuthor(articleDTO.getAuthor());
        article.setAuthorQualification(articleDTO.getAuthorQualification());
        article.setTitle(articleDTO.getTitle());
        article.setContent(articleDTO.getContent());
        article.setDate(articleDTO.getDate());

        if (images != null && !images.isEmpty()) {
            article.getImages().forEach(image -> imageService.deleteImage(image.getKeyName()));
            article.getImages().clear();

            for (MultipartFile imageFile : images) {
                String imageKey = imageService.uploadImage(imageFile);
                Image articleImage = new Image();
                articleImage.setKeyName(imageKey);
                articleImage.setArticle(article);
                article.getImages().add(articleImage);
            }
        }

        articleRepository.save(article);
    }

    // Delete an article by ID
    public void deleteArticleById(Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id " + id));

        article.getImages().forEach(image -> imageService.deleteImage(image.getKeyName()));
        articleRepository.delete(article);
    }

    // Map Article entity to DTO
    private ArticleDTO convertToDTO(Article article) {
        ArticleDTO dto = new ArticleDTO();
        dto.setArticleId(article.getArticleId());
        dto.setAuthor(article.getAuthor());
        dto.setAuthorQualification(article.getAuthorQualification());
        dto.setTitle(article.getTitle());
        dto.setContent(article.getContent());
        dto.setDate(article.getDate());
        dto.setImages(article.getImages().stream()
                .map(image -> new ImageDTO(image.getKeyName(), imageService.getPresignedUrl(image.getKeyName())))
                .collect(Collectors.toList()));
        return dto;
    }

    // Map DTO to Article entity
    private Article mapToEntity(ArticleDTO dto) {
        Article article = new Article();
        article.setAuthor(dto.getAuthor());
        article.setAuthorQualification(dto.getAuthorQualification());
        article.setTitle(dto.getTitle());
        article.setContent(dto.getContent());
        article.setDate(dto.getDate());
        return article;
    }
}