package com.blog.users.internal;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * INTERNAL: saves and loads users. Spring generates the implementation for you
 * (save, findById, existsById, findAll, delete ...).
 */
public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
}
