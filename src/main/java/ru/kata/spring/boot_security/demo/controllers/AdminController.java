package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

@Controller
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/admin")
    public String showAllUsers(Model model, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        model.addAttribute("authUser", user);
        model.addAttribute("newUser", new User());
        model.addAttribute("allUsers", userService.listUsers());
        model.addAttribute("allRoles", roleService.listRoles());
        model.addAttribute("activeTab", "usersTable");
        return "admin";
    }

    @PostMapping("/admin")
    public String addUser(@ModelAttribute("newUser") User user, Model model) {
        model.addAttribute("activeTab", "newUser");
        userService.add(user);
        return "redirect:/admin";
    }

    @PatchMapping("/admin")
    public String updateUser(@ModelAttribute("user") User user) {
        userService.update(user);
        return "redirect:/admin";
    }

    @DeleteMapping("/admin")
    public String deleteUser(@RequestParam("id") Long id) {
        userService.delete(id);
        return "redirect:/admin";
    }
}
