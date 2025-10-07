package com.crud.serviceimpl;

import com.crud.dto.PolicyPlanRequest;
import com.crud.entity.Admin;
import com.crud.entity.PolicyPlan;
import com.crud.repository.AdminRepository;
import com.crud.repository.PolicyPlanRepository;
import com.crud.service.PolicyPlanservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PolicyPlanImpl implements PolicyPlanservice {

    @Autowired
    private PolicyPlanRepository policyPlanRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public PolicyPlan createPlan(PolicyPlanRequest request, Long adminId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        PolicyPlan plan = new PolicyPlan();
        plan.setPolicyName(request.getPolicyName());
        plan.setPolicyType(request.getPolicyType());
        plan.setCoverage(request.getCoverage());
        plan.setPremium(request.getPremium());
        plan.setDurationInYears(request.getDurationInYears());
        plan.setAdmin(admin);

        return policyPlanRepository.save(plan);
    }

    @Override
    public PolicyPlan updatePlan(Long planId, PolicyPlanRequest request, Long adminId) {
        PolicyPlan existing = policyPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        if (!existing.getAdmin().getId().equals(adminId)) {
            throw new RuntimeException("You cannot update another admin's policy");
        }

        existing.setPolicyName(request.getPolicyName());
        existing.setPolicyType(request.getPolicyType());
        existing.setCoverage(request.getCoverage());
        existing.setPremium(request.getPremium());
        existing.setDurationInYears(request.getDurationInYears());

        return policyPlanRepository.save(existing);
    }

    @Override
    public void deletePlan(Long planId, Long adminId) {
        PolicyPlan existing = policyPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));

        if (!existing.getAdmin().getId().equals(adminId)) {
            throw new RuntimeException("You cannot delete another admin's policy");
        }

        policyPlanRepository.delete(existing);
    }

    @Override
    public List<PolicyPlan> getPlansByAdmin(Long adminId) {
        Admin admin = adminRepository.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        return policyPlanRepository.findByAdmin(admin);
    }



    @Override
    public List<PolicyPlan> getAllPlans() {
        return policyPlanRepository.findAll();
    }

    @Override
    public PolicyPlan getPlanById(Long planId) {
        return policyPlanRepository.findById(planId)
                .orElseThrow(() -> new RuntimeException("Policy not found"));
    }

    @Override
    public PolicyPlan save(PolicyPlan plan) {
        return policyPlanRepository.save(plan);
    }
}
