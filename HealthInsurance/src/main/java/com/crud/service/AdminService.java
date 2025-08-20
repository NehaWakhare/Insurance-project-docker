package com.crud.service;

import com.crud.entity.Admin;

import java.util.List;

public interface AdminService {
    Admin registerAdmin(Admin admin);
    Admin loginAdmin(String email, String password);
    List<Admin> getPendingAdmins();
    Admin approveAdmin(Long id);
    Admin rejectAdmin(Long id);
}
