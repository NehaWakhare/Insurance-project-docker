package com.crud.service;

import com.crud.entity.User;

import java.util.List;


public interface UserService {

    public User createUser(User user);

    public User getUserById(Long id);

    public List<User> getAllUsers();

    public User updateUser(Long id, User register);

    public void deleteUser(Long id);

    // for login
    String loginUser(String email, String password);
}
