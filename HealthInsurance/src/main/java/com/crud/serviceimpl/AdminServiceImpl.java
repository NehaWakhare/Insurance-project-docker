package com.crud.serviceimpl;

import com.crud.entity.Admin;
import com.crud.enums.Role;
import com.crud.repository.AdminRepository;
import com.crud.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public Admin registerAdmin(Admin admin) {
        Optional<Admin> existing = adminRepository.findByEmail(admin.getEmail());
        if (existing.isPresent()) {
            throw new RuntimeException("Admin with email already exists");
        }
        admin.setRole(Role.ADMIN);
        return adminRepository.save(admin);
    }

    @Override
    public Admin save(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Optional<Admin> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    @Override
    public Optional<Admin> findById(Long id) {
        return adminRepository.findById(id);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        adminRepository.deleteById(id);
    }

    @Override
    public List<Admin> getAdminsByRole(Role role) {
        return adminRepository.findByRole(role);
    }

    @Override
    public void expireExpiredPolicies() {
        // Implement policy expiration logic
    }

    @Override
    public com.crud.entity.UserPolicy activatePolicy(Long policyId) {
        // Implement activate policy logic
        return null;
    }

    @Override
    public com.crud.entity.UserPolicy rejectPolicy(Long policyId) {
        // Implement reject policy logic
        return null;
    }
}