package com.crud.dto;

import com.crud.entity.UserPolicy;

public class UserPolicyResponse {
    private Long id;
    private Long userId;
    private String policyStatus;
    private String nominee;
    private String nomineeRelation;
    private String startDate;
    private String endDate;
    private PolicyPlanResponse policyPlan;

    public UserPolicyResponse(UserPolicy userPolicy) {
        this.id = userPolicy.getId();
        this.userId = userPolicy.getUserId();
        this.policyStatus = userPolicy.getPolicyStatus();
        this.nominee = userPolicy.getNominee();
        this.nomineeRelation = userPolicy.getNomineeRelation();
        this.startDate = userPolicy.getStartDate().toString();
        this.endDate = userPolicy.getEndDate().toString();
        this.policyPlan = new PolicyPlanResponse(userPolicy.getPolicyPlan());
    }
}
