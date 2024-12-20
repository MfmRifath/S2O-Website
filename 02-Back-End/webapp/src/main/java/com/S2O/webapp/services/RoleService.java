package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Role;

import com.S2O.webapp.dao.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    // Get all roles
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // Get role by ID
    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    // Create or update a role
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    // Delete a role by ID
    public void deleteRoleById(Long id) {
        roleRepository.deleteById(id);
    }
}