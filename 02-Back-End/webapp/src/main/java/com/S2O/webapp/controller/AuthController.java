package com.S2O.webapp.controller;

import com.S2O.webapp.Entity.Role;
import com.S2O.webapp.Entity.User;
import com.S2O.webapp.RequesModal.LoginRequest;
import com.S2O.webapp.RequesModal.SignUpRequest;
import com.S2O.webapp.RequesModal.UserResponse;
import com.S2O.webapp.dao.RoleRepository;
import com.S2O.webapp.dao.UserRepository;
import com.S2O.webapp.utility.JwtResponse;
import com.S2O.webapp.utility.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "Authorization")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository; // Inject RoleRepository

    // Constructor injection
    public AuthController(JwtUtil jwtUtil, UserRepository userRepository, PasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest) {
        System.out.println("Login Attempt: " + loginRequest.getUsername());

        // Find user by username
        Optional<User> user = userRepository.findByUsername(loginRequest.getUsername());

        if (user.isPresent()) {
            System.out.println("User found: " + user.get().getUsername());

            // Check if the password matches
            if (passwordMatches(loginRequest.getPassword(), user.get().getPassword())) {
                System.out.println("Password matches. Generating token...");
                String token = jwtUtil.generateToken(user.get().getUsername(), user.get().getId(), user.get().getRoles());
                return ResponseEntity.ok(new JwtResponse(token));
            } else {
                System.out.println("Password mismatch.");
            }
        } else {
            System.out.println("User not found.");
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        // Check if passwords match
        if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match.");
        }

        // Check if the username is already taken
        if (userRepository.findByUsername(signUpRequest.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username is already taken.");
        }

        // Create new user and hash password
        User newUser = new User();
        newUser.setUsername(signUpRequest.getUsername());
        newUser.setEmail(signUpRequest.getEmail());
        newUser.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        // Assign default role (fetch from database if possible)
        Role defaultRole = roleRepository.findByAuthority("ROLE_ADMIN")
                .orElseThrow(() -> new RuntimeException("Role not found"));
        newUser.setRoles(Collections.singleton(defaultRole));  // Assign the default role

        // Save the user to the database
        userRepository.save(newUser);

        // Return success response
        return ResponseEntity.ok("User registered successfully.");
    }

    // Method to compare raw password with hashed password
    private boolean passwordMatches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    @GetMapping("/currentUser")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String token) {
        try {
            System.out.println("Authorization Header: " + token); // Log the token header

            // Remove Bearer prefix if it exists
            String jwt = token.startsWith("Bearer ") ? token.replace("Bearer ", "") : token;

            // Extract the username from the JWT
            String username = jwtUtil.extractUsername(jwt);

            if (username == null || jwtUtil.isTokenExpired(jwt)) {
                return ResponseEntity.status(401).body("Invalid or expired token");
            }

            // Fetch user from the database
            Optional<User> user = userRepository.findByUsername(username);
            if (user.isPresent()) {
                // Map user roles to a set of role names (authorities)
                Set<String> roles = user.get().getRoles().stream()
                        .map(Role::getAuthority)
                        .collect(Collectors.toSet());

                // Create and return the UserResponse DTO
                UserResponse response = new UserResponse(user.get().getUsername(), roles);
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(404).body("User not found");
            }
        } catch (Exception e) {
            // Log the error (optional)
            e.printStackTrace();
            return ResponseEntity.status(401).body("Invalid token");
        }
    }
}