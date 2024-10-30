package com.S2O.webapp.RequesModal;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class CreateArticleRequestModal {

    private Long articleId;
    private String author;
    private String authorQualification;
    private String title;
    private String content;
    private LocalDate date;
    private List<String> imagePaths;  // Use List<String> for multiple image paths

    @Override
    public String toString() {
        return "CreateArticleRequestModal{" +
                "articleId=" + articleId +
                ", author='" + author + '\'' +
                ", authorQualification='" + authorQualification + '\'' +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", date=" + date +
                ", imagePaths=" + imagePaths +
                '}';
    }
}
