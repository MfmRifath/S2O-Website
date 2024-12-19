package com.S2O.webapp.utility;

// A simple DTO (Data Transfer Object) to return JWT token in the response
public class JwtResponse {

    private String token;

    // Constructor
    public JwtResponse(String token) {
        this.token = token;
    }

    // Getter for token
    public String getToken() {
        return token;
    }

    // Setter for token
    public void setToken(String token) {
        this.token = token;
    }
}