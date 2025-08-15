package com.example.project.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Courses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String courseDescription;
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore // it will prevent recursive dependencies because onetoamty realationship leads to it
    private User user;



    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
