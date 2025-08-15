package com.example.project.Controllers;

import com.example.project.DTO.LoginRequest;
import com.example.project.DTO.UserRegistrationDto;
import com.example.project.Entities.User;
import com.example.project.Repositores.UserRepository;
import com.example.project.Services.UserService;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping ("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    

    //For registration
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationDto dto){
        try{
            User registeredUser = userService.registerUser(dto);
            return ResponseEntity.ok(registeredUser.getId());
        }
        catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/register/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.findById(id));
    }


    //For login in existing acc
    @PostMapping("/login")
    public  ResponseEntity<?> loginUser(@RequestBody LoginRequest loginDto , HttpSession session){
        boolean valid =  userService.loginUser(loginDto);

        try{
            if(valid){
                session.setAttribute("userEmail", loginDto.getEmail());
                return ResponseEntity.ok(valid);
            }
            else {
                return ResponseEntity.badRequest().body("Invalid username or password");
            }
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage()) ;
        }

    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpSession session){
        session.invalidate();
        return ResponseEntity.ok().build();
    }






}
