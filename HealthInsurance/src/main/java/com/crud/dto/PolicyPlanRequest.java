package com.crud.dto;

public class PolicyPlanRequest {
    private String policyName;
    private String policyType;
    private Double coverage;
    private Double premium;
    private Integer durationInYears;

    // Getters & Setters
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
}
