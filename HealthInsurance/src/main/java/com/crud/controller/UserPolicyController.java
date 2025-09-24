package com.crud.controller;

import com.crud.dto.UserPolicyResponse;
import com.crud.entity.UserPolicy;
import com.crud.service.UserPolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserPolicyController {

    @Autowired
    private UserPolicyService userPolicyService;

    @GetMapping("/{userId}/policies")
    public List<UserPolicyResponse> getPoliciesByUser(@PathVariable Long userId) {
        List<UserPolicy> policies = userPolicyService.getAllPoliciesByUserId(userId);
        return policies.stream()
                .map(UserPolicyResponse::new)
                .collect(Collectors.toList());
    }
}
