package com.example.project.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
 import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfiguration {

    // Настройка PasswordEncoder (используется для хранения паролей)
    @Bean
    public PasswordEncoder passwordEncoder() {
//            return NoOpPasswordEncoder.getInstance();
            return new BCryptPasswordEncoder(); // Можно заменить на BCryptPasswordEncoder для реального использования
    }

    // Настройка CORS
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // Разрешаем доступ к API
                        .allowedOrigins("http://localhost:5173") // Разрешаем доступ с фронтенда
                        .allowedMethods("GET", "POST", "PUT", "DELETE" , "OPTIONS") // Разрешаем определенные HTTP методы
                        .allowedHeaders("*")
                        .allowCredentials(true); // Разрешаем отправку cookies

            }
        };
    }

    // Настройка безопасности HTTP-запросов
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/register", "api/login" ,"/profile" , "api/logout","api/getCourse" , "dashboard/getUserCourses").permitAll()
                        .requestMatchers("/dashboard/**" , "dashboard/addCourseToUser").permitAll()
                        .requestMatchers( "api/addCourse" , "api/courses/{id}" ,"api/deleteCourse/{id}").permitAll()
                        .anyRequest().authenticated() // Требуем аутентификацию для всех остальных запросов
                )// Включаем поддержку CORS
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
                .httpBasic(Customizer.withDefaults()) // Настройка базовой аутентификации
                .build();
    }

    @Bean
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        UserDetails user = User.builder()
                .username("admin")
                .password(encoder.encode("123"))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(user);
    }



}