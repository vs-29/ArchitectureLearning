package com.blog.users.internal;

import com.blog.users.UserDto;
import com.blog.users.UserService;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * INTERNAL: the real logic behind the public UserService interface.
 * Other modules only know the interface, never this class.
 */
@Service
@Transactional
class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    // Spring passes the repository in automatically (constructor injection)
    UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto createUser(String name, String email) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already registered: " + email);
        }
        User saved = userRepository.save(new User(name, email));
        return toDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserDto> findById(Long id) {
        return userRepository.findById(id).map(this::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }

    // Converts the internal entity into the public DTO
    private UserDto toDto(User user) {
        return new UserDto(user.getId(), user.getName(), user.getEmail());
    }
}
