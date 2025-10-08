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
        // Fetch full Admin object if admin ID is provided
        if (adminProfile.getAdmin() != null && adminProfile.getAdmin().getId() != null) {
            Long adminId = adminProfile.getAdmin().getId();
            Admin fullAdmin = adminRepository.findById(adminId)
                    .orElseThrow(() -> new RuntimeException("Admin not found with id " + adminId));

            adminProfile.setAdmin(fullAdmin);
            fullAdmin.setProfile(adminProfile);
        }

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
        adminProfile.setCorrespondenceAddress(adminDetails.getCorrespondenceAddress());
        adminProfile.setPermanentAddress(adminDetails.getPermanentAddress());

        // Update linked Admin if provided
        if (adminDetails.getAdmin() != null && adminDetails.getAdmin().getId() != null) {
            Long adminId = adminDetails.getAdmin().getId();
            Admin fullAdmin = adminRepository.findById(adminId)
                    .orElseThrow(() -> new RuntimeException("Admin not found with id " + adminId));
            adminProfile.setAdmin(fullAdmin);
            fullAdmin.setProfile(adminProfile);
        }

        return adminProfileRepository.save(adminProfile);
    }

    @Override
    public void deleteAdmin(Long id) {
        if (!adminProfileRepository.existsById(id)) {
            throw new RuntimeException("AdminProfile not found with id " + id);
        }
        adminProfileRepository.deleteById(id);
    }
}
