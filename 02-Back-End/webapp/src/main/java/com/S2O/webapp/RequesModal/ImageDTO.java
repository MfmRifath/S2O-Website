package com.S2O.webapp.RequesModal;

import lombok.Data;

@Data
public class ImageDTO {
    private String keyName;
    private String url;

    public ImageDTO(String keyName, String url) {
        this.keyName = keyName;
        this.url = url;
    }
}