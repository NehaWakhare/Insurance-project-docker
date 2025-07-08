package com.crud.serviceimpl;

import com.crud.entity.Policy;
import com.crud.entity.User;
import com.crud.repository.PolicyRepository;
import com.crud.repository.UserRepository;
import com.crud.service.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PolicyImpl implements PolicyService {

    @Autowired
    private PolicyRepository repository;

    @Autowired
    private UserRepository userRepo;

    @Override
    public Policy createPolicy(Policy policy) {
        return repository.save(policy);
    }

    @Override
    public List<Policy> getAllPolicies() {
        return repository.findAll();
    }

    @Override
    public Policy getPolicyById(Long id) {

        return repository.findById(id).get();
    }

    @Override
    public Policy updatePolicy(Long id, Policy updatedpolicy) {
        Optional<Policy> policies = repository.findById(id);
        if (policies.isPresent()) {
            Policy existingPolicy = policies.get();
            existingPolicy.setPolicyName(updatedpolicy.getPolicyName());
            existingPolicy.setPolicyType(updatedpolicy.getPolicyType());
            existingPolicy.setStartDate(updatedpolicy.getStartDate());
            existingPolicy.setEndDate(updatedpolicy.getEndDate());
            existingPolicy.setStatus(updatedpolicy.getStatus());
            existingPolicy.setNominee(updatedpolicy.getNominee());
            existingPolicy.setNomineeRelation(updatedpolicy.getNomineeRelation());
            return repository.save(existingPolicy);
        } else {
            return null;
        }
    }

    @Override
    public void deletePolicy(Long id) {
        Optional<Policy> policies = repository.findById(id);
        if (policies.isPresent()) {
            repository.deleteById(id);

        }
    }

    @Override
    public List<Policy> getPoliciesByUserId(Long userId) {
        return repository.findByUserUserId(userId);
    }


    @Override
    public User addPolicytoUser(Long policyId, Long userId) {
        Policy policy1 = repository.findById(policyId).get();
        User user = userRepo.findById(userId).get();
        policy1.setUser(user);
        repository.save(policy1);
        return user;

    }




}
