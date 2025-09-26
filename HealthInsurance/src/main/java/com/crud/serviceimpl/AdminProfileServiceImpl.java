package com.crud.serviceimpl;

import com.crud.entity.Admin;
import com.crud.entity.AdminProfile;
import com.crud.repository.AdminProfileRepository;
import com.crud.repository.AdminRepository;
import com.crud.service.AdminProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminProfileServiceImpl implements AdminProfileService {

    @Autowired
    private AdminProfileRepository adminRepository;

    @Autowired
    private AdminRepository adminService; // for fetching full Admin object

    @Override
    public AdminProfile createAdmin(AdminProfile adminProfile) {
        // If admin object with id is provided, fetch full Admin from DB
        if (adminProfile.getAdmin() != null && adminProfile.getAdmin().getId() != null) {
            Long adminId = adminProfile.getAdmin().getId();
            Admin fullAdmin = adminService.findById(adminId)
                    .orElseThrow(() -> new RuntimeException("Admin not found with id " + adminId));
            adminProfile.setAdmin(fullAdmin); // set the full admin object
            fullAdmin.setProfile(adminProfile); // ensure both sides are linked
        }
        return adminRepository.save(adminProfile);
    }

    @Override
    public List<AdminProfile> getAllAdmins() {
        return adminRepository.findAll();
    }

    @Override
    public AdminProfile getAdminById(Long id) {
        return adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("AdminProfile not found with id " + id));
    }

    @Override
    public AdminProfile updateAdmin(Long id, AdminProfile adminDetails) {
        AdminProfile adminProfile = getAdminById(id);

        adminProfile.setName(adminDetails.getName());
        adminProfile.setEmail(adminDetails.getEmail());
        adminProfile.setPassword(adminDetails.getPassword());
        adminProfile.setPhoneNumber(adminDetails.getPhoneNumber());
        adminProfile.setDateOfBirth(adminDetails.getDateOfBirth());
        adminProfile.setCompanyName(adminDetails.getCompanyName());
        adminProfile.setCompanyType(adminDetails.getCompanyType());
        adminProfile.setGstNumber(adminDetails.getGstNumber());
        adminProfile.setPanNumber(adminDetails.getPanNumber());
        adminProfile.setHeadOfficeAddress(adminDetails.getHeadOfficeAddress());
        adminProfile.setCity(adminDetails.getCity());
        adminProfile.setState(adminDetails.getState());
        adminProfile.setCountry(adminDetails.getCountry());
        adminProfile.setPinCode(adminDetails.getPinCode());

        // Handle Admin object if provided
        if (adminDetails.getAdmin() != null && adminDetails.getAdmin().getId() != null) {
            Long adminId = adminDetails.getAdmin().getId();
            Admin fullAdmin = adminService.findById(adminId)
                    .orElseThrow(() -> new RuntimeException("Admin not found with id " + adminId));
            adminProfile.setAdmin(fullAdmin);
            fullAdmin.setProfile(adminProfile); // ensure bidirectional mapping
        }

        return adminRepository.save(adminProfile);
    }

    @Override
    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}
