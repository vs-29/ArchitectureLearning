package com.blog.users;

import java.util.Optional;

/**
 * PUBLIC API of the users module.
 * This is the ONLY door other modules may use. They must never touch
 * anything inside com.blog.users.internal.
 */
public interface UserService {

    UserDto createUser(String name, String email);

    Optional<UserDto> findById(Long id);

    boolean existsById(Long id);
}
