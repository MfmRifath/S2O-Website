package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Article;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article,Long> {
    @EntityGraph(attributePaths = {"images"})
    List<Article> findAll();

    @Query("SELECT a FROM Article a LEFT JOIN FETCH a.images")
    List<Article> findAllWithImages();

}
