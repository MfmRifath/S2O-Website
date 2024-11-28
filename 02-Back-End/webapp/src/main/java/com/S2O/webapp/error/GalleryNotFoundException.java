package com.S2O.webapp.error;

public class GalleryNotFoundException extends RuntimeException {
    public GalleryNotFoundException(String message) {
        super(message);
    }
}