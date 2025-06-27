package com.crud.serviceimpl;

import com.crud.entity.User;
import com.crud.repository.UserRepository;
import com.crud.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserImpl implements UserService {

    @Autowired
    private UserRepository repository;

    @Override
    public User createUser(User user) {

        return repository.save(user);
    }

    @Override
    public User getUserById(Long id) {
        return repository.findById(id).get();

    }

    @Override
    public List<User> getAllUsers() {

        return repository.findAll();
    }

    @Override
    public User updateUser(Long id, User user) {
        Optional<User> users = repository.findById(id);
        if (users.isPresent()) {
            User user1 = users.get();
            user1.setUserName(user.getUserName());
            user1.setEmail(user.getEmail());
            user1.setPassword(user.getPassword());
            return repository.save(user1);
        } else {
            return null;
        }

    }

    @Override
    public void deleteUser(Long id) {
        Optional<User> users = repository.findById(id);
        if (users.isPresent()) {
            repository.deleteById(id);
        }
    }

    @Override
    public String loginUser(String email, String password) {
        Optional<User> user = repository.findByEmailAndPassword(email, password);
        if (user.isPresent()) {
            return "user login successfully";
        } else {
            return "Invalid credentials";
        }


    }
}
