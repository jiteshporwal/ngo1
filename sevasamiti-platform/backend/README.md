# Backend Setup

This directory contains the backend application for the SevaSamiti Platform, built with Spring Boot and Maven.

## Dependencies

The project uses Maven for dependency management. All dependencies are listed in the `pom.xml` file.

## Installation

To ensure all backend dependencies are downloaded and the project is built, navigate to the `sevasamiti-platform` directory (the root of the backend project, where `pom.xml` is located) and run:

```bash
mvn clean install
```

This command will download all necessary dependencies and package the application.

## Running the Application

After building the project, you can run the Spring Boot application using:

```bash
mvn spring-boot:run
```

Alternatively, you can run the generated JAR file from the `target` directory:

```bash
java -jar target/sevasamiti-platform-0.0.1-SNAPSHOT.jar
```

(Note: The exact JAR filename might vary slightly depending on the version specified in `pom.xml`.)