package com.crud.controller;

import com.crud.entity.Policy;
import com.crud.entity.User;
import com.crud.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/policy")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    @PostMapping("/add")
    public Policy createPolicy(@RequestBody Policy policy) {
        return policyService.createPolicy(policy);
    }

    @GetMapping()
    public List<Policy> getAllPolicies() {
        return policyService.getAllPolicies();
    }

    @GetMapping("/user/{userId}")
    public List<Policy> getPoliciesByUserId(@PathVariable Long userId) {
        return policyService.getPoliciesByUserId(userId);
    }

    @PostMapping("/assign/{policyId}/{userId}")
    public User addPolicytoUser(@PathVariable Long policyId, @PathVariable Long userId){
       return policyService.addPolicytoUser(policyId, userId);
    }

}
