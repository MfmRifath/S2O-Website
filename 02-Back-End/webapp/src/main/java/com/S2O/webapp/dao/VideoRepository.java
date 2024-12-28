package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Video;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Long> {
    List<Video> findByTitleContaining(String title); // Optional search feature
}