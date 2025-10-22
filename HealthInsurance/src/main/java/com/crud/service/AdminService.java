package com.crud.service;

import com.crud.entity.Admin;
import com.crud.enums.Role;
import java.util.List;
import java.util.Optional;

public interface AdminService {

    Admin registerAdmin(Admin admin);
    Admin save(Admin admin);
    Optional<Admin> findByEmail(String email);
    Optional<Admin> findById(Long id);
    List<Admin> getAllAdmins();
    void deleteById(Long id);

    List<Admin> getAdminsByRole(Role role);

    // Policy related methods
    void expireExpiredPolicies();
    com.crud.entity.UserPolicy activatePolicy(Long policyId);
    com.crud.entity.UserPolicy rejectPolicy(Long policyId);
}
