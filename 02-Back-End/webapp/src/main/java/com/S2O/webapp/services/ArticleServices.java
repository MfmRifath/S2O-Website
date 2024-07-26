package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Article;
import com.S2O.webapp.RequesModal.CreateArticleRequestModal;
import com.S2O.webapp.dao.ArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleServices {

    private ArticleRepository articleRepository;

    public ArticleServices(ArticleRepository articleRepository){
        this.articleRepository=articleRepository;
    }
    public List<Article> getAllArticles(){
        return articleRepository.findAll();
    }

    public void createArticle(CreateArticleRequestModal createArticleRequestModal){

        Article article =new Article();

        article.setAuthor(createArticleRequestModal.getAuthor());
        article.setAuthorQualification(createArticleRequestModal.getAuthorQualification());
        article.setTitle(createArticleRequestModal.getTitle());
        article.setContent(createArticleRequestModal.getContent());
        article.setDate(createArticleRequestModal.getDate());
        article.setImg(createArticleRequestModal.getImg());
        article.setImg1(createArticleRequestModal.getImg1());
        article.setImg2(createArticleRequestModal.getImg2());

        articleRepository.save(article);

    }

    public Article updateArticle(Long id,CreateArticleRequestModal createArticleRequestModal){
        if(articleRepository.existsById(id)){
            Article article = articleRepository.findById(id).orElseThrow(()-> new RuntimeException("Article is not found with Id"+id));

            article.setAuthor(createArticleRequestModal.getAuthor());
            article.setAuthorQualification(createArticleRequestModal.getAuthorQualification());
            article.setTitle(createArticleRequestModal.getTitle());
            article.setContent(createArticleRequestModal.getContent());
            article.setDate(createArticleRequestModal.getDate());
            article.setImg(createArticleRequestModal.getImg());
            article.setImg1(createArticleRequestModal.getImg1());
            article.setImg2(createArticleRequestModal.getImg2());

            return articleRepository.save(article);
        }
        else {
            throw new RuntimeException("Article is not Found in this Id " + id);
        }
    }

    public void deleteArticleById(Long id){
        if(articleRepository.existsById(id)){
            articleRepository.deleteById(id);
        }
        else {
            throw new RuntimeException("Article is not found for this Id"+id);
        }
    }

}
