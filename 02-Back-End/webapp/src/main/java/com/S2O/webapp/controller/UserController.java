package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Role;
import com.S2O.webapp.Entity.User;
import com.S2O.webapp.RequesModal.ApiResponse;
import com.S2O.webapp.RequesModal.UserDTO;
import com.S2O.webapp.error.ApiError;
import com.S2O.webapp.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;  // Inject BCryptPasswordEncoder

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

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserDTO userDTO) {
        User userEntity = new User();
        userEntity.setUsername(userDTO.getUsername());
        userEntity.setEmail(userDTO.getEmail());
        userEntity.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        // roles to set
        Set<String> roles = new HashSet<>(userDTO.getRoles());
        User savedUser = userService.saveUser(userEntity, roles);
        return ResponseEntity.ok(savedUser);
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Get user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete user by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        try {
            // Map UserDTO to User entity
            com.S2O.webapp.Entity.User updatedUser = new com.S2O.webapp.Entity.User();
            updatedUser.setUsername(userDTO.getUsername());
            updatedUser.setEmail(userDTO.getEmail());

            // Encrypt the password before updating the user
            if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
                updatedUser.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            } else {
                updatedUser.setPassword(userDTO.getPassword()); // Keep the current password if not provided
            }

            // Update the user
            com.S2O.webapp.Entity.User user = userService.updateUser(id, updatedUser, new HashSet<>(userDTO.getRoles()));
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/{id}/change-password")
    public ResponseEntity<?> changePassword(
            @PathVariable Long id,
            @RequestParam String currentPassword,
            @RequestParam String newPassword) {
        try {
            // Fetch the user by ID
            User user = userService.findById(id);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiError("User not found", HttpStatus.NOT_FOUND.value()));
            }

            // Validate the current password
            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiError("Current password is incorrect", HttpStatus.BAD_REQUEST.value()));
            }

            // Encrypt and set the new password
            user.setPassword(passwordEncoder.encode(newPassword));

            // Save the updated user
            userService.updatePassword(user);

            return ResponseEntity.ok(new ApiResponse(Collections.singleton("Password updated successfully")));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiError("An error occurred: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
}