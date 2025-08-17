package com.example.project.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

//it is an object through which we get data out of response
@Data
public class UserRegistrationDto {
    private String firstName;
    private String lastName;

    private Integer age;
    private String hobby;
    private String photoUrl;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password; 

}
