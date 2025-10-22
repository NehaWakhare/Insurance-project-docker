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
    private AdminProfileRepository adminProfileRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public AdminProfile createAdmin(AdminProfile adminProfile) {
        //  Check if Admin exists
        Admin admin = adminRepository.findByEmail(adminProfile.getEmail()).orElse(null);

        if (admin == null) {
            throw new RuntimeException("Admin not found for email: " + adminProfile.getEmail() +
                    ". Please register admin first before creating profile.");
        }

        // Prevent duplicate profile
        if (admin.getProfile() != null) {
            throw new RuntimeException("Admin profile already exists for email: " + admin.getEmail());
        }

        // Link profile to admin
        adminProfile.setAdmin(admin);
        admin.setProfile(adminProfile);

        // Save profile
        return adminProfileRepository.save(adminProfile);
    }

    @Override
    public List<AdminProfile> getAllAdmins() {
        return adminProfileRepository.findAll();
    }

    @Override
    public AdminProfile getAdminById(Long id) {
        return adminProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("AdminProfile not found with id " + id));
    }

    @Override
    public AdminProfile updateAdmin(Long id, AdminProfile adminDetails) {
        AdminProfile existingProfile = getAdminById(id);

        existingProfile.setName(adminDetails.getName());
        existingProfile.setEmail(adminDetails.getEmail());
        existingProfile.setPassword(adminDetails.getPassword());
        existingProfile.setPhoneNumber(adminDetails.getPhoneNumber());
        existingProfile.setDateOfBirth(adminDetails.getDateOfBirth());
        existingProfile.setCompanyName(adminDetails.getCompanyName());
        existingProfile.setCompanyType(adminDetails.getCompanyType());
        existingProfile.setGstNumber(adminDetails.getGstNumber());
        existingProfile.setPanNumber(adminDetails.getPanNumber());
        existingProfile.setHeadOfficeAddress(adminDetails.getHeadOfficeAddress());
        existingProfile.setCity(adminDetails.getCity());
        existingProfile.setState(adminDetails.getState());
        existingProfile.setCountry(adminDetails.getCountry());
        existingProfile.setPinCode(adminDetails.getPinCode());
        existingProfile.setCorrespondenceAddress(adminDetails.getCorrespondenceAddress());
        existingProfile.setPermanentAddress(adminDetails.getPermanentAddress());

        // Update linked Admin
        if (existingProfile.getAdmin() != null) {
            Admin admin = existingProfile.getAdmin();
            admin.setUsername(existingProfile.getName());
            admin.setEmail(existingProfile.getEmail());
            adminRepository.save(admin);
        }

        return adminProfileRepository.save(existingProfile);
    }

    @Override
    public void deleteAdmin(Long id) {
        if (!adminProfileRepository.existsById(id)) {
            throw new RuntimeException("AdminProfile not found with id " + id);
        }
        adminProfileRepository.deleteById(id);
    }
}
