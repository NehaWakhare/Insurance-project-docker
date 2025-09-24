package com.crud.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "policy_plans")
public class PolicyPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String policyName;
    private String policyType;
    private Double coverage;
    private Double premium;
    private Integer durationInYears;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "admin_id")
    private Admin admin;

    // ===== Getters & Setters =====
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPolicyName() { return policyName; }
    public void setPolicyName(String policyName) { this.policyName = policyName; }

    public String getPolicyType() { return policyType; }
    public void setPolicyType(String policyType) { this.policyType = policyType; }

    public Double getCoverage() { return coverage; }
    public void setCoverage(Double coverage) { this.coverage = coverage; }

    public Double getPremium() { return premium; }
    public void setPremium(Double premium) { this.premium = premium; }

    public Integer getDurationInYears() { return durationInYears; }
    public void setDurationInYears(Integer durationInYears) { this.durationInYears = durationInYears; }

    public Admin getAdmin() { return admin; }
    public void setAdmin(Admin admin) { this.admin = admin; }
}
