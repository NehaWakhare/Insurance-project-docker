package com.crud.service;

import com.crud.entity.Admin;
import com.crud.entity.UserPolicy;

import java.util.List;
import java.util.Optional;

public interface AdminService {

    Admin registerAdmin(Admin admin);

    Optional<Admin> findByEmail(String email);

    List<Admin> getAllAdmins();

    Admin save(Admin admin);

    Optional<Admin> findById(Long id);

    void deleteById(Long id);

    UserPolicy activatePolicy(Long policyId);

    UserPolicy rejectPolicy(Long policyId);

    UserPolicy updateNomineeDetails(Long policyId, String nominee, String nomineeRelation);

    void expireExpiredPolicies();
}
