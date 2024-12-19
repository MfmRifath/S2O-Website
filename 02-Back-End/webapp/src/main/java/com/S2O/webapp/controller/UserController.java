package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Role;
import com.S2O.webapp.Entity.User;
import com.S2O.webapp.RequesModal.ApiResponse;
import com.S2O.webapp.error.ApiError;
import com.S2O.webapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/roles/{userId}")
    public ResponseEntity<?> getUserRoles(@PathVariable Long userId) {
        // Fetch the user by ID
        User user = userService.findById(userId);

        // Handle case where user is not found
        if (user == null) {
            ApiError error = new ApiError("User not found", HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }

        // Extract roles and return them
        Set<String> roles = user.getRoles().stream().map(Role::getAuthority).collect(Collectors.toSet());
        ApiResponse response = new ApiResponse(roles);
        return ResponseEntity.ok(response);
    }
}

// ApiResponse class

