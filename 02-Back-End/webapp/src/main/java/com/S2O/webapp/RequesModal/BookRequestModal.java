package com.S2O.webapp.RequesModal;

import lombok.Data;

@Data
public class BookRequestModal {


    private Long id;

    private String title;

    private String author;

    private String coverImage;

    private String description;

    private String publisher;

    private String publicationDate;

    private String genre;

    private int pages;

    private String readOnlineLink;

    private byte[] pdfFile;

}
