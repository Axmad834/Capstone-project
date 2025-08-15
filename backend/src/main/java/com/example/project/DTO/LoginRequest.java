package com.example.project.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;


//Sepereately created dto file for seperate login handling
@Data
@AllArgsConstructor
public class LoginRequest {
    private String email;
    private String password;
}
