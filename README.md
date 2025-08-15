# Capstone-project
WebProject – E-Learning Platform

This project is a full-stack E-Learning Web Application that connects students with a variety of courses and learning resources.
It includes:

Backend – Java Spring Boot with JPA/Hibernate and PostgreSQL

Frontend – React + TypeScript + Tailwind + Vite

<img width="1897" height="944" alt="Снимок экрана 2025-08-15 171115" src="https://github.com/user-attachments/assets/2bb53d6e-e50c-43be-a9fe-0472cfd0ad30" />

<img width="1886" height="946" alt="image" src="https://github.com/user-attachments/assets/7f948435-54fd-4333-8b93-abd6cc094f4c" />



Overview

The platform allows users to create accounts, explore available courses, and manage their personal learning journey through a clean and intuitive interface.

Database diagram (link) in 3nf: https://dbdiagram.io/d/689f0daf1d75ee360abcf59d 

Roles:

User – Enroll in courses and manage personal progress.

Admin – Manage courses and users.

Features

User Registration & Login – Create accounts, log in securely.

Personal Dashboard – Track enrolled courses and progress.

Course Listings – Browse and enroll in available courses.

Profile Management – Edit personal details.

Admin Controls – Create, edit, and delete courses.

Responsive UI – Works on desktop, tablet, and mobile.

Tech Stack

Backend: Java 17+, Spring Boot, Spring Data JPA (Hibernate), PostgreSQL, Maven

Frontend: Vite, React, TypeScript, Tailwind CSS

Installation & Setup
Clone Repository
git clone <repository-url>
cd WebProject

Backend Setup
# Go to backend root folder
cd backend

# Install backend dependencies
mvn clean install


Database:
Make sure PostgreSQL is running and your application.properties or application.yml is configured with your DB username, password, and database name.

Run backend:

mvn spring-boot:run

3️ Frontend Setup
# Open new terminal
cd frontend

# Install frontend dependencies
npm install

# Run frontend
npm run dev

#Launch Application

After backend and frontend are running, go to:
http://localhost:8080/

Enter test credentials:    //without it you can not get access to db hence no backend part ll be involved

.username("admin")
.password(encoder.encode("123"))

 

#Grant Admin Rights

To create or delete courses, you must assign Admin role manually in code.

Important remark: to create new account , do press "start new 14 days trial" , and after registration log in one more time !

In
src/main/java/com/example/project/ProjectApplication.java
add the following:

userService.giveAdminRoleToUser(1L);  // 1L = ID of the user you want to make ADMIN
System.out.println("User with ID=1 is now an ADMIN");


OR Run the project once, and that user will be given admin privileges.

Production Build
