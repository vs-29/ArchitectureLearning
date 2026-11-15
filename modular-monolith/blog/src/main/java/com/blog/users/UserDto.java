package com.blog.users;

/**
 * PUBLIC: the data other modules (posts, comments) are allowed to see about a user.
 * It is a plain copy, so the database entity never leaks outside the users module.
 */
public record UserDto(Long id, String name, String email) {
}
