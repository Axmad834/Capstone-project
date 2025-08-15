package com.example.project.Repositores;


import com.example.project.Entities.Courses;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CoursesRepository extends JpaRepository<Courses, Long> {
    Optional<Courses> findByTitle(String title);


    Optional<Courses> findById(Long id);

    List<Courses> findByUserId(Long userId);

    Long id(Long id);
}
