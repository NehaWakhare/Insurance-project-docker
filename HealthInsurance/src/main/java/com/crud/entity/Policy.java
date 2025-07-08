package com.crud.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Policy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long policyId;

    private String policyName;

    private String policyType;

    private LocalDate startDate;

    private LocalDate endDate;
    private double coverageAmount;
    private double premium;

    private String status;

    private String nominee;

    private String nomineeRelation;


    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "user_id")  // foreign key
    private User user;

    public Policy(Long policyId, String policyName, String policyType, LocalDate startDate, LocalDate endDate, Double coverageAmount,
                  Double premium, String status, String nominee, String nomineeRelation) {
        this.policyId = policyId;
        this.policyName = policyName;
        this.policyType = policyType;
        this.startDate = startDate;
        this.endDate = endDate;
        this.coverageAmount = coverageAmount;
        this.premium = premium;
        this.status = status;
        this.nominee = nominee;
        this.nomineeRelation = nomineeRelation;

    }

    public Policy() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {

        this.user = user;
    }

    public Long getPolicyId() {
        return policyId;
    }

    public void setPolicyId(Long policyId) {
        this.policyId = policyId;
    }

    public String getPolicyName() {
        return policyName;
    }

    public void setPolicyName(String policyName) {
        this.policyName = policyName;
    }

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String policyType) {
        this.policyType = policyType;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public double getCoverageAmount() {
        return coverageAmount;
    }

    public void setCoverageAmount(double coverageAmount) {
        this.coverageAmount = coverageAmount;
    }

    public double getPremium() {
        return premium;
    }

    public void setPremium(double premium) {
        this.premium = premium;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNominee() {
        return nominee;
    }

    public void setNominee(String nominee) {
        this.nominee = nominee;
    }

    public String getNomineeRelation() {
        return nomineeRelation;
    }

    public void setNomineeRelation(String nomineeRelation) {
        this.nomineeRelation = nomineeRelation;
    }
}
