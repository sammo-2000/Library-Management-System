# AML Advanced Management System

This project is library management system which is built as part of our student assessment for software enginnering student

## Table of Contents

- [About the Project](#about-the-project)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Contributors](#contributors)
- [Setup and Installation](#setup-and-installation)

## About the Project

The **AML Advanced Management System** is a comprehensive library management platform designed as part of a student assessment for software engineering. The system aims to simplify library operations for both users and administrators through a modern, feature-rich web application.

### Objectives

The primary goals of the project are to:

- Enable users to browse media collections across multiple libraries.
- Provide functionality for borrowing or reserving library media online.
- Streamline user management for administrators.
- Facilitate secure and user-friendly online payments for library services.

### Features

- **Cross-Library Media Viewing:** Browse and search for media across all connected libraries.
- **Online Borrowing and Reservations:** Borrow books, videos, or other media online with a few clicks.
- **User Management:** Manage user accounts, borrowing history, and permissions.
- **Integrated Payments:** Pay for overdue items or membership fees through an online platform.
- **Scalability:** Built with microservices architecture for easy scaling and maintenance.
- **Containerized Deployment:** Leverage Docker for a consistent and portable development environment.

## Technologies Used

This project was built using the following technologies:

- **[Express.js](https://expressjs.com/):** Backend framework for building APIs.
- **[NextJs](https://nextjs.org/):** React-based frontend framework for building full-stack web applications.
- **[NestJS](https://nestjs.com/):** Backend framework for creating scalable, modular, and maintainable server-side applications.
- **[Docker](https://www.docker.com/):** Containerization platform used to standardize the development environment.
- **[Jest](https://jestjs.io/):** Testing framework for unit and integration tests.

## Folder Structure

- **Docs:** Contains all project-related documentation, including API references, diagrams, and decision-making records.
- **Frontend:** Houses the source code for the user-facing application built using Next.js.
- **Services:** Includes all microservices that collectively power the application.
- **Non-Functional-Testing:** Contains a test case addressing one of our application's non-functional requirements (e.g., performance or scalability testing).
- **run-services.sh:** A script that sets up and runs the entire application, including all microservices and the frontend, using Docker. Execute `./run-services.sh` to start the project.

## Contributors

Here are the individuals who contributed to this project:

| Name           | GitHub Username                                    |
| -------------- | -------------------------------------------------- |
| Ahmed Sulaimon | [@Ahmedsulaimon](https://github.com/Ahmedsulaimon) |
| Ayman Sammo    | [@sammo-2000](https://github.com/sammo-2000)       |
| Nayan Stanley  | [@nayan-builds](https://github.com/nayan-builds)   |

## Setup and Installation

Follow these steps to set up and run the project locally:

1. **Clone the repository:**

```bash
git clone https://github.com/sammo-2000/Library-Management-System
```

2. **Run using docker:**

```bash
cd Library-Management-System
./run-services.sh
```
