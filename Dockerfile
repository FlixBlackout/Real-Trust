# Use Maven image to build
FROM maven:3.9.5-eclipse-temurin-21 AS build

# Set working directory
WORKDIR /app

# Copy pom.xml and download dependencies
COPY backend/pom.xml .
RUN mvn dependency:go-offline

# Copy source code
COPY backend/src ./src

# Build the application
RUN mvn clean package -DskipTests

# Use JRE for runtime
FROM eclipse-temurin:21-jre-alpine

# Set working directory
WORKDIR /app

# Copy jar from build stage
COPY --from=build /app/target/realtrust-backend-1.0.0.jar app.jar

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
