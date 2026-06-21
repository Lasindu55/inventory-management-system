package com.inventory.service;

import com.inventory.dto.*;
import com.inventory.model.User;
import com.inventory.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository repo;

    public String register(RegisterRequest req) {

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); // later BCrypt
        user.setRole(req.getRole());

        repo.save(user);

        return "User Registered Successfully";
    }

    public AuthResponse login(LoginRequest req) {

        User user = repo.findByEmail(req.getEmail())
                .orElse(null);

        if (user == null) {
            return new AuthResponse("User Not Found", null);
        }

        if (!user.getPassword().equals(req.getPassword())) {
            return new AuthResponse("Invalid Password", null);
        }

       return new AuthResponse(
    "Login Success",
    user.getRole() != null ? user.getRole().name() : "USER"
);
    }
}