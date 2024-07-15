package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.exceptions.NoSuchUserException;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.RoleService;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminController {

    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public AdminController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping("/users")
    public List<User> showAllUsers() {
        return userService.listUsers();
    }

    @GetMapping("/users/{id}")
    public User showUser(@PathVariable long id) {
        User user = userService.findById(id);
        if (user == null) {
            throw new NoSuchUserException("There's no user with ID = " + id + " in the database");
        }
        return user;
    }

    @PostMapping("/users")
    public User addUser(@RequestBody User user) {
        userService.add(user);
        return user;
    }

    @PutMapping("/users")
    public User updateUser(@RequestBody User user) {
        userService.update(user);
        return user;
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable long id) {
        User user = userService.findById(id);
        if (user == null) {
            throw new NoSuchUserException("There's no user with ID = " + id + " in the database");
        }
        userService.delete(id);
        return "User with ID = " + id + " was deleted";
    }

    @GetMapping("/roles")
    public List<Role> getAllRoles() {
        return roleService.listRoles();
    }
}
