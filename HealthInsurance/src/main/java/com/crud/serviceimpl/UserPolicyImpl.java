package com.crud.serviceimpl;

import com.crud.dto.PurchaseRequest;
import com.crud.entity.PolicyPlan;
import com.crud.entity.UserPolicy;
import com.crud.repository.PolicyPlanRepository;
import com.crud.repository.UserPolicyRepository;
import com.crud.service.UserPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserPolicyImpl implements UserPolicyService {

    @Autowired
    private PolicyPlanRepository policyPlanRepository;

    @Autowired
    private UserPolicyRepository userPolicyRepository;

    @Override
    public UserPolicy purchasePolicy(PurchaseRequest request) {
        PolicyPlan plan = policyPlanRepository.findById(request.getPolicyId())
                .orElseThrow(() -> new RuntimeException("Policy Plan not found"));

        // Create UserPolicy manually without builder
        UserPolicy userPolicy = new UserPolicy();
        userPolicy.setUserId(request.getUserId());
        userPolicy.setPolicyPlan(plan);
        userPolicy.setStartDate(LocalDate.now());
        userPolicy.setEndDate(LocalDate.now().plusYears(plan.getDurationInYears()));
        userPolicy.setPolicyStatus("ACTIVE");
        userPolicy.setNominee(request.getNominee());
        userPolicy.setNomineeRelation(request.getNomineeRelation());

        return userPolicyRepository.save(userPolicy);
    }

    @Override
    public UserPolicy getPolicyByUserId(Long userId) {
        return userPolicyRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Policy not found for user ID: " + userId));
    }

    @Override
    public List<UserPolicy> getAllPoliciesByUserId(Long userId) {
        return userPolicyRepository.findAllByUserId(userId);
    }
}
