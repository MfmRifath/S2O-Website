package com.S2O.webapp.RequesModal;

import lombok.Data;

import java.util.List;

@Data
public class UserDTO {
    private String username;
    private String email;
    private String password;
    private List<String> roles;

    // Getters and setters
}