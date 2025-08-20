package com.crud.controller;

import com.crud.entity.Admin;
import com.crud.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/register")
    public Admin register(@RequestBody Admin admin) {
        return adminService.registerAdmin(admin);
    }

    @PostMapping("/login")
    public Admin login(@RequestParam String email, @RequestParam String password) {
        return adminService.loginAdmin(email, password);
    }

    @GetMapping("/pending")
    public List<Admin> getPendingAdmins() {
        return adminService.getPendingAdmins();
    }

    @PutMapping("/approve/{id}")
    public Admin approve(@PathVariable Long id) {
        return adminService.approveAdmin(id);
    }

    @PutMapping("/reject/{id}")
    public Admin reject(@PathVariable Long id) {
        return adminService.rejectAdmin(id);
    }
}
