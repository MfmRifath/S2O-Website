package com.S2O.webapp.services;

import com.S2O.webapp.Entity.Administration;
import com.S2O.webapp.RequesModal.AdminitrationRequestModal;
import com.S2O.webapp.dao.AdministrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdministrationService {
    @Autowired
    private AdministrationRepository administrationRepository;

    public void createAdministration(AdminitrationRequestModal adminitrationRequestModal) {
        Administration administration = new Administration();
        administration.setDesignation(adminitrationRequestModal.getDesignation());
        administration.setAdminName(adminitrationRequestModal.getAdminName());
        administration.setInsta(adminitrationRequestModal.getInsta());
        administration.setLinkedIn(adminitrationRequestModal.getLinkedIn());
        administration.setEmail(adminitrationRequestModal.getEmail());
        administration.setAdminQualification(adminitrationRequestModal.getAdminQualification());
        administration.setYear(adminitrationRequestModal.getYear());
        administration.setAdminImg(adminitrationRequestModal.getAdminImg());

        administrationRepository.save(administration);
    }

    public List<Administration> getAllAdministrations() {
        return administrationRepository.findAll();
    }

    public Optional<Administration> getAdministrationById(Long id) {
        return administrationRepository.findById(id);
    }

    public Administration updateAdministration(Long id, AdminitrationRequestModal adminitrationRequestModal) {
        if (administrationRepository.existsById(id)) {
            Administration administration = administrationRepository.findById(id).orElseThrow(() -> new RuntimeException("Administration not found with id " + id));
            administration.setDesignation(adminitrationRequestModal.getDesignation());
            administration.setAdminName(adminitrationRequestModal.getAdminName());
            administration.setInsta(adminitrationRequestModal.getInsta());
            administration.setLinkedIn(adminitrationRequestModal.getLinkedIn());
            administration.setEmail(adminitrationRequestModal.getEmail());
            administration.setAdminQualification(adminitrationRequestModal.getAdminQualification());
            administration.setYear(adminitrationRequestModal.getYear());
            administration.setAdminImg(adminitrationRequestModal.getAdminImg());
            return administrationRepository.save(administration);
        } else {
            throw new RuntimeException("Administration not found with id " + id);
        }
    }

    public void deleteAdministration(Long id) {
        if (administrationRepository.existsById(id)) {
            administrationRepository.deleteById(id);
        } else {
            throw new RuntimeException("Administration not found with id " + id);
        }
    }
}
