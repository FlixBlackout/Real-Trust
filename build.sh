#!/bin/bash

# Build script for Render
echo "Building Spring Boot application..."

# Build with Maven
cd backend
../mvnw clean package -DskipTests

# Create uploads directory
mkdir -p uploads

echo "Build complete!"
