package com.crud.serviceimpl;

import com.crud.entity.Admin;
import com.crud.entity.UserPolicy;
import com.crud.enums.AdminStatus;
import com.crud.enums.Role;
import com.crud.repository.AdminRepository;
import com.crud.service.AdminService;
import com.crud.service.UserPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserPolicyService userPolicyService;

    @Override
    public Admin registerAdmin(Admin admin) {
        // basic uniqueness checks
        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        if (admin.getGstNumber() != null && adminRepository.findByGstNumber(admin.getGstNumber()).isPresent()) {
            throw new RuntimeException("GST number already registered");
        }

        admin.setStatus(AdminStatus.PENDING);
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        admin.setRole(Role.ADMIN);
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
    @Transactional
    public Admin updateStatus(Long adminId, AdminStatus status) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        admin.setStatus(status);
        return adminRepository.save(admin);
    }

    @Override
    public Optional<Admin> findByGstNumber(String gstNumber) {
        return adminRepository.findByGstNumber(gstNumber);
    }

    @Override
    public Admin save(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public UserPolicy activatePolicy(Long policyId) {
        UserPolicy policy = userPolicyService.getPolicyById(policyId);
        policy.setPolicyStatus("ACTIVE");
        return userPolicyService.updatePolicy(policyId, policy);
    }

    @Override
    public UserPolicy rejectPolicy(Long policyId) {
        UserPolicy policy = userPolicyService.getPolicyById(policyId);
        policy.setPolicyStatus("REJECTED");
        return userPolicyService.updatePolicy(policyId, policy);
    }

    @Override
    public UserPolicy updateNomineeDetails(Long policyId, String nominee, String nomineeRelation) {
        return userPolicyService.updateNomineeDetails(policyId, nominee, nomineeRelation);
    }

    @Override
    public void expireExpiredPolicies() {
        List<UserPolicy> activePolicies = userPolicyService.getAllPolicies();
        for (UserPolicy policy : activePolicies) {
            if (policy.getEndDate().isBefore(LocalDate.now()) &&
                    "ACTIVE".equalsIgnoreCase(policy.getPolicyStatus())) {
                policy.setPolicyStatus("INACTIVE");
                userPolicyService.updatePolicy(policy.getId(), policy);
            }
        }
    }
}

