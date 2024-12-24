package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Role;
import com.S2O.webapp.dao.RoleRepository;
import com.S2O.webapp.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(user -> new User(user.getUsername(), user.getPassword(), user.getAuthorities()))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public com.S2O.webapp.Entity.User findById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }


    @Autowired
    private RoleRepository roleRepository;

    // Create or update user with roles
    public com.S2O.webapp.Entity.User saveUser(com.S2O.webapp.Entity.User user, Set<String> roleNames) {
        Set<Role> roles = new HashSet<>();
        for (String roleName : roleNames) {
            Role role = roleRepository.findByAuthority(roleName);
            if (role != null) {
                roles.add(role);
            }
        }
        user.setRoles(roles);
        return userRepository.save(user);
    }
    // Edit user functionality
    public com.S2O.webapp.Entity.User updateUser(Long userId, com.S2O.webapp.Entity.User updatedUser, Set<String> roleNames) {
        // Find the user by ID
        com.S2O.webapp.Entity.User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update user details
        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setEmail(updatedUser.getEmail());
        if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
            existingUser.setPassword(updatedUser.getPassword()); // Consider hashing here
        }

        // Update roles
        Set<Role> updatedRoles = new HashSet<>();
        for (String roleName : roleNames) {
            Role role = roleRepository.findByAuthority(roleName);
            if (role != null) {
                updatedRoles.add(role);
            }
        }
        existingUser.setRoles(updatedRoles);

        // Save updated user
        return userRepository.save(existingUser);
    }
    // Get all users
    public List<com.S2O.webapp.Entity.User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public Optional<com.S2O.webapp.Entity.User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Delete user by ID
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
    public void updatePassword(com.S2O.webapp.Entity.User user) {
        userRepository.save(user); // Save the updated user entity
    }
}