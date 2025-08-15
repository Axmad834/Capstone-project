package com.example.project;

import com.example.project.Services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
@RequiredArgsConstructor
public class ProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectApplication.class, args);
    }


    @Bean
    public CommandLineRunner commandLineRunner(ApplicationContext ctx, UserService userService) {
        return args -> {
            // Пример присваивания роли ADMIN пользователю с ID 1
            userService.giveAdminRoleToUser(1L);  // Здесь 1L - это ID пользователя, которому ты хочешь дать роль
            System.out.println("User with  is now an ADMIN");
        };
    }
}
//"id":7,"firstName":null,"lastName":null,"age":null,"hobby":null,"photoUrl":null,"email":"a.xasanov@newuu.uz","password":"$2a$10$0KN7jHqr146EhYN1JPRbvOSH.MPeX4.cMr57AKpfBEjohZnPgvJva","role":null,"courses":[{"id":4,"title":"Java","courseDescription":"For Java devs","imageUrl":"https://www.adm.ee/wordpress/wp-content/uploads/2023/08/JAVA.png","user":{"id":7,"firstName":null,"lastName":null,"age":null,"hobby":null,"photoUrl":null,"email":"a.xasanov@newuu.uz","password":"$2a$10$0KN7jHqr146EhYN1JPRbvOSH.MPeX4.cMr57AKpfBEjohZnPgvJva","role":null,"courses":[{"id":4,"title":"Java","courseDescription":"For Java devs","imageUrl":"https://www.adm.ee/wordpress/wp-content/uploads/2023/08/JAVA.png","user":{"id":7,"firstName":null,"lastName":null,"age":null,"hobby":null,"photoUrl":null,"email":"a.xasanov@newuu.uz","password":"$2a$10$0KN7jHqr146EhYN1JPRbvOSH.MPeX4.cMr57AKpfBEjohZnPgvJva","role":null,"courses":[{"id":4,"title":"Java","courseDescription":"For Java devs","imageUrl":"https://www.adm.ee/wordpress/wp-content/uploads/2023/08/JAVA.png","user":{"id":7,"firstName":null,"lastName":null,"age":null,"hobby":null,"photoUrl":null,"email":"a.xasanov@newuu.uz","password":"$2a$10$0KN7jHqr146EhYN1JPRbvOSH.MPeX4.cMr57AKpfBEjohZnPgvJva","role":null,"courses":]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}}]}  он добавился но потом просто выкунило и теперь именно с этого акка не могу зайти