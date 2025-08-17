package com.example.project;

import com.example.project.DTO.LoginRequest;
import com.example.project.DTO.UserRegistrationDto;
import com.example.project.Entities.Role;
import com.example.project.Entities.User;
import com.example.project.Repositores.UserRepository;
import com.example.project.Services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTests {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private User user;
    private UserRegistrationDto dto;
    private LoginRequest loginRequest;

    @BeforeEach
    void setUp() {
        dto = new UserRegistrationDto();
        dto.setEmail("test@example.com");
        dto.setPassword("password123");
        dto.setFirstName("John");
        dto.setLastName("Doe");
        dto.setAge(30);
        dto.setHobby("Reading");
        dto.setPhotoUrl("http://photo.url");

        user = new User();
        user.setId(1L);
        user.setEmail(dto.getEmail());
        user.setPassword("encodedPassword");
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setAge(dto.getAge());
        user.setHobby(dto.getHobby());
        user.setPhotoUrl(dto.getPhotoUrl());

        loginRequest = new LoginRequest(dto.getEmail(), "password123");
    }

    // Done so we avoid registering a user that already exists
    @Test
    void registerUser_Throws_WhenUserExists() {
        when(userRepository.findByEmail(dto.getEmail())).thenReturn(Optional.of(user));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.registerUser(dto);
        });

        assertEquals("User already exists", exception.getMessage());
    }

    // Done so we handle user search when email does not exist
    @Test
    void findByEmail_Throws_WhenNotFound() {
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.findByEmail(user.getEmail());
        });

        assertEquals("User Not Found", exception.getMessage());
    }

    // Done so login fails gracefully if user email not found
    @Test
    void loginUser_Throws_WhenUserNotFound() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.loginUser(loginRequest);
        });

        assertEquals("User not found with email " + loginRequest.getEmail(), exception.getMessage());
    }

    // Done so login fails if password does not match
    @Test
    void loginUser_Throws_WhenPasswordWrong() {
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())).thenReturn(false);

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.loginUser(loginRequest);
        });

        assertEquals("Wrong password", exception.getMessage());
    }

    // Done so we correctly assign ADMIN role to a user
    @Test
    void giveAdminRoleToUser_Success() {
        user.setRole(Role.USER);
        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(user);

        userService.giveAdminRoleToUser(user.getId());

        assertEquals(Role.ADMIN, user.getRole());
        verify(userRepository).save(user);
    }

    // Done so we handle the case when trying to give admin role to a non-existent user
    @Test
    void giveAdminRoleToUser_Throws_WhenUserNotFound() {
        when(userRepository.findById(user.getId())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userService.giveAdminRoleToUser(user.getId());
        });

        assertEquals("User not found", exception.getMessage());
    }
}
