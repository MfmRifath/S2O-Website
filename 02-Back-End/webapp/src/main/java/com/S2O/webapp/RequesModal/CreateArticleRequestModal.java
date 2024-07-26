package com.S2O.webapp.RequesModal;

import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateArticleRequestModal {


    private Long articleId;


    private String author;
    private String authorQualification;
    private String title;


    private String content;

    private LocalDate date;


    private String img;


    private String img1;


    private String img2;

    @Override
    public String toString() {
        return "CreateArticleRequestModal{" +
                "articleId=" + articleId +
                ", author='" + author + '\'' +
                ", authorQualification='" + authorQualification + '\'' +
                ", content='" + content + '\'' +
                ", date=" + date +
                ", img='" + img + '\'' +
                ", img1='" + img1 + '\'' +
                ", img2='" + img2 + '\'' +
                '}';
    }
}

