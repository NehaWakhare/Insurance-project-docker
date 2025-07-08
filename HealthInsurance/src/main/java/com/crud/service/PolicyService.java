package com.crud.service;

import com.crud.entity.Policy;
import com.crud.entity.User;

import java.util.List;

public interface PolicyService {

    public Policy createPolicy(Policy policy);

    public List<Policy> getAllPolicies();

    public Policy getPolicyById(Long id);

    public Policy updatePolicy(Long id, Policy policy);

    public void deletePolicy(Long id);

    List<Policy> getPoliciesByUserId(Long userId);

    public User addPolicytoUser (Long policyId, Long userId);
}

