# Real Trust - Full Stack Application

A complete full-stack real estate application with a Spring Boot backend and HTML/CSS/JavaScript frontend.

## Project Structure

```
Real Trust (Assignment Task)/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   └── main/
│   │       ├── java/com/realtrust/
│   │       │   ├── RealTrustApplication.java
│   │       │   ├── config/
│   │       │   │   └── WebConfig.java
│   │       │   ├── controller/
│   │       │   │   ├── ClientController.java
│   │       │   │   ├── ContactFormController.java
│   │       │   │   ├── NewsletterController.java
│   │       │   │   └── ProjectController.java
│   │       │   ├── model/
│   │       │   │   ├── Client.java
│   │       │   │   ├── ContactForm.java
│   │       │   │   ├── Newsletter.java
│   │       │   │   └── Project.java
│   │       │   ├── repository/
│   │       │   │   ├── ClientRepository.java
│   │       │   │   ├── ContactFormRepository.java
│   │       │   │   ├── NewsletterRepository.java
│   │       │   │   └── ProjectRepository.java
│   │       │   └── service/
│   │       │       ├── ClientService.java
│   │       │       ├── ContactFormService.java
│   │       │       ├── FileStorageService.java
│   │       │       ├── NewsletterService.java
│   │       │       └── ProjectService.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
├── frontend/                         # Frontend Application
│   ├── index.html                    # Landing Page
│   ├── admin.html                    # Admin Panel
│   ├── app.js                        # Landing Page JavaScript
│   └── admin.js                      # Admin Panel JavaScript
└── stocker-1.0.0/                   # Template Assets
    ├── css/
    ├── img/
    ├── js/
    └── lib/
```

## Features

### Landing Page
- **Hero Section** with consultation form
- **About Us** section
- **Why Choose Us** (Services) section
- **Our Projects** section (dynamically loaded from backend)
- **Happy Clients** testimonials (dynamically loaded from backend)
- **Contact Form** with backend integration
- **Newsletter Subscription** functionality

### Admin Panel
- **Dashboard** with statistics
- **Project Management** - Add, view, and delete projects with image uploads
- **Client Management** - Add, view, and delete client testimonials with images
- **Contact Form Viewer** - View all submitted contact forms
- **Newsletter Viewer** - View all newsletter subscriptions

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Database**: MongoDB
- **Build Tool**: Maven
- **Key Dependencies**:
  - Spring Web
  - Spring Data MongoDB
  - Lombok
  - Validation
  - File Upload Support

### Frontend
- **HTML5** with semantic markup
- **CSS3** with Bootstrap 5
- **JavaScript** (Vanilla) for API integration
- **Font Awesome** for icons
- **Template**: Customized Stocker template

## Prerequisites

Before running this application, ensure you have:

1. **Java Development Kit (JDK) 17** or higher
2. **Maven 3.6+** for building the backend
3. **MongoDB** installed and running on localhost:27017
4. A modern web browser
5. A local web server or VS Code Live Server for frontend

## Installation & Setup

### Step 1: Setup MongoDB

1. Install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   # Windows
   net start MongoDB
   
   # Linux/Mac
   sudo systemctl start mongod
   ```
3. Verify MongoDB is running on port 27017

### Step 2: Setup Backend

1. Navigate to backend directory:
   ```bash
   cd "backend"
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on http://localhost:8080

### Step 3: Setup Frontend

1. Navigate to frontend directory:
   ```bash
   cd "frontend"
   ```

2. Open with a local web server:
   
   **Option A: Using VS Code Live Server**
   - Install "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"
   
   **Option B: Using Python**
   ```bash
   python -m http.server 5500
   ```
   
   **Option C: Using Node.js http-server**
   ```bash
   npx http-server -p 5500
   ```

3. Access the application:
   - Landing Page: http://localhost:5500/index.html
   - Admin Panel: http://localhost:5500/admin.html

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project (multipart/form-data)
- `DELETE /api/projects/{id}` - Delete project

### Clients
- `GET /api/clients` - Get all clients
- `POST /api/clients` - Create new client (multipart/form-data)
- `DELETE /api/clients/{id}` - Delete client

### Contact Forms
- `GET /api/contact` - Get all contact forms
- `POST /api/contact` - Submit contact form (JSON)
- `DELETE /api/contact/{id}` - Delete contact form

### Newsletter
- `GET /api/newsletter` - Get all subscriptions
- `POST /api/newsletter/subscribe` - Subscribe to newsletter (JSON)
- `DELETE /api/newsletter/{id}` - Delete subscription

## Configuration

### Backend Configuration (application.properties)

```properties
server.port=8080
spring.data.mongodb.uri=mongodb://localhost:27017/realtrust
spring.servlet.multipart.max-file-size=10MB
file.upload.dir=uploads
```

### Frontend Configuration

Update API_BASE_URL in both `app.js` and `admin.js` if your backend runs on a different port:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

## Usage Guide

### For Admin Users

1. Open the admin panel at http://localhost:5500/admin.html

2. **Adding Projects**:
   - Navigate to "Projects" section
   - Fill in project name, description, and upload an image
   - Click "Add Project"

3. **Adding Clients**:
   - Navigate to "Clients" section
   - Fill in client name, designation, testimonial, and upload an image
   - Click "Add Client"

4. **Viewing Contact Forms**:
   - Navigate to "Contact Forms" section
   - View all submitted contact forms with details

5. **Managing Newsletter**:
   - Navigate to "Newsletter" section
   - View all email subscriptions

### For End Users

1. Open the landing page at http://localhost:5500/index.html
2. Browse projects and client testimonials
3. Submit contact form for inquiries
4. Subscribe to newsletter at the bottom of the page

## File Upload Directory

Images are stored in the `backend/uploads/` directory. This directory is automatically created when the first file is uploaded.

## Troubleshooting

### Backend Issues

1. **Port 8080 already in use**:
   - Change port in `application.properties`: `server.port=8081`
   - Update API_BASE_URL in frontend files accordingly

2. **MongoDB connection failed**:
   - Ensure MongoDB is running
   - Check connection string in `application.properties`

3. **File upload fails**:
   - Check file size (max 10MB)
   - Ensure uploads directory has write permissions

### Frontend Issues

1. **CORS errors**:
   - Backend CORS is configured to allow all origins
   - Check browser console for specific errors

2. **Images not loading**:
   - Verify backend is serving files from `/uploads/**`
   - Check image paths in browser developer tools

3. **API calls failing**:
   - Ensure backend is running on port 8080
   - Check API_BASE_URL configuration in JavaScript files

## Deployment

### Backend Deployment

1. **Build JAR file**:
   ```bash
   mvn clean package
   ```

2. **Deploy to cloud** (Heroku, AWS, Azure, etc.):
   - Update MongoDB connection string for production database
   - Configure file storage (consider using cloud storage like AWS S3)
   - Set CORS allowed origins for production frontend URL

### Frontend Deployment

1. Upload files to any static hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront

2. Update API_BASE_URL to point to deployed backend

### Database Deployment

1. **MongoDB Atlas** (Recommended):
   - Create free cluster at https://www.mongodb.com/cloud/atlas
   - Get connection string
   - Update `spring.data.mongodb.uri` in application.properties

## Future Enhancements

- [ ] Image cropping functionality (bonus feature)
- [ ] User authentication for admin panel
- [ ] Edit functionality for projects and clients
- [ ] Pagination for large datasets
- [ ] Search and filter capabilities
- [ ] Image optimization before upload
- [ ] Email notifications for contact forms
- [ ] Rich text editor for descriptions

## License

This project is created for educational purposes as part of a coding assignment.

## Support

For issues or questions, please contact the development team.
