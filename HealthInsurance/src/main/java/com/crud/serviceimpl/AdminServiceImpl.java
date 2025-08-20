package com.crud.serviceimpl;

import com.crud.entity.Admin;

import com.crud.enums.AdminStatus;
import com.crud.enums.Role;
import com.crud.repository.AdminRepository;
import com.crud.service.AdminService;

import com.crud.util.SuperAdminNotifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final SuperAdminNotifier notifier;

    public AdminServiceImpl(AdminRepository adminRepository, SuperAdminNotifier notifier) {
        this.adminRepository = adminRepository;
        this.notifier = notifier;
    }

    @Override
    public Admin registerAdmin(Admin admin) {
        admin.setStatus(AdminStatus.PENDING);
        admin.setRole(Role.ADMIN);
        Admin saved = adminRepository.save(admin);
        notifier.notifyNewAdmin(saved);
        return saved;
    }

    @Override
    public Admin loginAdmin(String email, String password) {
        return adminRepository.findByEmailAndPasswordAndStatus(email, password, AdminStatus.APPROVED)
                .orElseThrow(() -> new RuntimeException("Invalid credentials or account not approved"));
    }

    @Override
    public List<Admin> getPendingAdmins() {
        return adminRepository.findByStatus(AdminStatus.PENDING);
    }

    @Override
    public Admin approveAdmin(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        admin.setStatus(AdminStatus.APPROVED);
        return adminRepository.save(admin);
    }

    @Override
    public Admin rejectAdmin(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        admin.setStatus(AdminStatus.REJECTED);
        return adminRepository.save(admin);
    }
}
