package com.S2O.webapp.RequesModal;

import java.util.Set;

public class ApiResponse {
    private Set<String> roles;

    public ApiResponse(Set<String> roles) {
        this.roles = roles;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}