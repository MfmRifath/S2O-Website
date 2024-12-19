package com.S2O.webapp.utility;

import com.S2O.webapp.Entity.Role;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    private String secretKey = "b1f3^XsdZ9@9pl#TkPj2G5w8AqH2GpYz"; // Original secret key
    private String urlSafeEncodedSecretKey = Base64.getUrlEncoder().encodeToString(secretKey.getBytes()); // Base64-encoded secret key

    // Generate JWT token
    public String generateToken(String username, Long userId, Set<Role> roles) {
        return Jwts.builder()
                .setSubject(username)
                .claim("userId", userId)  // Include userId in the token
                .claim("roles", roles.stream().map(Role::getAuthority).collect(Collectors.toList()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24 hours
                .signWith(SignatureAlgorithm.HS256, urlSafeEncodedSecretKey) // Use Base64 encoded key here
                .compact();
    }

    // Extract claims from JWT token
    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()   // Use parserBuilder() for newer versions
                .setSigningKey(urlSafeEncodedSecretKey)  // Use the encoded secret key
                .build()   // Build the parser instance
                .parseClaimsJws(token)
                .getBody();
    }

    // Extract userId from JWT token
    public Long extractUserId(String token) {
        Claims claims = extractClaims(token);
        // Extract userId from token's claims
        return claims.get("userId", Long.class);
    }

    // Extract username from JWT token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Check if the token is expired
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // Validate the JWT token
    public boolean validateToken(String token, String username) {
        return (username.equals(extractUsername(token)) && !isTokenExpired(token));
    }
}