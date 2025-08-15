package com.example.project.Controllers;

import com.example.project.DTO.UserRegistrationDto;
import com.example.project.Entities.User;
import com.example.project.Repositores.UserRepository;
import com.example.project.Services.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final UserService userService;
    private final UserRepository userRepository;


    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(HttpSession session) {
        String email= (String) session.getAttribute("userEmail");

        if(email == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in");
        }

        User user = userService.findByEmail(email);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(HttpSession session , @RequestBody UserRegistrationDto dto ) {
        String email= (String) session.getAttribute("userEmail");

        if(email == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not logged in");
        }

        User user = userService.findByEmail(email);

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setAge(dto.getAge());
        user.setHobby(dto.getHobby());
        user.setPhotoUrl(dto.getPhotoUrl());

        return ResponseEntity.ok( userRepository.save(user));
    }
}
