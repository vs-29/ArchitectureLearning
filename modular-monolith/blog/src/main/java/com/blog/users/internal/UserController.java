package com.blog.users.internal;

import com.blog.users.UserDto;
import com.blog.users.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * INTERNAL: HTTP endpoints for users.
 *   POST /api/users       -> create a user
 *   GET  /api/users/{id}  -> fetch a user (404 if not found)
 */
@RestController
@RequestMapping("/api/users")
class UserController {

    private final UserService userService;

    UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    ResponseEntity<UserDto> create(@RequestBody CreateUserRequest request) {
        UserDto created = userService.createUser(request.name(), request.email());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    ResponseEntity<UserDto> getById(@PathVariable Long id) {
        return ResponseEntity.of(userService.findById(id));
    }

    // Turns "email already registered" into a 400 Bad Request instead of a 500 error
    @ExceptionHandler(IllegalArgumentException.class)
    ResponseEntity<String> handleBadRequest(IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
