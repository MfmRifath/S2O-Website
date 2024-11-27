package com.S2O.webapp.dao;

import com.S2O.webapp.Entity.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image,Long> {
    Optional<Image> findByKeyName(String keyName);
}
