package com.crud.controller;

import com.crud.dto.PolicyPlanRequest;
import com.crud.dto.PolicyPlanResponse;
import com.crud.entity.PolicyPlan;
import com.crud.service.PolicyPlanservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/admin")
public class AdminPolicyController {

    @Autowired
    private PolicyPlanservice service;

    // Add a new policy
    @PostMapping("/{adminId}/policy-plans")
    public PolicyPlanResponse addPlan(@PathVariable Long adminId, @RequestBody PolicyPlanRequest request) {
        PolicyPlan plan = service.createPlan(request, adminId);
        return new PolicyPlanResponse(plan);
    }

    // Update a policy (only by the admin who created it)
    @PutMapping("/{adminId}/policy-plans/{planId}")
    public PolicyPlanResponse updatePlan(@PathVariable Long adminId,
                                         @PathVariable Long planId,
                                         @RequestBody PolicyPlanRequest request) {
        PolicyPlan plan = service.updatePlan(planId, request, adminId);
        return new PolicyPlanResponse(plan);
    }

    // Delete a policy (only by the admin who created it)
    @DeleteMapping("/{adminId}/policy-plans/{planId}")
    public String deletePlan(@PathVariable Long adminId, @PathVariable Long planId) {
        service.deletePlan(planId, adminId);
        return "Policy Plan with ID " + planId + " deleted successfully!";
    }

    // Get policies created by a specific admin
    @GetMapping("/{adminId}/policy-plans")
    public List<PolicyPlanResponse> getPlansByAdmin(@PathVariable Long adminId) {
        return service.getPlansByAdmin(adminId)
                .stream()
                .map(PolicyPlanResponse::new)
                .collect(Collectors.toList());
    }

    // Get all policies (for users or admin viewing all)
    @GetMapping("/policy-plans/all")
    public List<PolicyPlanResponse> getAllPlans() {
        return service.getAllPlans()
                .stream()
                .map(PolicyPlanResponse::new)
                .collect(Collectors.toList());
    }
}
