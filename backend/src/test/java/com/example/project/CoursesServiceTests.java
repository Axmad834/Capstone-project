package com.example.project;

import com.example.project.DTO.CoursesDto;
import com.example.project.Entities.Courses;
import com.example.project.Repositores.CoursesRepository;
import com.example.project.Services.CoursesService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.internal.verification.VerificationModeFactory.times;

@SpringBootTest
class CoursesServiceTests {

    @MockBean
    private CoursesRepository coursesRepository;


    @Autowired
    private CoursesService coursesService;

    @Test
    void testGetAllCourses() {
        List<Courses> courses = Arrays.asList(
                new Courses(1L, "Java", "Java basics", "img1.png", null),
                new Courses(2L, "Spring", "Spring Boot", "img2.png", null)
        );

        when(coursesRepository.findAll()).thenReturn(courses);

        List<Courses> result = coursesService.getAllCourses();

        assertEquals(2, result.size());
        verify(coursesRepository, times(1)).findAll();
    }

    @Test
    void testAddCourse() {
        CoursesDto dto = new CoursesDto(null,"Java","Basics","img.png");
        Courses savedCourse = new Courses(1L,"Java", "Java basics", "img1.png", null);

        when(coursesRepository.save(any(Courses.class))).thenReturn(savedCourse);

        Courses result = coursesService.addCourse(dto);

        assertNotNull(result);
        assertEquals("Java",result.getTitle());
        verify(coursesRepository, times(1)).save(any(Courses.class));

    }

    @Test
    void testUpdateCourse_NotFound() {
        Long id = 999L;
        CoursesDto updateDto = new CoursesDto(null, "Title", "Desc", "img.png");

        when(coursesRepository.findById(id)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class,
                () -> coursesService.updateCourse(id, updateDto));

        assertTrue(exception.getMessage().contains("Course not found"));

        verify(coursesRepository).findById(id);
        verify(coursesRepository, never()).save(any());
    }

    @Test
    void testDeleteCourse(){
        Long id = 1L;

        doNothing().when(coursesRepository).deleteById(id);

        coursesService.deleteCourse(id);

        verify(coursesRepository, times(1)).deleteById(id);
    }



}