package com.crud.controller;

import com.crud.confg.JwtUtil;
import com.crud.entity.Admin;
import com.crud.enums.AdminStatus;
import com.crud.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private JwtUtil jwtUtil;

    // DTO for login
    public static class LoginRequest {
        private String email;
        private String password;   // added password field

        public String getEmail() {
            return email;
        }
        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }

    // DTO for OTP verification
    public static class VerifyOtpRequest {
        private String email;
        private String password;   // added password field
        private String otp;

        public String getEmail() {
            return email;
        }
        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }

        public String getOtp() {
            return otp;
        }
        public void setOtp(String otp) {
            this.otp = otp;
        }
    }

    // Register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.registerAdmin(admin));
    }

    // Get all admins
    @GetMapping("/all")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    // Get pending admins
    @GetMapping("/pending")
    public ResponseEntity<List<Admin>> getPendingAdmins() {
        return ResponseEntity.ok(adminService.getAdminsByStatus(AdminStatus.PENDING));
    }

    // Approve Admin
    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approveAdmin(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.updateStatus(id, AdminStatus.APPROVED));
    }

    // Reject Admin
    @PutMapping("/reject/{id}")
    public ResponseEntity<?> rejectAdmin(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.updateStatus(id, AdminStatus.REJECTED));
    }

    // Login (send OTP) -> now requires email + password
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<Admin> optionalAdmin = adminService.findByEmail(request.getEmail());

        if (optionalAdmin.isEmpty())
            return ResponseEntity.badRequest().body("Admin not found");

        Admin admin = optionalAdmin.get();

        if (admin.getStatus() != AdminStatus.APPROVED)
            return ResponseEntity.badRequest().body("Admin not approved by SuperAdmin");

        // Check password
        if (!admin.getPassword().equals(request.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password");
        }

        // Generate OTP
        String otp = String.format("%06d", new Random().nextInt(999999));
        admin.setOtp(otp);
        adminService.save(admin);

        // Send OTP email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(admin.getEmail());
        message.setSubject("Your OTP Code");
        message.setText("Your OTP is: " + otp);
        mailSender.send(message);

        return ResponseEntity.ok("OTP sent to email");
    }

    // Verify OTP + JWT Token -> now requires email + password + otp
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody VerifyOtpRequest request) {
        Optional<Admin> optionalAdmin = adminService.findByEmail(request.getEmail());

        if (optionalAdmin.isEmpty())
            return ResponseEntity.badRequest().body("Admin not found");

        Admin admin = optionalAdmin.get();

        // Check password
        if (!admin.getPassword().equals(request.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid password");
        }

        // Check OTP
        if (!request.getOtp().equals(admin.getOtp())) {
            return ResponseEntity.badRequest().body("Invalid OTP");
        }

        // Generate JWT
        String token = jwtUtil.generateToken(admin.getEmail(), admin.getRole());

        // Clear OTP after successful login
//        admin.setOtp(null);
        adminService.save(admin);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("email", admin.getEmail());
        response.put("role", admin.getRole());

        return ResponseEntity.ok(response);
    }
}
