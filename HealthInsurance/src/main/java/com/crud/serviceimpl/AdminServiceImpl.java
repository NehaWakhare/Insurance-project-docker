package com.crud.serviceimpl;

import com.crud.entity.Admin;
import com.crud.enums.AdminStatus;
import com.crud.repository.AdminRepository;
import com.crud.service.AdminService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    public AdminServiceImpl(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public Admin registerAdmin(Admin admin) {
        admin.setStatus(AdminStatus.PENDING);
        return adminRepository.save(admin);
    }

    @Override
    public Optional<Admin> findByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    @Override
    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public List<Admin> getAdminsByStatus(AdminStatus status) {
        return adminRepository.findByStatus(status);
    }

    @Override
    public Admin updateStatus(Long adminId, AdminStatus status) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        admin.setStatus(status);
        return adminRepository.save(admin);
    }

    @Override
    public Admin save(Admin admin) {
        return adminRepository.save(admin); // ✅ return entity back
    }
}
