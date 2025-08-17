package com.example.project.Services;

import com.example.project.DTO.LoginRequest;
import com.example.project.DTO.UserRegistrationDto;
import com.example.project.Entities.Role;
import com.example.project.Entities.User;
import com.example.project.Repositores.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
//    private final JwtTokenUtil jwtTokenUtil;


    public User registerUser(UserRegistrationDto dto){
        if(userRepository.findByEmail(dto.getEmail()).isPresent()){
            throw new RuntimeException ("User already exists");
        }

        String encodedPassword = passwordEncoder.encode(dto.getPassword());

        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setHobby(dto.getHobby());
        user.setPhotoUrl(dto.getPhotoUrl());
        user.setEmail(dto.getEmail());
        user.setPassword(encodedPassword);


        return userRepository.save(user);
    }

    public User findByEmail(String email){
        return userRepository.findByEmail(email).orElseThrow(()->new RuntimeException ("User Not Found"));
    }

    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }


    //как loginDto связан с entity and db?
    public boolean loginUser(LoginRequest loginDto) {
        User user = userRepository.findByEmail(loginDto.getEmail()).orElseThrow(() -> new RuntimeException("User not found with email " + loginDto.getEmail()));

        if(passwordEncoder.matches(loginDto.getPassword(), user.getPassword())){
            return true;
        }
        throw new RuntimeException("Wrong password");
    }


    public void giveAdminRoleToUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Присваиваем роль ADMIN (или добавляем в список ролей, если они множественные)
        user.setRole(Role.valueOf("ADMIN"));

        // Сохраняем изменения в базе данных
        userRepository.save(user);
    }




//    // Сравниваем пароли, используя BCrypt (если используется хэширование)
//        if (BCrypt.checkpw(loginRequest.getPassword(), user.getPassword())) {
//        return true; // Успешный вход
//    }


}
