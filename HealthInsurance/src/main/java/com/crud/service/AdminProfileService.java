package com.crud.service;

import com.crud.entity.AdminProfile;
import java.util.List;

public interface AdminProfileService {
    AdminProfile createAdmin(AdminProfile admin);
    List<AdminProfile> getAllAdmins();
    AdminProfile getAdminById(Long id);
    AdminProfile updateAdmin(Long id, AdminProfile adminDetails);
    void deleteAdmin(Long id);
}
