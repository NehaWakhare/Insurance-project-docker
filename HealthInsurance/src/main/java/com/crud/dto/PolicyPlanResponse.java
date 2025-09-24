package com.crud.dto;

import com.crud.entity.PolicyPlan;

public class PolicyPlanResponse {
    private Long id;
    private String policyName;
    private String policyType;
    private Double coverage;
    private Double premium;
    private Integer durationInYears;
    private AdminResponse admin;

    // Constructor to map from PolicyPlan entity
    public PolicyPlanResponse(PolicyPlan plan) {
        this.id = plan.getId();
        this.policyName = plan.getPolicyName();
        this.policyType = plan.getPolicyType();
        this.coverage = plan.getCoverage();
        this.premium = plan.getPremium();
        this.durationInYears = plan.getDurationInYears();
        if (plan.getAdmin() != null) {
            this.admin = new AdminResponse(plan.getAdmin().getId(),
                    plan.getAdmin().getUsername(),
                    plan.getAdmin().getEmail());
        }
    }

    // Nested Admin response
    public static class AdminResponse {
        private Long id;
        private String username;
        private String email;

        public AdminResponse(Long id, String username, String email) {
            this.id = id;
            this.username = username;
            this.email = email;
        }

        // Getters
        public Long getId() { return id; }
        public String getUsername() { return username; }
        public String getEmail() { return email; }
    }

    // Getters for PolicyPlanResponse
    public Long getId() { return id; }
    public String getPolicyName() { return policyName; }
    public String getPolicyType() { return policyType; }
    public Double getCoverage() { return coverage; }
    public Double getPremium() { return premium; }
    public Integer getDurationInYears() { return durationInYears; }
    public AdminResponse getAdmin() { return admin; }
}
