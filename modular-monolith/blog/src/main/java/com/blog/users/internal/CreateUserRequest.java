package com.blog.users.internal;

/**
 * INTERNAL: the JSON body expected when creating a user, e.g.
 * { "name": "Vaishnavi", "email": "v@example.com" }
 */
public record CreateUserRequest(String name, String email) {
}
