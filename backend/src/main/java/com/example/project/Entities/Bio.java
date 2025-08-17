package com.example.project.Entities;

import jakarta.persistence.*;


public class Bio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    private String about;
    private String address;
    private String phoneNumber;
}
