package com.crud.serviceimpl;

import com.crud.entity.Admin;
import com.crud.entity.UserPolicy;
import com.crud.repository.AdminRepository;
import com.crud.service.AdminService;
import com.crud.service.UserPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserPolicyService userPolicyService;

    @Override
    public Admin registerAdmin(Admin admin) {
        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        if (admin.getPanNumber() != null && adminRepository.findByPanNumber(admin.getPanNumber()).isPresent()) {
            throw new RuntimeException("PAN number already registered");
        }

        admin.setRole(com.crud.enums.Role.ADMIN);
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
    public Admin save(Admin admin) {
        return adminRepository.save(admin);
    }

    @Override
    public Optional<Admin> findById(Long id) {
        return adminRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        adminRepository.deleteById(id);
    }

    @Override
    @Transactional
    public UserPolicy activatePolicy(Long policyId) {
        UserPolicy policy = userPolicyService.getPolicyById(policyId);
        policy.setPolicyStatus("ACTIVE");
        return userPolicyService.updatePolicy(policyId, policy);
    }

    @Override
    @Transactional
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
