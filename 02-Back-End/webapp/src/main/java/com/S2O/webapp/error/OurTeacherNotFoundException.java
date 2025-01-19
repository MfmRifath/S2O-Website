package com.S2O.webapp.error;

public class OurTeacherNotFoundException extends RuntimeException {
    public OurTeacherNotFoundException(String message) {
        super(message);
    }
}