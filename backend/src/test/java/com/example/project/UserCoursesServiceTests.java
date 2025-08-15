package com.example.project;

import com.example.project.DTO.CoursesDto;
import com.example.project.Entities.Courses;
import com.example.project.Entities.User;
import com.example.project.Repositores.CoursesRepository;
import com.example.project.Repositores.UserRepository;
import com.example.project.Services.CoursesService;
import com.example.project.Services.UserCoursesService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserCoursesServiceTests {

    @Mock
    private CoursesRepository coursesRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CoursesService coursesService; // Пока не используем в тестах, но нужно мокать

    @InjectMocks
    private UserCoursesService userCoursesService;

    private User user;
    private Courses course;
    private CoursesDto coursesDto;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setCourses(new ArrayList<>());

        course = new Courses();
        course.setId(10L);
        course.setTitle("Java Basics");
        course.setUser(null);

        CoursesDto coursesDto = new CoursesDto(1L, "Title", "Description", "ImageUrl");
        coursesDto.setId(course.getId());
        coursesDto.setTitle(course.getTitle());
        coursesDto.setCourseDescription("Basic Java course");
        coursesDto.setImageUrl("http://image.url");
    }


    @Test
    void addCourseToUser_Throws_WhenUserNotFound() {
        when(userRepository.findById(user.getId())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userCoursesService.addCourseToUser(user.getId(), coursesDto);
        });

        assertEquals("No such user", exception.getMessage());
    }

    @Test
    void addCourseToUser_Throws_WhenCourseNotFound() {
        CoursesDto coursesDto = new CoursesDto(1L, "Test Course", "Description", "imageUrl");

        when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
        when(coursesRepository.findById(coursesDto.getId())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userCoursesService.addCourseToUser(user.getId(), coursesDto);
        });

        assertEquals("No such course", exception.getMessage());
    }


    @Test
    void getUserCourses_ReturnsList() {
        List<Courses> coursesList = List.of(course);
        when(coursesRepository.findByUserId(user.getId())).thenReturn(coursesList);

        List<Courses> result = userCoursesService.getUserCourses(user.getId());

        assertEquals(1, result.size());
        assertEquals(course, result.get(0));
    }

    @Test
    void deleteCourseForUser_Throws_WhenCourseNotFound() {
        when(coursesRepository.findById(course.getId())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userCoursesService.deleteCourseForUser(user.getId(), course.getId());
        });

        assertEquals("No such course", exception.getMessage());
    }

    @Test
    void deleteCourseForUser_Throws_WhenUserNotOwner() {
        User otherUser = new User();
        otherUser.setId(2L);
        course.setUser(otherUser);

        when(coursesRepository.findById(course.getId())).thenReturn(Optional.of(course));

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            userCoursesService.deleteCourseForUser(user.getId(), course.getId());
        });

        assertEquals("User is not allowed to delete course", exception.getMessage());
    }
}
