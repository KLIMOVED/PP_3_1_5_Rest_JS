package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.models.User;

@RestController
@RequestMapping("/api")
public class UserController {

    @GetMapping("/user")
    public User showUserInfo(Authentication authentication) {
        return (User) authentication.getPrincipal();
    }
}
