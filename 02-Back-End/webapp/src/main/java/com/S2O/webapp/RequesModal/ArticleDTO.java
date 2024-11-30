package com.S2O.webapp.RequesModal;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ArticleDTO {
    private Long articleId;
    private String author;
    private String authorQualification;
    private String title;
    private String content;
    private LocalDate date;
    private List<ImageDTO> images;
}