package com.example.project.Controllers;


import com.example.project.DTO.CoursesDto;
import com.example.project.Entities.Courses;
import com.example.project.Services.UserCoursesService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class UserCoursesController {

    private final UserCoursesService userCoursesService;

    @PostMapping("/addCourseToUser")
    public ResponseEntity<?> addCourseToUser( @RequestParam Long id,@RequestBody CoursesDto coursesDto ) {
        System.out.println("User ID: " + id);
        System.out.println("Course Data: " + coursesDto);
        Courses course = userCoursesService.addCourseToUser(id,coursesDto);
        return ResponseEntity.ok().body(course);
    }



    //validation check if is it true user of courses
    @GetMapping("/getUserCourses")
    public ResponseEntity<?> getUserCourses(@RequestParam Long userId) {
        // просто возвращаем курсы по userId без доп. проверок
        List<Courses> courses = userCoursesService.getUserCourses(userId);
        return ResponseEntity.ok(courses);
    }


    @DeleteMapping("/delete/{userId}/{courseId}")
    public void deleteCourseFromDashboard(@PathVariable Long userId , @PathVariable Long courseId ){
        userCoursesService.deleteCourseForUser(userId ,courseId);
    }



}
