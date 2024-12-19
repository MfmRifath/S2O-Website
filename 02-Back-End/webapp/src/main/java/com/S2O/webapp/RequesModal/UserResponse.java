package com.S2O.webapp.RequesModal;

import java.util.Set;

public class UserResponse {

    private String username;
    private Set<String> roles;

    // Constructor
    public UserResponse(String username, Set<String> roles) {
        this.username = username;
        this.roles = roles;
    }

    // Getters and Setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}